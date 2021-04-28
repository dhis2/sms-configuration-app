import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('no commands exist', () => {
    const fixture = 'commands/delete_command/no_commands'
    cy.intercept(/.*\/smsCommands[?]/, { method: 'GET', fixture })

    cy.fixture(fixture).then(response => {
        const { smsCommands } = response
        cy.wrap(smsCommands).as('commands')
    })
})

Given('some commands exist', () => {
    const fixture = 'commands/delete_command/some_commands'
    cy.intercept(/.*\/smsCommands[?]/, { method: 'GET', fixture })

    cy.fixture(fixture).then(response => {
        const { smsCommands } = response
        cy.wrap(smsCommands).as('commands')
    })
})

Given('the user can delete commands', () => {
    cy.get('@commands').then(commands => {
        commands.forEach(({ id }) => {
            const url = new RegExp(`.*/smsCommands/${id}$`)

            cy.intercept(url, {
                method: 'DELETE',
                body: {},
            }).as(`delete${id}XHR`)
        })
    })
})

Given("the user can't delete commands due to a request failure", () => {
    cy.get('@commands').then(commands => {
        commands.forEach(({ id }) => {
            const url = new RegExp(`.*/smsCommands/${id}$`)

            cy.intercept(url, {
                method: 'DELETE',
                statusCode: 503,
                body: { error: 'Internal server error' },
            }).as(`delete${id}XHR`)
        })
    })
})

Given('the user navigated to the sms commands list page', () => {
    cy.visitWhenStubbed('/')
    cy.get('{shared-navigationitem}:nth-child(3)').click()
})

Given('the user wants to delete the first command', () => {
    cy.visitWhenStubbed('/')
    cy.get('{shared-navigationitem}:nth-child(3)').click()
    cy.get('{views-smscommandlist-commandtable} tbody tr')
        .first()
        .find('label')
        .click()
    cy.get('{shared-listactions-delete}').click()
})

Given('the confirmation modal is visible', () => {
    cy.get('{shared-deleteconfirmationdialog}').should('exist')
})

Given('some commands have been selected', () => {
    cy.get('{views-smscommandlist-commandtable} tbody tr')
        .first()
        .find('label')
        .click()
})

Given('all commands have been selected', () => {
    cy.get(
        '{views-smscommandlist-commandtable} thead th:first-child label'
    ).click()
})

Given('no command has been selected', () => {
    cy.get('{views-smscommandlist-commandtable} tbody input').each(
        $checkbox => {
            expect($checkbox).not.to.be.checked
        }
    )
})

When('the user selects the first command', () => {
    cy.get('{views-smscommandlist-commandtable} tbody tr')
        .first()
        .find('label')
        .click()
})

When('the user cancels the deletion', () => {
    cy.get('{shared-deleteconfirmationdialog-cancel}').click()
})

When('the user confirms the deletion', () => {
    cy.get('{shared-deleteconfirmationdialog-confirm}').click()
})

When('clicks the delete button', () => {
    cy.get('{shared-listactions-delete}').click()
})

When('the user clicks the checkbox to select all', () => {
    cy.get(
        '{views-smscommandlist-commandtable} thead th:first-child label'
    ).click()
})

Then('a confirmation modal should pop up', () => {
    cy.get('{shared-deleteconfirmationdialog}').should('exist')
})

Then("a delete request with the first command's id should be sent", () => {
    cy.get('@commands').then(([firstCommand]) => {
        cy.wait(`@delete${firstCommand.id}XHR`)
            .its('response')
            .its('statusCode')
            .should('eql', 200)
    })
})

Then('the confirmation modal should close', () => {
    cy.get('{shared-deleteconfirmationdialog}').should('not.exist')
})

Then("all individual commands' checkboxes should be selected", () => {
    cy.get('{views-smscommandlist-commandtable} tbody input').each(
        $checkbox => {
            expect($checkbox).to.be.checked
        }
    )
})

Then("all individual commands' checkboxes should not be selected", () => {
    cy.get('{views-smscommandlist-commandtable} tbody input').each(
        $checkbox => {
            expect($checkbox).not.to.be.checked
        }
    )
})

Then('the delete button should be disabled', () => {
    cy.get('{shared-listactions-delete}').should('be.disabled')
})

Then('an alert with an error message should be displayed', () => {
    cy.get('[data-test="dhis2-uicore-noticebox"].error')
        .should('exist')
        .should(
            'contain',
            'An unknown error occurred - Service Unavailable (503)'
        )
})
