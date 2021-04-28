import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

Given('there are no commands', () => {
    cy.intercept(/\/smsCommands[?]/, {
        method: 'GET',
        fixture: 'commands/list_commands/no_commands',
    })
})

Given('some commands exist', () => {
    cy.intercept(/\/smsCommands[?]/, {
        method: 'GET',
        fixture: 'commands/list_commands/some_commands',
    })
})

Given('the user navigated to the sms commands list page', () => {
    cy.visitWhenStubbed('/')
    cy.get('{shared-navigationitem}:nth-child(3)').click()
    cy.get('h1:contains("Commands")').should('exist')
})

Then('no table should be displayed', () => {
    cy.get('{views-smscommandlist-commandtable} tbody tr').as('row')
    cy.get('@row').should('have.length', 1)
    cy.get('@row').should('contain', 'No commands to display')
})

Then('the commands are rendered as tabular data', () => {
    cy.get('{views-smscommandlist-commandtable}').should('exist')
})

Then("each row displays the commands's data", () => {
    cy.fixture('commands/list_commands/some_commands').then(
        ({ smsCommands }) => {
            smsCommands.forEach((smsCommand, index) => {
                cy.get(
                    `{views-smscommandlist-commandtable} tbody tr:nth-child(${
                        index + 1
                    })`
                ).as('row')

                cy.get('@row')
                    .find('td:nth-child(2)')
                    .should('contain', smsCommand.displayName)

                cy.get('@row')
                    .find('td:nth-child(3)')
                    .invoke('text')
                    .then(text => {
                        if (smsCommand.parserType === 'ALERT_PARSER') {
                            expect(text).to.equal('Alert parser')
                        } else if (smsCommand.parserType === 'J2ME_PARSER') {
                            expect(text).to.equal('J2ME parser')
                        } else if (
                            smsCommand.parserType === 'KEY_VALUE_PARSER'
                        ) {
                            expect(text).to.equal('Key value parser')
                        } else if (
                            smsCommand.parserType === 'UNREGISTERED_PARSER'
                        ) {
                            expect(text).to.equal('Unregistered parser')
                        } else if (
                            smsCommand.parserType ===
                            'TRACKED_ENTITY_REGISTRATION_PARSER'
                        ) {
                            expect(text).to.equal(
                                'Tracked entity registration parser'
                            )
                        } else if (
                            smsCommand.parserType ===
                            'PROGRAM_STAGE_DATAENTRY_PARSER'
                        ) {
                            expect(text).to.equal(
                                'Program stage data entry parser'
                            )
                        } else if (
                            smsCommand.parserType ===
                            'EVENT_REGISTRATION_PARSER'
                        ) {
                            expect(text).to.equal('Event registration parser')
                        } else {
                            throw new Error(
                                `invalid parser type: "${smsCommand.parserType}"`
                            )
                        }
                    })
            })
        }
    )
})
