import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

const selectSelectValue = (selectSelector, optionValue) => {
    cy.get(selectSelector).click()
    return cy.get(`[data-value="${optionValue}"]`).click()
}

const gateways = [
    {
        type: 'smpp',
        uid: 'GDDrUFgtsI',
        name: 'smpp test',
        password: 'foofoofoo',
        isDefault: true,
        sendUrlParameters: false,
        numberPlanIndicator: 'UNKNOWN',
        typeOfNumber: 'NETWORK_SPECIFIC',
        bindType: 'BIND_TX',
        port: '123',
        compressed: false,
        systemId: 'foobar',
        host: 'localhost',
    },
    {
        type: 'smpp',
        uid: 'GDDrUFgtsA',
        name: 'smpp test 2',
        password: 'asdfasdfsadf',
        isDefault: true,
        sendUrlParameters: false,
        numberPlanIndicator: 'UNKNOWN',
        typeOfNumber: 'NETWORK_SPECIFIC',
        bindType: 'BIND_TX',
        port: '123',
        compressed: false,
        systemId: 'foobar',
        host: 'localhost',
    },
    {
        type: 'smpp',
        uid: 'GDDrUFgtsB',
        name: 'smpp test 3',
        password: 'barbazfoobar',
        isDefault: true,
        sendUrlParameters: false,
        numberPlanIndicator: 'UNKNOWN',
        typeOfNumber: 'NETWORK_SPECIFIC',
        bindType: 'BIND_TX',
        port: '123',
        compressed: true,
        systemId: 'foobar',
        host: 'localhost',
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
    cy.get('{shared-navigationitem}:nth-child(2)').click()
})

When('the user clicks on the update button in the first SMPP gateway', () => {
    cy.get('{smsgateway-stable-type}:contains("smpp")')
        .first()
        .parents('tr')
        .find('{smsgateway-stable-edit}')
        .click()

    cy.wrap(gateways[0])
        .as('editedGatewayConfiguration')
        .as('finalGatewayConfiguration')
})

When(
    /the user changes the (.*) field's value to another valid value/,
    field => {
        cy.get('@editedGatewayConfiguration').then(
            editedGatewayConfiguration => {
                let newValue
                const prevValue = editedGatewayConfiguration[field]
                const dataTest = `{smsgateway-field${field.toLowerCase()}}`
                const isInputField = [
                    'name',
                    'systemId',
                    'host',
                    'systemType',
                    'port',
                    'password',
                ].includes(field)

                if (isInputField) {
                    newValue = field === 'port' ? '1337' : 'This is a new value'
                    cy.get(`${dataTest} input`).clear().type(newValue)
                } else if (field === 'numberPlanIndicator') {
                    newValue = 'INTERNET'
                    selectSelectValue(
                        '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-singleselect"]',
                        newValue
                    )
                } else if (field === 'typeOfNumber') {
                    newValue = 'ABBREVIATED'
                    selectSelectValue(
                        '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-singleselect"]',
                        newValue
                    )
                } else if (field === 'bindType') {
                    newValue = 'BIND_TRX'
                    selectSelectValue(
                        '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-singleselect"]',
                        newValue
                    )
                } else if (field === 'compressed') {
                    newValue = !prevValue
                    cy.get(`${dataTest} label`).click()
                }

                cy.get('@finalGatewayConfiguration').then(
                    finalGatewayConfiguration => {
                        cy.wrap({
                            ...finalGatewayConfiguration,
                            [field]: newValue,
                        }).as('finalGatewayConfiguration')
                    }
                )
            }
        )
    }
)

When('submits the form', () => {
    cy.get('{forms-gatewaysmppform-submit}').click()
})

When(
    /the user changes the (.+) field's value to another invalid value/,
    field => {
        const dataTest = `{smsgateway-field${field.toLowerCase()}}`
        const newValue = field === 'port' ? '1337' : 'This is a new value'
        cy.get(dataTest).as('invalidField').find('input').clear()

        cy.get('@finalGatewayConfiguration').then(finalGatewayConfiguration => {
            cy.wrap({
                ...finalGatewayConfiguration,
                [field]: newValue,
            }).as('finalGatewayConfiguration')
        })
    }
)

