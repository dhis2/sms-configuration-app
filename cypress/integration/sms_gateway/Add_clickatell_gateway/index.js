import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user is adding a new gateway with type Clickatell', () => {
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: { gateways: [] },
    })

    cy.route({
        url: /.*\/gateways$/,
        method: 'POST',
        response: {},
    }).as('createGatewayConfigurationXHR')

    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
    cy.get('{views-gatewayconfiglist-add}').click()

    cy.get(
        '{views-gatewayconfigformnew-gatewaytype} [data-test="dhis2-uicore-singleselect"]'
    ).click()
    cy.get('[data-value="clickatell"]').click()
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const username = 'Username'
    const urlTemplate = 'http://domain.tld'
    const authtoken = 'Auth token'

    cy.get('{forms-fieldname}').type(name)
    cy.get('{forms-fieldusername}').type(username)
    cy.get('{forms-fieldurltemplate}').type(urlTemplate)
    cy.get('{forms-fieldauthtoken}').type(authtoken)

    cy.wrap({
        type: 'clickatell',
        name,
        username,
        urlTemplate,
        authtoken,
    }).as('gatewayData')
})

When('the user fills in incomplete form data', () => {
    const name = 'Name'
    const urlTemplate = 'http://domain.tld'
    const authtoken = 'Auth token'

    cy.get('{forms-fieldname}').type(name)
    cy.get('{forms-fieldurltemplate}').type(urlTemplate)
    cy.get('{forms-fieldauthtoken}').type(authtoken)

    cy.get('{forms-fieldusername}').as('missingFields')
    cy.wrap({
        type: 'clickatell',
        username: '',
        name,
        urlTemplate,
        authtoken,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.get('{forms-gatewayclickatellform-submit}').click()
})

Then('the entered data should be sent to the endpoint', () => {
    cy.all(
        () => cy.wait('@createGatewayConfigurationXHR'),
        () => cy.get('@gatewayData')
    ).then(([xhr, gatewayData]) => {
        expect(xhr.status).to.equal(200)
        expect(xhr.request.body).to.eql(gatewayData)
    })
})

Then('an error message should be shown at the invalid field', () => {
    cy.get('@missingFields').then($missingFields => {
        $missingFields.each((index, $missingField) => {
            cy.wrap($missingField)
                .find('.error')
                .should('exist')
        })
    })
})
