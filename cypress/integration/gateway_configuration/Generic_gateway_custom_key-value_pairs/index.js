import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

const gateways = [
    {
        type: 'http',
        uid: 'wRi738xEht',
        name: 'Foobarbaz',
        isDefault: true,
        urlTemplate: 'https://a.url.tld',
        configurationTemplate: 'foo',
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
        configurationTemplate: 'foo',
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
        configurationTemplate: 'foo',
        useGet: false,
        contentType: 'FORM_URL_ENCODED',
        parameters: [],
    },
]

const defaultParameter = {
    key: '',
    value: '',
    header: false,
    encode: false,
    confidential: false,
}

Given('the user navigated to the gateway configuration page', () => {
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: { gateways },
    })

    cy.route({
        url: /.*\/gateways$/,
        method: 'POST',
        response: {},
    }).as('createGatewayConfigurationXHR')

    gateways.forEach(({ uid }) => {
        cy.route({
            url: new RegExp(`.*/gateways/${uid}`),
            method: 'PUT',
            response: {},
        }).as(`updateGatewayConfiguration${uid}XHR`)
    })

    cy.wrap(defaultParameter).as('newParameter')

    cy.wrap(gateways).as('gateways')
    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{navigation-navigationitem}:nth-child(2)').click()
})

Given('the user is editing a generic gateway configuration', () => {
    cy.get('@gateways').then(gateways => {
        gateways.forEach(gateway => {
            cy.route({
                url: new RegExp(`.*/gateways/${gateway.uid}$`),
                method: 'GET',
                response: gateway,
            })
        })
    })

    cy.wrap('editing').as('operation')

    cy.getWithDataTest(
        '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-edit}'
    ).click()

    cy.getWithDataTest('{views-gatewayconfigformedit}').should('exist')
    cy.getWithDataTest('{views-gatewayconfigformedit-formcontainer}')
        .invoke('attr', 'data-gateway-id')
        .as('gatewayId')
})

Given('the user is adding a generic gateway configuration', () => {
    cy.wrap('adding').as('operation')
    cy.getWithDataTest('{views-gatewayconfiglist-add}').click()
    cy.getWithDataTest('{views-gatewayconfigformnew}').should('exist')

    // Need to provide the required values,
    // otherwise the form can't be submitted
    cy.getWithDataTest('{gateways-fieldgatewayname}').type('Field name', {
        delay: 0,
    })
    cy.getWithDataTest('{gateways-fieldgatewayurltemplate}').type(
        'http://domain.tld',
        {
            delay: 0,
        }
    )
    cy.getWithDataTest(
        '{gateways-fieldgatewayconfigurationtemplate}'
    ).type('Configuration template', { delay: 0 })
})

Given('the user has added multiple key value pairs', () => {
    const keyValuePairs = [
        { key: 'Key One', value: 'Value One' },
        { key: 'Key Two', value: 'Value Two' },
        { key: 'Key Three', value: 'Value Trhee' },
    ]

    keyValuePairs.forEach(({ key, value }) => {
        cy.getWithDataTest('{gateways-gatewayaddkeyvaluepair}').click()
        cy.getWithDataTest('{gateways-gatewaykeyvaluepair}')
            .last()
            .as('lastKeyValuePair')

        cy.get('@lastKeyValuePair')
            .findWithDataTest('{gateways-gatewaykeyvaluepair-key}')
            .type(key)

        cy.get('@lastKeyValuePair')
            .findWithDataTest('{gateways-gatewaykeyvaluepair-value}')
            .type(value)
    })

    const newParameters = keyValuePairs.map(keyValuePair => ({
        ...defaultParameter,
        ...keyValuePair,
    }))

    cy.wrap(newParameters).as('newParameters')
})

When('the user clicks on the "add more" button', () => {
    cy.getWithDataTest('{gateways-gatewayaddkeyvaluepair}').click()
})

When('the user enters values for the key and value', () => {
    cy.getWithDataTest('{gateways-gatewaykeyvaluepair-key} input').type('Key')
    cy.getWithDataTest('{gateways-gatewaykeyvaluepair-value} input').type(
        'Value'
    )

    cy.get('@newParameter').then(newParameter => {
        const updated = {
            ...newParameter,
            key: 'Key',
            value: 'Value',
        }

        cy.wrap(updated).as('newParameter')
    })
})

When('checks the "confidential" checkbox', () => {
    cy.getWithDataTest(
        '{gateways-gatewaykeyvaluepair} {gateways-gatewaykeyvaluepair-isconfidential} label'
    ).click()

    cy.get('@newParameter').then(newParameter => {
        const updated = {
            ...newParameter,
            confidential: true,
        }

        cy.wrap(updated).as('newParameter')
    })
})

When('checks the "header" checkbox', () => {
    cy.getWithDataTest('{gateways-gatewaykeyvaluepair-isheader} label').click()

    cy.get('@newParameter').then(newParameter => {
        const updated = {
            ...newParameter,
            header: true,
        }

        cy.wrap(updated).as('newParameter')
    })
})

When('the user submits the form', () => {
    cy.getWithDataTest('{forms-gatewaygenericform-submit}').click()
})

Then('the key-value form should appear', () => {
    cy.getWithDataTest('{gateways-gatewaykeyvaluepair}').should('exist')
})

Then('the additional key-value pair should be sent to the endpoint', () => {
    cy.all(
        () => cy.get('@operation'),
        () => cy.get('@newParameter')
    )
        .then(([operation, newParameter]) => {
            if (operation === 'editing') {
                return cy
                    .get('@gatewayId')
                    .then(gatewayId => [operation, newParameter, gatewayId])
            }

            return [operation, newParameter]
        })
        .then(([operation, newParameter, gatewayId]) => {
            cy.wait(
                operation === 'editing'
                    ? `@updateGatewayConfiguration${gatewayId}XHR`
                    : '@createGatewayConfigurationXHR'
            ).then(xhr => {
                const { parameters } = xhr.request.body
                expect(parameters).to.have.lengthOf(1)

                const [parameter] = parameters
                expect(parameter).to.eql(newParameter)
            })
        })
})

Then('all provided key value pairs should be sent to the endpoint', () => {
    cy.all(
        () => cy.get('@operation'),
        () => cy.get('@newParameters')
    )
        .then(([operation, newParameters]) => {
            if (operation === 'editing') {
                return cy
                    .get('@gatewayId')
                    .then(gatewayId => [operation, newParameters, gatewayId])
            }

            return [operation, newParameters]
        })
        .then(([operation, newParameters, gatewayId]) => {
            cy.wait(
                operation === 'editing'
                    ? `@updateGatewayConfiguration${gatewayId}XHR`
                    : '@createGatewayConfigurationXHR'
            ).then(xhr => {
                const { parameters } = xhr.request.body
                expect(parameters).to.have.lengthOf(newParameters.length)
                expect(parameters).to.eql(newParameters)
            })
        })
})
