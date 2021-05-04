import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const gateways = [
    {
        type: 'http',
        uid: 'wRi738xEht',
        name: 'Foobarbaz',
        isDefault: true,
        urlTemplate: 'https://a.url.tld',
        useGet: false,
        contentType: 'FORM_URL_ENCODED',
        parameters: [],
    },
    {
        type: 'http',
        uid: 'wddjdkXLsD',
        name: 'asdf',
        isDefault: false,
        urlTemplate: 'http://d.dd',
        useGet: false,
        contentType: 'FORM_URL_ENCODED',
        parameters: [],
    },
    {
        type: 'http',
        uid: 'EylO7K98mx',
        name: 'foobar',
        isDefault: false,
        urlTemplate: 'http://d.dd',
        useGet: false,
        contentType: 'FORM_URL_ENCODED',
        parameters: [],
    },
]

Given('the user navigated to the gateway configuration page', () => {
    cy.intercept('GET', /.*\/gateways.json$/, {
        body: { gateways },
    })

    cy.intercept('POST', /.*\/gateways$/, {
        body: {},
    }).as('createGatewayConfigurationXHR')

    gateways.forEach(gateway => {
        cy.intercept(new RegExp(`.*/gateways/${gateway.uid}`), {
            body: gateway,
        })
    })

    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
})

When('the user clicks on the add gateway button', () => {
    cy.getWithDataTest('{shared-listactions-add}').click()
})

When('the user fills in complete form data', () => {
    const name = 'foo'
    const urlTemplate = 'http://domain.tld'
    const configurationTemplate = 'foobarbaz'
    const contentType = 'FORM_URL_ENCODED'

    cy.wrap({
        type: 'http',
        name,
        urlTemplate,
        configurationTemplate,
        contentType,
        parameters: [],
    }).as('gatewayData')

    cy.getWithDataTest('{smsgateway-fieldgatewayname} input').type(name)
    cy.getWithDataTest('{smsgateway-fieldurltemplate} input').type(urlTemplate)
    cy.getWithDataTest('{smsgateway-fieldconfigurationtemplate} input').type(
        configurationTemplate
    )

    cy.getWithDataTest('{smsgateway-fieldcontenttype-content}').click()
    cy.get(`[data-value="${contentType}"]`).click()
})

When('the user fills in incomplete form data', () => {
    cy.getWithDataTest('{smsgateway-fieldgatewayname} input').type('Name')
    cy.getWithDataTest('{smsgateway-fieldurltemplate}').as('missingFields')
})

When('the user submits', () => {
    cy.getWithDataTest('{forms-gatewaygenericform-submit}').click()
})

Then('the add gateway form should be displayed', () => {
    cy.getWithDataTest('{smsgateway-viewsmsgatewayadd}').should('exist')
})

Then('the default gateway type is "generic"', () => {
    cy.getWithDataTest(
        '{smsgateway-viewsmsgatewayadd-gatewaytype} {smsgateway-viewsmsgatewayadd-gatewaytype-content}'
    ).should('exist')

    cy.getWithDataTest(
        '{smsgateway-viewsmsgatewayadd-gatewaytype} {smsgateway-viewsmsgatewayadd-gatewaytype-content}'
    ).should('contain', 'Generic')
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