When(
    "the user changes the username field's value to another invalid value",
    () => {
        cy.get('{smsgateway-fieldusername}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the authToken field's value to another invalid value",
    () => {
        cy.get('{smsgateway-fieldauthtoken}')
            .as('invalidField')
            .find('input')
            .clear()
    }
)

When(
    "the user changes the urlTemplate field's value to another invalid value",
    () => {
        cy.get('{smsgateway-fieldurltemplate}')
            .as('invalidField')
            .find('input')
            .clear()
            .type("I'm not a valid url")
    }
)

When('the user changes some fields to valid values', () => {
    cy.get('{smsgateway-fieldgatewayname} input').clear().type('A valid name')
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
            () => cy.get('{smsgateway-fieldgatewayname} input'),
            () => cy.get('{smsgateway-fieldsystemid} input'),
            () => cy.get('{smsgateway-fieldhost} input'),
            () =>
                cy.get(
                    '{smsgateway-fieldnumberplanindicator} [data-test="dhis2-uicore-select"]'
                ),
            () =>
                cy.get(
                    '{smsgateway-fieldtypeofnumber} [data-test="dhis2-uicore-select"]'
                ),
            () =>
                cy.get(
                    '{smsgateway-fieldbindtype} [data-test="dhis2-uicore-select"]'
                ),
            () => cy.get('{smsgateway-fieldsystemtype} input'),
            () => cy.get('{smsgateway-fieldport} input'),
            () => cy.get('{smsgateway-fieldpassword} input')
        ).then(
            ([
                editedGatewayConfiguration,
                $nameInput,
                $systemIdInput,
                $hostInput,
                $numberPlanIndicatorSelect,
                $typeOfNumberSelect,
                $bindTypeSelect,
                $systemTypeInput,
                $portInput,
                $passwordInput,
            ]) => {
                const {
                    name,
                    systemId,
                    host,
                    numberPlanIndicator,
                    typeOfNumber,
                    bindType,
                    systemType = '', // not a required value
                    port,
                    password,
                } = editedGatewayConfiguration

                expect($nameInput.val()).to.eql(name)
                expect($systemIdInput.val()).to.eql(systemId)
                expect($hostInput.val()).to.eql(host)
                expect($numberPlanIndicatorSelect).to.contain(
                    numberPlanIndicator
                )
                expect($typeOfNumberSelect).to.contain(typeOfNumber)
                expect($bindTypeSelect).to.contain(bindType)
                expect($systemTypeInput.val()).to.eql(systemType)
                expect($portInput.val()).to.eql(port)
                expect($passwordInput.val()).to.eql(password)
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
                systemId,
                host,
                systemType = '',
                port,
                password,
                numberPlanIndicator,
                typeOfNumber,
                bindType,
                compressed,
            } = finalGatewayConfiguration

            expect(sentData.name).to.equal(name)
            expect(sentData.systemId).to.equal(systemId)
            expect(sentData.host).to.equal(host)
            expect(sentData.systemType).to.equal(systemType)
            expect(sentData.port).to.equal(port)
            expect(sentData.password).to.equal(password)
            expect(sentData.numberPlanIndicator).to.equal(numberPlanIndicator)
            expect(sentData.typeOfNumber).to.equal(typeOfNumber)
            expect(sentData.bindType).to.equal(bindType)
            expect(sentData.compressed).to.equal(compressed)
        })
    })
})

Then('the form does not submit', () => {
    cy.get('{views-gatewayconfiglist}').should('not.exist')
})

Then('an error message should be shown at the invalid field', () => {
    cy.get('@invalidField').find('.error').should('exist')
})

Then(
    'the user should be redirected to the gateway configuration overview page',
    () => {
        cy.get('{views-gatewayconfiglist}').should('exist')
    }
)
