import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept(/.*\/smsCommands/, {
        method: 'POST',
        body: { commands: [] },
    }).as('createSmsCommandXhr')

    cy.intercept(/.*\/dataSets/, {
        method: 'GET',
        fixture: 'commands/add_cmd_key_value/dataSets',
    })
})

Given('the user is adding a new key value parser sms command', () => {
    cy.visitWhenStubbed('/')

    cy.get('{shared-navigationitem}:nth-child(3)').click()
    cy.get('{shared-listactions-add}').click()
    cy.get('{smscommand-fieldparser-content}').click()
    cy.get('[data-value="KEY_VALUE_PARSER"]').click()

    cy.get('{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', 'Key value parser')
})

When('the user enters the name', () => {
    cy.get('{smscommand-fieldcommandname} input').type('User name')
})

When('the user leaves the name empty', () => {
    cy.get('{smscommand-fieldcommandname} input').should('have.value', '')
})

When('the user chooses a data set', () => {
    cy.fixture('commands/add_cmd_j2me/dataSets').then(({ dataSets }) => {
        cy.get('{smscommand-fielddataset}').click()
        cy.get(`[data-value="${dataSets[0].id}"]`).click()
    })
})

When('the user leaves the data set field empty', () => {
    cy.get('{smscommand-fielddataset} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
})

When('the user submits the form', () => {
    cy.get('{shared-layoutcontainer} [type="submit"]').click()
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr')
        .its('response')
        .its('statusCode')
        .should('eql', 200)
})

Then('the form should not submit', () => {
    cy.get('{smscommand-viewsmscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.get('{smscommand-fieldcommandname-validation}').should('exist')
})

Then('display an error message on the data set field', () => {
    cy.get('{smscommand-fielddataset-validation}').should('exist')
})
