import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user is adding a new gateway with type BulkSMS', () => {
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
    cy.get('[data-value="bulksms"]').click()
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const username = 'Username'
    const password = 'Password'

    cy.get('{forms-fieldname}').type(name)
    cy.get('{forms-fieldusername}').type(username)
    cy.get('{forms-fieldpassword}').type(password)

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

    cy.get('{forms-fieldname}').type(name)
    cy.get('{forms-fieldpassword}').type(password)

    cy.get('{forms-fieldusername}').as('missingFields')
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
