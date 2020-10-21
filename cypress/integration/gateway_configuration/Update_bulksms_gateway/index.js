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
        useGet: false,
        contentType: 'FORM_URL_ENCODED',
        parameters: [],
    },
    {
        type: 'bulksms',
        uid: 'cAYcoWH79E',
        name: 'BulkSMS Gateway',
        username: 'Username',
        isDefault: false,
        sendUrlParameters: false,
        urlTemplate: 'https://api.bulksms.com/v1/messages',
        password: 'foo',
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

    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When(
    'the user clicks on the update button in the first bulksms gateway',
    () => {
        cy.get('{gateways-gatewaystable-type}:contains("BulkSMS")')
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
    cy.get('{gateways-fieldgatewayname} input')
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
        cy.get('{gateways-fieldgatewayusername} input')
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
    "the user changes the password field's value to another valid value",
    () => {
        cy.get('{gateways-fieldgatewaypassword} input')
            .clear()
            .type('New password value')

        cy.get('{gateways-fieldgatewaypasswordconfirmation} input')
            .clear()
            .type('New password value')

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                password: 'New password value',
                passwordConfirmation: 'New password value',
            }).as('finalGatewayConfiguration')
        })
    }
)

When('submits the form', () => {
    cy.get('{forms-gatewaybulksmsform-submit}').click()
})

When("the user changes the name field's value to another invalid value", () => {
    cy.get('{gateways-fieldgatewayname}')
        .as('invalidField')
        .find('input')
        .clear()
})

When(
    "the user changes the username field's value to another invalid value",
    () => {
        cy.get('{gateways-fieldgatewayusername}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the password field's value to another invalid value",
    () => {
        cy.get('{gateways-fieldgatewaypassword}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the passwordConfirmation field's value to another invalid value",
    () => {
        cy.get('{gateways-fieldgatewaypassword}')
            .as('invalidField')
            .find('input')
            .clear()
            .type('A password')

        cy.get('{gateways-fieldgatewaypasswordconfirmation}')
            .as('invalidField')
            .find('input')
            .clear()
            .type('A different value')
    }
)

When('the user changes some fields to valid values', () => {
    cy.get('{gateways-fieldgatewayname} input')
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
            () => cy.get('{gateways-fieldgatewayname} input'),
            () => cy.get('{gateways-fieldgatewayusername} input')
        ).then(([editedGatewayConfiguration, $nameInput, $usernameInput]) => {
            const { name, username } = editedGatewayConfiguration

            expect($nameInput.val()).to.eql(name)
            expect($usernameInput.val()).to.eql(username)
        })
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
            const { name, username, password } = finalGatewayConfiguration

            expect(sentData.name).to.equal(name)
            expect(sentData.username).to.equal(username)

            if (password) {
                expect(sentData.password).to.equal(password)
            }
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
