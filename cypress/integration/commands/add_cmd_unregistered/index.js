import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()

    cy.route({
        url: /.*\/smsCommands/,
        method: 'POST',
        response: {
            commands: [],
        },
    }).as('createSmsCommandXhr')

    cy.route({
        url: /.*\/userGroups/,
        method: 'GET',
        response: 'fixture:commands/add_cmd_unregistered/userGroups',
    })
})

Given('the user is adding a new unregistered parser sms command', () => {
    cy.visitWhenStubbed('/')

    cy.get('{shared-navigationitem}:nth-child(3)').click()
    cy.get('{views-smscommandlist-add}').click()
    cy.get('{smscommand-fieldparser-content}').click()
    cy.get('[data-value="UNREGISTERED_PARSER"]').click()

    cy.get('{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', 'Unregistered parser')
})

When('the user enters the name', () => {
    cy.get('{smscommand-fieldcommandname} input').type('User name')
})

When('the user leaves the name empty', () => {
    cy.get('{smscommand-fieldcommandname} input').should('have.value', '')
})

When('the user chooses a user group', () => {
    cy.fixture('commands/add_cmd_unregistered/userGroups').then(
        ({ userGroups }) => {
            cy.get('{shared-fieldusergroup}').click()
            cy.get(`[data-value="${userGroups[0].id}"]`).click()
        }
    )
})

When('the user leaves the user group field empty', () => {
    cy.get('{shared-fieldusergroup} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
})

When('the user submits the form', () => {
    cy.get('{shared-layoutcontainer} [type="submit"]').click()
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr').then(xhr => {
        expect(xhr.status).to.equal(200)
    })
})

Then('the form should not submit', () => {
    cy.get('{smscommand-viewsmscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.get('{smscommand-fieldcommandname-validation}').should('exist')
})

Then('display an error message on the user group field', () => {
    cy.get('{shared-fieldusergroup-validation}').should('exist')
})
