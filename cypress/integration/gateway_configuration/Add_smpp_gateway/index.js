import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

const selectSelectValue = (selectSelector, optionValue) => {
    cy.getWithDataTest(selectSelector).click()
    return cy.get(`[data-value="${optionValue}"]`).click()
}

Given('the user is adding a new gateway with type SMPP', () => {
    cy.route({
        url: /\/gateways.json$/,
        method: 'GET',
        response: { gateways: [] },
    })

    cy.route({
        url: /gateways/,
        method: 'POST',
        response: {},
    }).as('createGatewayConfigurationXHR')

    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{navigation-navigationitem}:nth-child(2)').click()
    cy.getWithDataTest('{views-gatewayconfiglist-add}').click()

    selectSelectValue(
        '{views-gatewayconfigformnew-gatewaytype} [data-test="dhis2-uicore-singleselect"]',
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

    cy.getWithDataTest('{gateways-fieldgatewayname}').type(name)
    cy.getWithDataTest('{gateways-fieldgatewaysystemid}').type(systemId)
    cy.getWithDataTest('{gateways-fieldgatewayhost}').type(host)
    cy.getWithDataTest('{gateways-fieldgatewaysystemtype}').type(systemType)
    selectSelectValue(
        '{gateways-fieldgatewaynumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{gateways-fieldgatewaytypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{gateways-fieldgatewaybindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.getWithDataTest('{gateways-fieldgatewayport}').type(port)
    cy.getWithDataTest('{gateways-fieldgatewaypassword}').type(password)

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

    cy.getWithDataTest('{gateways-fieldgatewaysystemid}').type(systemId)
    cy.getWithDataTest('{gateways-fieldgatewayhost}').type(host)
    cy.getWithDataTest('{gateways-fieldgatewaysystemtype}').type(systemType)
    selectSelectValue(
        '{gateways-fieldgatewaynumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
        numberPlanIndicator
    )
    selectSelectValue(
        '{gateways-fieldgatewaytypeofnumber} [data-test="dhis2-uicore-singleselect"]',
        typeOfNumber
    )
    selectSelectValue(
        '{gateways-fieldgatewaybindtype} [data-test="dhis2-uicore-singleselect"]',
        bindType
    )
    cy.getWithDataTest('{gateways-fieldgatewayport}').type(port)
    cy.getWithDataTest('{gateways-fieldgatewaypassword}').type(password)

    cy.getWithDataTest('{gateways-fieldgatewayname}').as('missingFields')
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
