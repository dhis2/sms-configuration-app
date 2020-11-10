import {
    API_STUB_MODES,
    DEFAULT_API_STUB_MODE,
    FIXTURE_MODES,
    DEFAULT_FIXTURE_MODE,
    DEFAULT_STATIC_RESOURCES,
    NETWORK_FIXTURES_DIR,
} from './constants.js'

export const getApiBaseUrl = () => {
    const baseUrl = Cypress.env('dhis2_base_url')

    if (!baseUrl) {
        throw new Error(
            'No `dhis2_base_url` found. Please make sure to add it to `cypress.env.json`'
        )
    }

    return baseUrl
}

export const getDefaultHosts = () => [getApiBaseUrl()]

export const getDefaultMode = () =>
    Cypress.env('dhis2_api_stub_mode') || DEFAULT_API_STUB_MODE

export const isDisabledMode = () =>
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.DISABLED

export const isCaptureMode = () =>
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.CAPTURE

export const isStubMode = () =>
    Cypress.env('dhis2_api_stub_mode') === API_STUB_MODES.STUB

export const getDefaultFixtureMode = () => DEFAULT_FIXTURE_MODE

export const isStaticFixtureMode = mode => mode === FIXTURE_MODES.STATIC

export const isDynamicFixtureMode = mode => mode === FIXTURE_MODES.DYNAMIC

export const getDefaultStaticResources = () => DEFAULT_STATIC_RESOURCES

export const isStaticResource = (path, staticResources) => {
    const cleanedPath = path.split('?')[0]
    return staticResources.some(resourcePath =>
        cleanedPath.endsWith(resourcePath)
    )
}

export const getNetworkFixturesDir = () => NETWORK_FIXTURES_DIR

export const splitHostAndPath = (url, hosts) => {
    console.log(url)
    const host = hosts.find(host => url.indexOf(host) === 0)
    const path = url.substr(host.length)

    return { host, path }
}

const extractTitles = (obj, titles) => {
    if ('parent' in obj) {
        titles.push(obj.title)
        return extractTitles(obj.parent, titles)
    }

    return titles
}

export const getFullTestName = () =>
    extractTitles(Cypress.mocha.getRunner().suite.ctx.test, [])
        .reverse()
        .join(' -- ')
