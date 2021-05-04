import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user is adding a new gateway with type BulkSMS', () => {
    cy.intercept('GET', /.*\/gateways/, { body: { gateways: [] } })

    cy.intercept('POST', /gateways/, { body: {} }).as(
        'createGatewayConfigurationXHR'
    )

    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
    cy.getWithDataTest('{shared-listactions-add}').click()

    cy.getWithDataTest(
        '{smsgateway-viewsmsgatewayadd-gatewaytype} [data-test="dhis2-uicore-singleselect"]'
    ).click()
    cy.get('[data-value="bulksms"]').click()
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const username = 'Username'
    const password = 'Password'

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').type(name)
    cy.getWithDataTest('{smsgateway-fieldusername}').type(username)
    cy.getWithDataTest('{smsgateway-fieldpassword}').type(password)
    cy.getWithDataTest('{smsgateway-fieldpasswordconfirmation}').type(password)

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

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').type(name)
    cy.getWithDataTest('{smsgateway-fieldpassword}').type(password)
    cy.getWithDataTest('{smsgateway-fieldpasswordconfirmation}').type(password)

    cy.getWithDataTest('{smsgateway-fieldusername}').as('missingFields')
    cy.wrap({
        type: 'bulksms',
        username: '',
        name,
        password,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.getWithDataTest('{forms-gatewaybulksmsform-submit}').click()
})

Then('the entered data should be sent to the endpoint', () => {
    cy.all(
        () => cy.wait('@createGatewayConfigurationXHR'),
        () => cy.get('@gatewayData')
    ).then(([xhr, gatewayData]) => {
        expect(xhr.response.statusCode).to.equal(200)
        expect(xhr.request.body).to.eql(gatewayData)
    })
})

Then('an error message should be shown at the invalid field', () => {
    cy.get('@missingFields').then($missingFields => {
        $missingFields.each((index, $missingField) => {
            cy.wrap($missingField).find('.error').should('exist')
        })
    })
})
