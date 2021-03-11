import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

const selectSelectValue = (selectSelector, optionValue) => {
    cy.get(selectSelector).click()
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
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
    cy.get('{views-gatewayconfiglist-add}').click()

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

    cy.get('{gateways-fieldgatewayname}').type(name)
    cy.get('{gateways-fieldgatewaysystemid}').type(systemId)
    cy.get('{gateways-fieldgatewayhost}').type(host)
    cy.get('{gateways-fieldgatewaysystemtype}').type(systemType)
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
    cy.get('{gateways-fieldgatewayport}').type(port)
    cy.get('{gateways-fieldgatewaypassword}').type(password)

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

    cy.get('{gateways-fieldgatewaysystemid}').type(systemId)
    cy.get('{gateways-fieldgatewayhost}').type(host)
    cy.get('{gateways-fieldgatewaysystemtype}').type(systemType)
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
    cy.get('{gateways-fieldgatewayport}').type(port)
    cy.get('{gateways-fieldgatewaypassword}').type(password)

    cy.get('{gateways-fieldgatewayname}').as('missingFields')
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
    cy.get('{forms-gatewaysmppform-submit}').click()
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
            cy.wrap($missingField).find('.error').should('exist')
        })
    })
})
