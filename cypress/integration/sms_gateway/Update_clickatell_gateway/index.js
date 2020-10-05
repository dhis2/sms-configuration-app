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
        type: 'clickatell',
        uid: 'cAYcoWH79E',
        name: 'Clickatell Gateway',
        username: 'Username',
        authToken: 'Auth token',
        isDefault: false,
        sendUrlParameters: false,
        urlTemplate: 'https://api.clickatell.com/v1/messages',
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

    gateways.forEach(gateway => {
        const { uid } = gateway
        const url = new RegExp(`.*/gateways/${uid}`)

        cy.route({
            url,
            response: gateway,
        })

        cy.route({
            url,
            method: 'PUT',
            response: {},
        }).as(`updateGatewayConfiguration${uid}XHR`)
    })

    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When(
    'the user clicks on the update button in the first clickatell gateway',
    () => {
        cy.get('{gateways-gatewaystable-type}:contains("Clickatell")')
            .first()
            .parents('tr')
            .find('{gateways-gatewaystable-edit}')
            .click()

        cy.wrap(gateways[1])
            .as('editedGatewayConfiguration')
            .as('finalGatewayConfiguration')
    }
)

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
    "the user changes the username field's value to another valid value",
    () => {
        cy.get('{forms-fieldusername} input')
            .clear()
            .type('New user name value')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                username: 'New user name value',
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the urlTemplate field's value to another valid value",
    () => {
        cy.get('{forms-fieldurltemplate} input')
            .clear()
            .type('http://another.domain.tld')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                urlTemplate: 'http://another.domain.tld',
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the authToken field's value to another valid value",
    () => {
        cy.get('{forms-fieldauthtoken} input')
            .clear()
            .type('New auth token value')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                authToken: 'New auth token value',
            }).as('finalGatewayConfiguration')
        })
    }
)

When('submits the form', () => {
    cy.get('{forms-gatewayclickatellform-submit}').click()
})

When("the user changes the name field's value to another invalid value", () => {
    cy.get('{forms-fieldname}')
        .as('invalidField')
        .find('input')
        .clear()
})

When(
    "the user changes the username field's value to another invalid value",
    () => {
        cy.get('{forms-fieldusername}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the authtoken field's value to another invalid value",
    () => {
        cy.get('{forms-fieldauthtoken}')
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
            .type("I'm not a valid url")
    }
)

When('the user changes some fields to valid values', () => {
    cy.get('{forms-fieldname} input')
        .clear()
        .type('A valid name')
})

Then('the app should navigate to the update form', () => {
    cy.get('{views-gatewayconfigformedit}').should('exist')
    cy.get('{views-gatewayconfigformedit-formcontainer}')
        .invoke('attr', 'data-gateway-id')
        .as('gatewayId')
})

Then(
    'the input fields contain the information of the chosen gateway configuration',
    () => {
        cy.all(
            () => cy.get('@editedGatewayConfiguration'),
            () => cy.get('{forms-fieldname} input'),
            () => cy.get('{forms-fieldusername} input'),
            () => cy.get('{forms-fieldauthtoken} input')
        ).then(
            ([
                editedGatewayConfiguration,
                $nameInput,
                $usernameInput,
                $authtokenInput,
            ]) => {
                const { name, username, authToken } = editedGatewayConfiguration

                expect($nameInput.val()).to.eql(name)
                expect($usernameInput.val()).to.eql(username)
                expect($authtokenInput.val()).to.eql(authToken)
            }
        )
    }
)

Then('the updates should be sent to the correct endpoint', () => {
    cy.get('@gatewayId').then(id => {
        cy.all(
            () => cy.wait(`@updateGatewayConfiguration${id}XHR`),
            () => cy.get('@finalGatewayConfiguration')
        ).then(([xhr, finalGatewayConfiguration]) => {
            expect(xhr.status).to.equal(200)

            const sentData = xhr.request.body
            const {
                name,
                username,
                urlTemplate,
                authToken,
            } = finalGatewayConfiguration

            expect(sentData.name).to.equal(name)
            expect(sentData.username).to.equal(username)
            expect(sentData.authToken).to.equal(authToken)
            expect(sentData.urlTemplate).to.equal(urlTemplate)
        })
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
