import {
    // getApiBaseUrl,
    getNetworkFixturesDir,
    getFullTestName,
    splitHostAndPath,
    isStaticFixtureMode,
    isStaticResource,
} from './utils.js'
import loadXHook from './loadXHook.js'

export default class NetworkShim {
    constructor({ hosts, fixtureMode, staticResources }) {
        this.state = null
        this.hosts = hosts
        this.fixtureMode = fixtureMode
        this.staticResources = staticResources
    }

    initCaptureMode() {
        this.cleanup()
        this.state = {
            count: 0,
            totalResponseSize: 0,
            duplicates: 0,
            nonDeterministicResponses: 0,
            requests: [],
        }
    }

    initStubMode() {
        try {
            cy.readFile(`${getNetworkFixturesDir()}/summary.json`).then(
                ({ fixtureFiles }) =>
                    this.parseFixtureFiles(fixtureFiles).then(requests => {
                        this.state = {
                            requests,
                        }
                        loadXHook(this.handleStubbedRoute)
                    })
            )
        } catch (error) {
            console.error('NetworkShim stub mode initialzation error', error)
        }
    }

    cleanup() {
        cy.exec(`rm -rf ./${getNetworkFixturesDir()}`)
    }

    parseFixtureFiles(fileNames) {
        return cy
            .all(
                ...fileNames.map(fileName => () =>
                    cy.readFile(
                        `${getNetworkFixturesDir()}/requests/${fileName}`
                    )
                )
            )
            .then(results => results.flat())
    }

    captureRequestsAndResponses() {
        cy.server({
            onAnyRequest: (_, xhr) => {
                try {
                    this.captureRequest(xhr)
                } catch (error) {
                    console.error('NetworkShim capture error on request', error)
                }
            },
            onAnyResponse: (_, xhr) => {
                try {
                    this.captureResponse(xhr)
                } catch (error) {
                    console.error(
                        'NetworkShim capture error on response',
                        error
                    )
                }
            },
        })
    }

    createStubRoutes() {
        // const baseUrl = getApiBaseUrl()
        // const uniqueMethodPathCombos = Array.from(
        //     new Set(
        //         this.state.requests.map(({ method, path }) =>
        //             JSON.stringify({ method, path })
        //         )
        //     )
        // ).map(jsonStr => JSON.parse(jsonStr))
        // uniqueMethodPathCombos.forEach(({ method, path }) => {
        //     const url = baseUrl + path
        //     console.log('creating route for ', method, ' to ', url)
        //     // cy.route2(method, url, this.handleStubbedRoute)
        //     // cy.route2(method, url, { what: 'That' })
        // })
    }

    handleStubbedRoute = request => {
        console.log('handleStubRoute', request)
        const { path } = splitHostAndPath(request.url, this.hosts)

        const matchingRequest = this.findMatchingRequest({
            path,
            method: request.method,
            testName: getFullTestName(),
            // Cast '' to null to match fixtures
            requestBody: request.body || null,
            isStaticResource: this.isPathStaticResource(path),
        })

        console.log(
            'Handle stub route ',
            request.method,
            ' to ',
            path,
            'Going to return this data',
            JSON.parse(matchingRequest.responseBody)
        )

        return matchingRequest
    }

    isPathStaticResource(path) {
        return (
            isStaticFixtureMode(this.fixtureMode) ||
            isStaticResource(path, this.staticResources)
        )
    }

    findMatchingRequest({
        id,
        path,
        method,
        testName,
        requestBody,
        isStaticResource,
    }) {
        return this.state.requests.find(r => {
            if (id && id === r.id) {
                return true
            }

            const isMatchingRequest =
                path === r.path &&
                method === r.method &&
                requestBody === r.requestBody

            // console.log('isMatchingRequest', path, method, requestBody, r)

            // For dynamic resource we store a seperate request per test
            // because the data might get mutated in other tests
            return isStaticResource
                ? isMatchingRequest
                : isMatchingRequest && testName === r.testName
        })
    }

    captureRequest = xhr => {
        const { host, path } = splitHostAndPath(xhr.url, this.hosts)
        if (!host) {
            // pass through
            return xhr
        }

        this.state.count++

        const testName = getFullTestName()
        const isStaticResource = this.isPathStaticResource(path)
        const duplicatedRequest = this.findMatchingRequest({
            id: xhr.id,
            path,
            method: xhr.method,
            testName,
            requestBody: xhr.request.body,
            isStaticResource,
        })

        if (duplicatedRequest) {
            // Repeated request
            duplicatedRequest.count += 1
            this.state.duplicates += 1
        } else {
            // New request
            this.state.requests.push({
                path,
                id: xhr.id,
                testName: isStaticResource ? null : testName,
                static: isStaticResource,
                count: 1,
                nonDeterministic: false,
                method: xhr.method,
                requestBody: xhr.request.body,
                requestHeaders: xhr.request.headers,
                status: null,
                responseBody: null,
                responseSize: null,
                responseHeaders: null,
            })
        }
        return xhr
    }

    captureResponse = async xhr => {
        const { host, path } = splitHostAndPath(xhr.url, this.hosts)

        if (!host) {
            // pass through
            return xhr
        }

        const request = this.findMatchingRequest({
            id: xhr.id,
            path,
            method: xhr.method,
            testName: getFullTestName(),
            requestBody: xhr.request.body,
            isStaticResource: this.isPathStaticResource(path),
        })
        const { size, text } = await this.createResponseBlob(xhr)

        if (!request) {
            throw new Error('Could not find request to match response')
        }

        if (request.responseBody) {
            if (text !== request.responseBody) {
                this.state.nonDeterministicResponses += 1
                request.nonDeterministic = true
            }
        } else {
            request.status = xhr.status
            request.responseBody = text
            request.responseSize = size
            request.responseHeaders = xhr.response.headers

            this.state.totalResponseSize += size
        }

        return xhr
    }

    async createResponseBlob(xhr) {
        const responseBodyStr = JSON.stringify(xhr.response.body)
        const blob = new Blob([responseBodyStr], { type: 'application/json' })
        const size = blob.size
        const text = await blob.text()

        return { size, text }
    }

    createFixtures() {
        const dir = getNetworkFixturesDir()
        const summary = {
            count: this.state.count,
            totalResponseSize: this.state.totalResponseSize,
            duplicates: this.state.duplicates,
            nonDeterministicResponses: this.state.nonDeterministicResponses,
            fixtureFiles: [],
        }
        const files = this.state.requests.reduce(
            (acc, request) => {
                const fileName = request.static
                    ? 'static_resources'
                    : request.testName
                          .split(' -- ')[0]
                          .toLowerCase()
                          .replaceAll(' ', '_')

                if (!acc[fileName]) {
                    acc[fileName] = []
                    acc.summary.fixtureFiles.push(`${fileName}.json`)
                }

                // request id is not valid across test-runs
                // so needs to be removed from fitures
                delete request.id
                acc[fileName].push(request)
                return acc
            },
            { summary }
        )

        for (const [name, requests] of Object.entries(files)) {
            const filePath =
                name === 'summary'
                    ? `${dir}/${name}`
                    : `${dir}/requests/${name}`

            cy.writeFile(`${filePath}.json`, requests)
        }

        cy.log(
            `Networkshim successfully captured ${this.state.requests.length} requests`
        )
    }
}
