import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept('GET', /.*\/smsCommands/, {
        body: { commands: [] },
    }).as('createSmsCommandXhr')

    cy.intercept('GET', /.*\/dataSets/, {
        fixture: 'commands/add_cmd_j2me/dataSets',
    })
})

Given('the user is adding a new j2me parser sms command', () => {
    cy.visit('/')

    cy.getWithDataTest('{shared-navigationitem}:nth-child(3)').click()
    cy.getWithDataTest('{shared-listactions-add}').click()
    cy.getWithDataTest('{smscommand-fieldparser-content}').click()
    cy.get('[data-value="J2ME_PARSER"]').click()

    cy.getWithDataTest(
        '{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]'
    )
        .invoke('text')
        .should('equal', 'J2ME parser')
})

When('the user enters the name', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').type('User name')
})

When('the user leaves the name empty', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').should(
        'have.value',
        ''
    )
})

When('the user chooses a data set', () => {
    cy.fixture('commands/add_cmd_j2me/dataSets').then(({ dataSets }) => {
        cy.getWithDataTest('{smscommand-fielddataset}').click()
        cy.get(`[data-value="${dataSets[0].id}"]`).click()
    })
})

When('the user leaves the data set field empty', () => {
    cy.getWithDataTest(
        '{smscommand-fielddataset} [data-test="dhis2-uicore-select-input"]'
    )
        .invoke('text')
        .should('equal', '')
})

When('the user submits the form', () => {
    cy.getWithDataTest('{shared-layoutcontainer} [type="submit"]').click()
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr')
        .its('response')
        .its('statusCode')
        .should('eql', 200)
})

Then('the form should not submit', () => {
    cy.getWithDataTest('{smscommand-viewsmscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname-validation}').should(
        'exist'
    )
})

Then('display an error message on the data set field', () => {
    cy.getWithDataTest('{smscommand-fielddataset-validation}').should('exist')
})
