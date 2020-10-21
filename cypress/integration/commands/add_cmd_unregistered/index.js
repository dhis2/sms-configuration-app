import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const userGroups = [
    { id: 'wl5cDMuUhmF', displayName: 'Administrators' },
    { id: 'vAvEltyXGbD', displayName: 'Africare HQ' },
    { id: 'ZoHNWQajIoe', displayName: 'Bo District M&E officers' },
    { id: 'th4S6ovwcr8', displayName: 'Bonthe District M&E Officers' },
]

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
        response: { userGroups },
    })
})

Given('the user is adding a new unregistered parser sms command', () => {
    cy.visitWhenStubbed('/')

    cy.get('{navigation-navigationitem}:nth-child(3)').click()
    cy.get('{views-smscommandlist-add}').click()
    cy.get('{forms-fieldcommandparser-content}').click()
    cy.get('[data-value="UNREGISTERED_PARSER"]').click()

    cy.get('{forms-fieldcommandparser} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', 'Unregistered parser')
})

When('the user enters the name', () => {
    cy.get('{commands-fieldcommandname} input').type('User name')
})

When('the user leaves the name empty', () => {
    cy.get('{commands-fieldcommandname} input').should('have.value', '')
})

When('the user chooses a user group', () => {
    cy.get('{forms-fieldusergroup}').click()
    cy.get(`[data-value="${userGroups[0].id}"]`).click()
})

When('the user leaves the user group field empty', () => {
    cy.get('{forms-fieldusergroup} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
})

When('the user submits the form', () => {
    cy.get('{app} [type="submit"]').click()
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr').then(xhr => {
        expect(xhr.status).to.equal(200)
    })
})

Then('the form should not submit', () => {
    cy.get('{views-smscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.get('{commands-fieldcommandname-validation}').should('exist')
})

Then('display an error message on the user group field', () => {
    cy.get('{forms-fieldusergroup-validation}').should('exist')
})
