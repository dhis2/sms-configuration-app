import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

Given('the user is adding a new gateway with type BulkSMS', () => {
    cy.route({
        url: /.*\/gateways/,
        method: 'GET',
        response: { gateways: [] },
    })

    cy.route({
        url: /gateways/,
        method: 'POST',
        response: {},
    }).as('createGatewayConfigurationXHR')

    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
    cy.get('{views-gatewayconfiglist-add}').click()

    cy.get(
        '{views-gatewayconfigformnew-gatewaytype} [data-test="dhis2-uicore-singleselect"]'
    ).click()
    cy.get('[data-value="bulksms"]').click()
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const username = 'Username'
    const password = 'Password'

    cy.get('{gateways-fieldgatewayname}').type(name)
    cy.get('{gateways-fieldgatewayusername}').type(username)
    cy.get('{gateways-fieldgatewaypassword}').type(password)
    cy.get('{gateways-fieldgatewaypasswordconfirmation}').type(password)

    cy.wrap({
        type: 'bulksms',
        name,
        username,
        password,
    }).as('gatewayData')
})

When('the user fills in incomplete form data', () => {
    const name = 'Name'
    const password = 'Password'

    cy.get('{gateways-fieldgatewayname}').type(name)
    cy.get('{gateways-fieldgatewaypassword}').type(password)
    cy.get('{gateways-fieldgatewaypasswordconfirmation}').type(password)

    cy.get('{gateways-fieldgatewayusername}').as('missingFields')
    cy.wrap({
        type: 'bulksms',
        username: '',
        name,
        password,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.get('{forms-gatewaybulksmsform-submit}').click()
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
