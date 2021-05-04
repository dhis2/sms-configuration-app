const {
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
    networkShim,
} = require('@dhis2/cypress-plugins')

module.exports = (on, config) => {
    chromeAllowXSiteCookies(on, config)
    cucumberPreprocessor(on, config)
    networkShim(on, config)
}
