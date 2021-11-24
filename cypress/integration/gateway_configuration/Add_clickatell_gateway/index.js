import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user is adding a new gateway with type Clickatell', () => {
    cy.intercept('GET', /\/gateways.json$/, { body: { gateways: [] } })
    cy.intercept('POST', /gateways/, { body: {} }).as(
        'createGatewayConfigurationXHR'
    )

    cy.visit('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
    cy.getWithDataTest('{shared-listactions-add}').click()

    cy.getWithDataTest(
        '{smsgateway-viewsmsgatewayadd-gatewaytype} [data-test="dhis2-uicore-singleselect"]'
    ).click()
    cy.get('[data-value="clickatell"]').click()
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const username = 'Username'
    const urlTemplate = 'http://domain.tld'
    const authToken = 'Auth token'

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').type(name)
    cy.getWithDataTest('{smsgateway-fieldusername}').type(username)
    cy.getWithDataTest('{smsgateway-fieldurltemplate}').type(urlTemplate)
    cy.getWithDataTest('{smsgateway-fieldauthtoken}').type(authToken)

    cy.wrap({
        type: 'clickatell',
        name,
        username,
        urlTemplate,
        authToken,
    }).as('gatewayData')
})

When('the user fills in incomplete form data', () => {
    const name = 'Name'
    const urlTemplate = 'http://domain.tld'
    const authToken = 'Auth token'

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').type(name)
    cy.getWithDataTest('{smsgateway-fieldurltemplate}').type(urlTemplate)
    cy.getWithDataTest('{smsgateway-fieldauthtoken}').type(authToken)

    cy.getWithDataTest('{smsgateway-fieldusername}').as('missingFields')
    cy.wrap({
        type: 'clickatell',
        username: '',
        name,
        urlTemplate,
        authToken,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.getWithDataTest('{forms-gatewayclickatellform-submit}').click()
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
    cy.get('@missingFields').then(($missingFields) => {
        $missingFields.each((index, $missingField) => {
            cy.wrap($missingField).find('.error').should('exist')
        })
    })
})
