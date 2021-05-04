import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept('GET', /.*\/smsCommands/, {
        body: { commands: [] },
    }).as('createSmsCommandXhr')

    cy.intercept('GET', /.*\/userGroups/, {
        fixture: 'commands/add_cmd_alert/userGroups',
    })
})

Given('the user is adding a new alert parser sms command', () => {
    cy.visitWhenStubbed('/')

    cy.getWithDataTest('{shared-navigationitem}:nth-child(3)').click()
    cy.getWithDataTest('{shared-listactions-add}').click()
    cy.getWithDataTest('{smscommand-fieldparser-content}').click()
    cy.get('[data-value="ALERT_PARSER"]').click()

    cy.getWithDataTest(
        '{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]'
    )
        .invoke('text')
        .should('equal', 'Alert parser')
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

When('the user chooses a user group', () => {
    cy.fixture('commands/add_cmd_alert/userGroups').then(({ userGroups }) => {
        cy.getWithDataTest('{shared-fieldusergroup}').click()
        cy.get(`[data-value="${userGroups[0].id}"]`).click()
    })
})

When('the user leaves the user group field empty', () => {
    cy.getWithDataTest(
        '{shared-fieldusergroup} [data-test="dhis2-uicore-select-input"]'
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

Then('display an error message on the user group field', () => {
    cy.getWithDataTest('{shared-fieldusergroup-validation}').should('exist')
})
