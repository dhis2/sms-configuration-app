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

    gateways.forEach(gateway => {
        cy.route({
            url: new RegExp(`.*/gateways/${gateway.uid}`),
            response: gateway,
        })
    })

    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When('the user clicks on the update button in the first row', () => {
    cy.get(
        '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-edit}'
    ).click()

    // @TODO(missing gateway configuration props): replace once implemented
    cy.get('{forms-fieldmessageparameter} input').type('Placeholder value')
    cy.get('{forms-fieldrecipientparameter} input').type('Placeholder value')

    cy.wrap({
        ...gateways[0],
        messageParameter: 'Placeholder value',
        recipientParameter: 'Placeholder value',
    })
        .as('editedGatewayConfiguration')
        .as('finalGatewayConfiguration')
})

When("the user changes the name field's value to another valid value", () => {
    cy.get('{forms-fieldname} input')
        .clear()
        .type('New name value')

    cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
        cy.wrap({
            ...finalGatewayConfiguration,
            name: 'New name value',
        }).as('finalGatewayConfiguration')
    })
})

When(
    "the user changes the messageParameter field's value to another valid value",
    () => {
        cy.get('{forms-fieldmessageparameter} input')
            .clear()
            .type('New message parameter value')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                messageParameter: 'New message parameter value',
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the recipientParameter field's value to another valid value",
    () => {
        cy.get('{forms-fieldrecipientparameter} input')
            .clear()
            .type('New recipient parameter value')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                recipientParameter: 'New recipient parameter value',
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the urlTemplate field's value to another valid value",
    () => {
        cy.get('{forms-fieldurltemplate} input')
            .clear()
            .type('http://another-domain.tld')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                urlTemplate: 'http://another-domain.tld',
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the parameters field's value to another valid value",
    () => {
        const keyValuePairs = [
            {
                key: 'Key One',
                value: 'Value One',
                header: true,
                confidential: false,
                encode: false,
            },
            {
                key: 'Key Two',
                value: 'Value Two',
                header: false,
                confidential: true,
                encode: false,
            },
            {
                key: 'Key Three',
                value: 'Value Trhee',
                header: false,
                confidential: false,
                encode: true,
            },
        ]

        keyValuePairs.forEach(keyValuePair => {
            const { key, value, header, confidential, encode } = keyValuePair

            cy.get('{forms-addkeyvaluepair}').click()
            cy.get('{forms-keyvaluepair}')
                .last()
                .as('lastKeyValuePair')

            cy.get('@lastKeyValuePair')
                .find('{forms-keyvaluepair-key}')
                .type(key)

            cy.get('@lastKeyValuePair')
                .find('{forms-keyvaluepair-value}')
                .type(value)

            if (header) {
                cy.get('@lastKeyValuePair')
                    .find('{forms-keyvaluepair-isheader} label')
                    .click()
            }

            if (confidential) {
                cy.get('@lastKeyValuePair')
                    .find('{forms-keyvaluepair-isconfidential} label')
                    .click()
            }

            if (encode) {
                cy.get('@lastKeyValuePair')
                    .find('{forms-keyvaluepair-isencoded} label')
                    .click()
            }
        })

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                parameters: gateways.parameters
                    ? [...gateways.parameters, ...keyValuePairs]
                    : keyValuePairs,
            }).as('finalGatewayConfiguration')
        })
    }
)

When('submits the form', () => {
    cy.get('{forms-gatewaygenericform-submit}').click()
})

When("the user changes the name field's value to another invalid value", () => {
    cy.get('{forms-fieldname}')
        .as('invalidField')
        .find('input')
        .clear()
})

When(
    "the user changes the messageParameter field's value to another invalid value",
    () => {
        cy.get('{forms-fieldmessageparameter}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the recipientParameter field's value to another invalid value",
    () => {
        cy.get('{forms-fieldrecipientparameter}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the urlTemplate field's value to another invalid value",
    () => {
        cy.get('{forms-fieldurltemplate}')
            .as('invalidField')
            .find('input')
            .clear()
            .type('Invalid url value')
    }
)

When('the user changes some fields to valid values', () => {
    cy.get('{forms-fieldname} input')
        .clear()
        .type('A valid name')
})

Then('the app should navigate to the update form', () => {
    cy.get('{views-gatewayconfigformedit}').should('exist')
})

Then(
    'the input fields contain the information of the chosen gateway configuration',
    () => {
        cy.all(
            () => cy.get('@editedGatewayConfiguration'),
            () => cy.get('{forms-fieldname} input'),
            () => cy.get('{forms-fieldmessageparameter} input'),
            () => cy.get('{forms-fieldrecipientparameter} input'),
            () => cy.get('{forms-fieldurltemplate} input')
        ).then(
            ([
                editedGatewayConfiguration,
                $nameInput,
                $messageParameterInput,
                $recipientParameterInput,
                $urlTemplateInput,
            ]) => {
                const {
                    name,
                    messageParameter,
                    recipientParameter,
                    urlTemplate,
                } = editedGatewayConfiguration

                expect($nameInput.val()).to.eql(name)

                // @TODO(gatway configuration props): mP and rP not existing
                expect($messageParameterInput.val()).to.eql(
                    messageParameter || ''
                )
                expect($recipientParameterInput.val()).to.eql(
                    recipientParameter || ''
                )

                expect($urlTemplateInput.val()).to.eql(urlTemplate)
            }
        )

        cy.get('@editedGatewayConfiguration').then(({ parameters }) => {
            if (parameters.length) {
                cy.get('{forms-keyvaluepair}').should(
                    'have.lengthOf',
                    parameters.length
                )
            } else {
                cy.get('{forms-keyvaluepair}').should('not.exist')
            }
        })
    }
)

Then('the updates should be sent to the correct endpoint', () => {
    cy.all(
        () => cy.wait('@updateGatewayConfigurationXHR'),
        () => cy.get('@finalGatewayConfiguration')
    ).then(([xhr, finalGatewayConfiguration]) => {
        expect(xhr.status).to.equal(200)

        const sentData = xhr.request.body
        const {
            name,
            messageParameter,
            recipientParameter,
            urlTemplate,
            parameters,
        } = finalGatewayConfiguration

        expect(sentData.name).to.equal(name)
        expect(sentData.messageParameter).to.equal(messageParameter)
        expect(sentData.recipientParameter).to.equal(recipientParameter)
        expect(sentData.urlTemplate).to.equal(urlTemplate)
        expect(sentData.parameters).to.eql(parameters)
    })
})

Then('the form does not submit', () => {
    cy.get('{views-gatewayconfiglist}').should('not.exist')
})

Then('an error message should be shown at the invalid field', () => {
    cy.get('@invalidField')
        .find('.error')
        .should('exist')
})

Then(
    'the user should be redirected to the gateway configuration overview page',
    () => {
        cy.get('{views-gatewayconfiglist}').should('exist')
    }
)
