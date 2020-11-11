import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()

    cy.fixture(
        'commands/edit_cmd_tracked_entity_registration/commandsForListView'
    ).then(response => {
        const commandId = response.smsCommands[0].id

        cy.route({
            url: /\/smsCommands\?paging=false&fields=\*/,
            method: 'GET',
            response:
                'fixture:commands/edit_cmd_tracked_entity_registration/commandsForListView',
        })

        cy.route({
            url: new RegExp(`${commandId}[?]fields=parserType`),
            method: 'GET',
            response:
                'fixture:commands/edit_cmd_tracked_entity_registration/commandParserType',
        })

        cy.route({
            url: new RegExp(`${commandId}[?].*trackedEntityAttribute`),
            method: 'GET',
            response:
                'fixture:commands/edit_cmd_tracked_entity_registration/commandDetails',
        })

        cy.route({
            url: new RegExp(`smsCommands[/]${commandId}`),
            method: 'PUT',
            response: {},
        }).as('updateSmsCommandXhr')
    })
})

Given(
    'the user is editing an tracked entity registration parser command',
    () => {
        cy.visitWhenStubbed('/')
        cy.get('{navigation-navigationitem}:nth-child(3)').click()
        // There's only one command in the mocked api response
        cy.get('{views-smscommandlist-commandtable} button').click()
    }
)

Given('the command has short codes', () => {
    cy.get('h2:contains("SMS short codes") + {forms-formrow}').should('exist')
})

When('the user changes the name field', () => {
    cy.get('{commands-fieldcommandname} input')
        .invoke('val')
        .then(currentName => {
            cy.wrap({ name: `${currentName}!` }).as('newValues')
            cy.get('{commands-fieldcommandname} input').type('!')
        })
})

When('the user changes the fieldSeparator field', () => {
    const separator = 'New separator'

    cy.get('{forms-fieldcommandseparator} input')
        .clear()
        .type(separator)

    cy.wrap({ separator }).as('newValues')
})

When('the user changes the replyMessage field', () => {
    const defaultMessage = 'New default message'

    cy.get('{forms-fieldcommanddefaultmessage} textarea')
        .clear()
        .type(defaultMessage)

    cy.wrap({ defaultMessage }).as('newValues')
})

When('the user changes the wrongFormatMessage field', () => {
    const wrongFormatMessage = 'New wrong format message'

    cy.get('{forms-fieldcommandwrongformatmessage} textarea')
        .clear()
        .type(wrongFormatMessage)

    cy.wrap({ wrongFormatMessage }).as('newValues')
})

When('the user changes the noUserMessage field', () => {
    const noUserMessage = 'New no user message'

    cy.get('{forms-fieldcommandnousermessage} textarea')
        .clear()
        .type(noUserMessage)

    cy.wrap({ noUserMessage }).as('newValues')
})

When('the user changes the moreThanOneOrgUnitMessage field', () => {
    const moreThanOneOrgUnitMessage = 'New more than one org unit message'

    cy.get('{forms-fieldcommandmorethanoneorgunitmessage} textarea')
        .clear()
        .type(moreThanOneOrgUnitMessage)

    cy.wrap({ moreThanOneOrgUnitMessage }).as('newValues')
})

When('the user changes the successMessage field', () => {
    const successMessage = 'New success message'

    cy.get('{forms-fieldcommandsuccessmessage} textarea')
        .clear()
        .type(successMessage)

    cy.wrap({ successMessage }).as('newValues')
})

When('the user changes the name field to an invalid value', () => {
    cy.get('{commands-fieldcommandname} input').clear()
})

When('the user changes the value of a sms short code', () => {
    const newSmsShortCodeValue = 'New sms short code value'
    cy.wrap(newSmsShortCodeValue).as('newSmsShortCodeValue')
    cy.get('h2:contains("SMS short codes") + {forms-formrow} input')
        .clear()
        .type(newSmsShortCodeValue)
})

When('the user submits the form', () => {
    cy.get('{views-smscommandformedit} button[type="submit"]').click()
})

Then('the form should submit successfully', () => {
    cy.wait('@updateSmsCommandXhr').then(xhr => {
        expect(xhr.status).to.equal(200)
        cy.wrap(xhr.request.body).as('payload')
    })
})

Then('the complete command should be sent to the endpoint', () => {
    cy.get('@payload').then(payload => {
        assert.isString(payload.name)
        assert.isString(payload.parserType)
        assert.isString(payload.separator)
        assert.isString(payload.wrongFormatMessage)
        assert.isString(payload.noUserMessage)
        assert.isString(payload.moreThanOneOrgUnitMessage)
        assert.isString(payload.successMessage)
        assert.isArray(payload.smsCodes)
    })
})

Then(
    'the value of the changed name field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.name).to.equal(newValues.name)
        })
    }
)

Then(
    'the value of the changed fieldSeparator field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.separator).to.equal(newValues.separator)
        })
    }
)

Then(
    'the value of the changed replyMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.defaultMessage).to.equal(newValues.defaultMessage)
        })
    }
)

Then(
    'the value of the changed wrongFormatMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.wrongFormatMessage).to.equal(
                newValues.wrongFormatMessage
            )
        })
    }
)

Then(
    'the value of the changed noUserMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.noUserMessage).to.equal(newValues.noUserMessage)
        })
    }
)

Then(
    'the value of the changed moreThanOneOrgUnitMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.moreThanOneOrgUnitMessage).to.equal(
                newValues.moreThanOneOrgUnitMessage
            )
        })
    }
)

Then(
    'the value of the changed successMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.successMessage).to.equal(newValues.successMessage)
        })
    }
)

Then(
    'updated value of the sms short code should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newSmsShortCodeValue')
        ).then(([payload, newSmsShortCodeValue]) => {
            expect(
                payload.smsCodes.filter(
                    code => (code.value = newSmsShortCodeValue)
                )
            ).to.have.length(1)
        })
    }
)

Then('the form should not submit successfully', () => {
    cy.get('{views-smscommandformedit} .error').should(
        'have.length.of.at.least',
        1
    )
})
