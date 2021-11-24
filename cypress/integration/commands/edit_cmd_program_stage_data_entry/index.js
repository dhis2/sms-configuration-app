import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()

    cy.fixture(
        'commands/edit_cmd_program_stage_data_entry/commandDetails'
    ).then((command) => {
        const commandId = command.id

        cy.intercept('GET', /\/smsCommands\?paging=false&fields=\*/, {
            fixture:
                'commands/edit_cmd_program_stage_data_entry/commandsForListView',
        })

        cy.intercept('GET', new RegExp(`${commandId}[?]fields=parserType`), {
            fixture:
                'commands/edit_cmd_program_stage_data_entry/commandParserType',
        })

        cy.intercept('GET', new RegExp(`${commandId}[?].*fields=[*]`), {
            body: command,
        })

        cy.intercept('PUT', new RegExp(`smsCommands[/]${commandId}`), {
            body: {},
        }).as('updateSmsCommandXhr')
    })
})

Given('the user is editing an program stage data entry parser command', () => {
    cy.visit('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(3)').click()
    // There's only one command in the mocked api response
    cy.getWithDataTest('{views-smscommandlist-commandtable} button').click()
})

Given('the command has short codes', () => {
    cy.getWithDataTest('{smscommand-fieldsmscodedataelement}').should(
        'have.length.of.at.least',
        1
    )
})

When('the user changes the name field', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input')
        .invoke('val')
        .then((currentName) => {
            cy.wrap({ name: `${currentName}!` }).as('newValues')
            cy.getWithDataTest('{smscommand-fieldcommandname} input').type('!')
        })
})

When('the user changes the fieldSeparator field', () => {
    const separator = 'New separator'

    cy.getWithDataTest('{smscommand-fieldseparator} input')
        .clear()
        .type(separator)

    cy.wrap({ separator }).as('newValues')
})

When('the user changes the replyMessage field', () => {
    const defaultMessage = 'New default message'

    cy.getWithDataTest('{smscommand-fielddefaultmessage} textarea')
        .clear()
        .type(defaultMessage)

    cy.wrap({ defaultMessage }).as('newValues')
})

When('the user changes the wrongFormatMessage field', () => {
    const wrongFormatMessage = 'New wrong format message'

    cy.getWithDataTest('{smscommand-fieldwrongformatmessage} textarea')
        .clear()
        .type(wrongFormatMessage)

    cy.wrap({ wrongFormatMessage }).as('newValues')
})

When('the user changes the noUserMessage field', () => {
    const noUserMessage = 'New no user message'

    cy.getWithDataTest('{smscommand-fieldnousermessage} textarea')
        .clear()
        .type(noUserMessage)

    cy.wrap({ noUserMessage }).as('newValues')
})

When('the user changes the moreThanOneOrgUnitMessage field', () => {
    const moreThanOneOrgUnitMessage = 'New more than one org unit message'

    cy.getWithDataTest('{smscommand-fieldmorethanoneorgunitmessage} textarea')
        .clear()
        .type(moreThanOneOrgUnitMessage)

    cy.wrap({ moreThanOneOrgUnitMessage }).as('newValues')
})

When('the user changes the successMessage field', () => {
    const successMessage = 'New success message'

    cy.getWithDataTest('{smscommand-fieldsuccessmessage} textarea')
        .clear()
        .type(successMessage)

    cy.wrap({ successMessage }).as('newValues')
})

When('the user changes the name field to an invalid value', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').clear()
})

When('the user changes the value of a sms short code', () => {
    const newSmsShortCodeValue = 'New sms short code value'
    cy.wrap(newSmsShortCodeValue).as('newSmsShortCodeValue')
    cy.getWithDataTest('{smscommand-fieldsmscodedataelement}:first-child input')
        .clear()
        .type(newSmsShortCodeValue)
})

When('the user submits the form', () => {
    cy.getWithDataTest(
        '{smscommand-viewsmscommandedit} button[type="submit"]'
    ).click()
})

Then('the form should submit successfully', () => {
    cy.wait('@updateSmsCommandXhr').then((result) => {
        expect(result.response.statusCode).to.equal(200)
        cy.wrap(result.request.body).as('payload')
    })
})

Then('the complete command should be sent to the endpoint', () => {
    cy.get('@payload').then((payload) => {
        assert.isString(payload.name)
        assert.isString(payload.parserType)
        assert.isString(payload.programStage.id)
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
                    (code) => (code.value = newSmsShortCodeValue)
                )
            ).to.have.length(1)
        })
    }
)

Then('the form should not submit successfully', () => {
    cy.getWithDataTest('{smscommand-viewsmscommandedit} .error').should(
        'have.length.of.at.least',
        1
    )
})
