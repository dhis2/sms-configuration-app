const {
    chromeAllowXSiteCookies,
    cucumberPreprocessor,
} = require('@dhis2/cypress-plugins')

module.exports = (on, config) => {
    chromeAllowXSiteCookies(on, config)
    cucumberPreprocessor(on, config)
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            const disabledChromiumFeatures = [
                'SameSiteByDefaultCookies',
                'CookiesWithoutSameSiteMustBeSecure',
                'SameSiteDefaultChecksMethodRigorously',
            ]
            launchOptions.args.push(
                `--disable-features=${disabledChromiumFeatures.join(',')}`
            )
        }

        return launchOptions
    })
}
