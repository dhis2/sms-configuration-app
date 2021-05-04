import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const selectSelectValue = (selectSelector, optionValue) => {
    cy.getWithDataTest(selectSelector).click()
    return cy.get(`[data-value="${optionValue}"]`).click()
}

Given('the user is adding a new gateway with type SMPP', () => {
    cy.intercept('GET', /\/gateways.json$/, { body: { gateways: [] } })
    cy.intercept('POST', /gateways/, { body: {} }).as(
        'createGatewayConfigurationXHR'
    )

    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
    cy.getWithDataTest('{shared-listactions-add}').click()

    selectSelectValue(
        '{smsgateway-viewsmsgatewayadd-gatewaytype} [data-test="dhis2-uicore-singleselect"]',
        'smpp'
    )
})

When('the user fills in complete form data', () => {
    const name = 'Name'
    const systemId = 'Username'
    const host = 'localhsot'
    const systemType = 'VMS'
    const port = '5000'
    const password = 'pass word'
    const numberPlanIndicator = 'UNKNOWN'
    const typeOfNumber = 'INTERNATIONAL'
    const bindType = 'BIND_TX'
    const compressed = false

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').type(name)
    cy.getWithDataTest('{smsgateway-fieldsystemid}').type(systemId)
    cy.getWithDataTest('{smsgateway-fieldhost}').type(host)
    cy.getWithDataTest('{smsgateway-fieldsystemtype}').type(systemType)
    selectSelectValue(
        '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.getWithDataTest('{smsgateway-fieldport}').type(port)
    cy.getWithDataTest('{smsgateway-fieldpassword}').type(password)

    cy.wrap({
        type: 'smpp',
        name,
        systemId,
        host,
        systemType,
        port,
        password,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        compressed,
    }).as('gatewayData')
})

When('the user fills in incomplete form data', () => {
    const systemId = 'Username'
    const host = 'localhsot'
    const systemType = 'VMS'
    const port = '5000'
    const password = 'pass word'
    const numberPlanIndicator = 'UNKNOWN'
    const typeOfNumber = 'INTERNATIONAL'
    const bindType = 'BIND_TX'
    const compressed = false

    cy.getWithDataTest('{smsgateway-fieldsystemid}').type(systemId)
    cy.getWithDataTest('{smsgateway-fieldhost}').type(host)
    cy.getWithDataTest('{smsgateway-fieldsystemtype}').type(systemType)
    selectSelectValue(
        '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.getWithDataTest('{smsgateway-fieldport}').type(port)
    cy.getWithDataTest('{smsgateway-fieldpassword}').type(password)

    cy.getWithDataTest('{smsgateway-fieldgatewayname}').as('missingFields')
    cy.wrap({
        type: 'smpp',
        name: '',
        systemId,
        host,
        systemType,
        port,
        password,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        compressed,
    }).as('gatewayData')
})

When('the user submits', () => {
    cy.getWithDataTest('{forms-gatewaysmppform-submit}').click()
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
