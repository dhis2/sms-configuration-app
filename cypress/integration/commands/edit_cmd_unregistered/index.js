import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()

    cy.fixture('commands/edit_cmd_unregistered/commandsForListView').then(
        response => {
            const commandId = response.smsCommands[0].id

            cy.route({
                url: /\/smsCommands\?paging=false&fields=\*/,
                method: 'GET',
                response: response,
            })

            cy.route({
                url: new RegExp(`${commandId}[?].*=parserType&`),
                method: 'GET',
                response:
                    'fixture:commands/edit_cmd_unregistered/commandParserType',
            })

            cy.route({
                url: new RegExp(`${commandId}?.*userGroup`),
                method: 'GET',
                response:
                    'fixture:commands/edit_cmd_unregistered/commandDetails',
            })

            cy.route({
                url: new RegExp(`smsCommands/${commandId}`),
                method: 'PATCH',
                response: {},
            }).as('updateSmsCommandXhr')
        }
    )
})

Given('the user is editing an unregistered parser command', () => {
    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(3)').click()
    // There's only one command in the mocked api response
    cy.get('{views-smscommandlist-commandtable} button').click()
})

When('the user changes the name field', () => {
    const newNameValue = 'New name'

    cy.wrap({
        name: newNameValue,
    }).as('newValues')

    cy.get('{commands-fieldcommandname} input')
        .clear()
        .type(newNameValue)
})

When('the user changes the confirmMessage field', () => {
    const newConfirmMessageValue = 'New confirm message'

    cy.wrap({
        receivedMessage: newConfirmMessageValue,
    }).as('newValues')

    cy.get('{commands-fieldcommandconfirmmessage} textarea')
        .clear()
        .type(newConfirmMessageValue)
})

When('the user changes the name field to an invalid value', () => {
    cy.get('{commands-fieldcommandname} input').clear()
})

When('the user submits the form', () => {
    cy.get('{views-smscommandformedit} button[type="submit"]').click()
})

Then('the complete command should be sent to the endpoint', () => {
    cy.all(
        () => cy.wait('@updateSmsCommandXhr'),
        () => cy.fixture('commands/edit_cmd_unregistered/commandDetails')
    ).then(([xhr, command]) => {
        const payload = xhr.request.body
        const payloadKeys = Object.keys(payload)
        const commandKeys = Object.keys(command)

        cy.wrap(payload).as('updateRequestPayload')

        expect(payloadKeys.length).to.equal(commandKeys.length)

        commandKeys.forEach(commandKey => {
            expect(payloadKeys).to.include(commandKey)
        })
    })
})

Then(
    'the value of the changed name field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@updateRequestPayload'),
            () => cy.get('@newValues')
        ).then(([updateRequestPayload, newValues]) => {
            expect(updateRequestPayload.name).to.equal(newValues.name)
        })
    }
)

Then(
    'the value of the changed confirmMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@updateRequestPayload'),
            () => cy.get('@newValues')
        ).then(([updateRequestPayload, newValues]) => {
            expect(updateRequestPayload.receivedMessage).to.equal(
                newValues.receivedMessage
            )
        })
    }
)

Then('the form should not submit successfully', () => {
    cy.get('{views-smscommandlist}').should('not.exist')
})
