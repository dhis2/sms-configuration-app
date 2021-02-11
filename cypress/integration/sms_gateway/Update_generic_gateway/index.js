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
        parameters: [
            {
                key: 'Key One',
                value: 'Value One',
                header: false,
                encode: false,
                confidential: false,
            },
            {
                key: 'Key Two',
                value: 'Value Two',
                header: true,
                encode: false,
                confidential: false,
            },
            {
                key: 'Key Three',
                value: 'Value Three',
                header: false,
                encode: true,
                confidential: false,
            },
            {
                key: 'Key Four',
                value: 'Value Four',
                header: false,
                encode: false,
                confidential: true,
            },
        ],
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
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: { gateways },
    })

    cy.route({
        url: /.*\/gateways$/,
        method: 'PUT',
        response: {},
    }).as('updateGatewayConfigurationXHR')

    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When('the user clicks on the edit button in the first row', () => {
    cy.get(
        '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-edit}'
    ).click()
})

Then('the app should navigate to the update form', () => {
    cy.get('{views-gatewayconfigformedit}').should('exist')
})

Then(
    'the input fields contain the information of the chosen gateway configuration',
    () => {
        cy.all(
            () => cy.get('{forms-fieldname} input'),
            () => cy.get('{forms-fieldmessageparameter} input'),
            () => cy.get('{forms-fieldrecipientparameter} input'),
            () => cy.get('{forms-fieldurltemplate} input'),
            () => cy.get('{forms-keyvaluepair}')
        ).then(
            ([
                $nameInput,
                $messageParameterInput,
                $recipientParameterInput,
                $urlTemplateInput,
                $keyValuePairs,
            ]) => {
                const {
                    name,
                    messageParameter,
                    recipientParameter,
                    urlTemplate,
                    parameters,
                } = gateways[0]

                expect($nameInput.val()).to.eql(name)
                expect($messageParameterInput.val()).to.eql(messageParameter)
                expect($recipientParameterInput.val()).to.eql(
                    recipientParameter
                )
                expect($urlTemplateInput.val()).to.eql(urlTemplate)

                parameters.forEach(parameter => {
                    const {
                        key,
                        value,
                        confidential,
                        header,
                        encode,
                    } = parameter

                    $keyValuePairs.each((index, keyValuePair) => {
                        const $keyValuePair = Cypress.$(keyValuePair)

                        cy.wrap($keyValuePair)
                            .find('{forms-keyvaluepair-key} input')
                            .should('have.value', key)

                        cy.wrap($keyValuePair)
                            .find('{forms-keyvaluepair-value} input')
                            .should('have.value', value)

                        cy.wrap($keyValuePair)
                            .find('{forms-keyvaluepair-isconfidential} input')
                            .should(
                                confidential ? 'be.checked' : 'not.be.checked'
                            )

                        cy.wrap($keyValuePair)
                            .find('{forms-keyvaluepair-isheader} input')
                            .should(header ? 'be.checked' : 'not.be.checked')

                        cy.wrap($keyValuePair)
                            .find('{forms-keyvaluepair-isencoded} input')
                            .should(encode ? 'be.checked' : 'not.be.checked')
                    })
                })
            }
        )
    }
)
