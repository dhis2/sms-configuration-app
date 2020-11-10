import NetworkShim from './Networkshim.js'
import {
    isDisabledMode,
    isCaptureMode,
    getDefaultHosts,
    getDefaultFixtureMode,
    getDefaultStaticResources,
} from './utils.js'
import visitWithUnfetchOverwriteFn from './visitWithUnfetchOverwriteFn.js'

export function enableNetworkShim({
    hosts = getDefaultHosts(),
    fixtureMode = getDefaultFixtureMode(),
    staticResources = getDefaultStaticResources(),
} = {}) {
    // Replace window.fetch with unfetch, which uses XHR and cypress can work with this
    Cypress.Commands.overwrite('visit', visitWithUnfetchOverwriteFn)

    // No need to stub anything when disabled
    if (isDisabledMode()) {
        return
    }

    const networkShim = new NetworkShim({ hosts, fixtureMode, staticResources })

    before(() => {
        if (isCaptureMode()) {
            networkShim.initCaptureMode()
        } else {
            networkShim.initStubMode()
        }
    })

    beforeEach(() => {
        if (isCaptureMode()) {
            networkShim.captureRequestsAndResponses()
        } else {
            networkShim.createStubRoutes()
        }
    })

    after(() => {
        if (isCaptureMode()) {
            networkShim.createFixtures()
        }
    })
}
