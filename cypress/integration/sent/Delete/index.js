import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const endpointUrl = /[/]sms[/]outbound([?]|$)/

Before(() => {
    const body = {}
    const alias = 'sentMessageDeleted'
    cy.intercept('DELETE', endpointUrl, { body }).as(alias)
})

Given('there are no sent messages', () => {
    const fixture = 'sent/noSent'
    cy.fixture(fixture).its('outboundsmss').as('sentSms')
    cy.intercept('GET', endpointUrl, { fixture })
})

Given('some sent messages exist', () => {
    const fixture = 'sent/sent'
    cy.fixture(fixture).its('outboundsmss').as('sentSms')
    cy.intercept('GET', endpointUrl, { fixture })
})

Given('the user navigated to the sent messages page', () => {
    cy.visit('/')
    cy.get('{shared-navigationitem}:nth-child(4)').click()
})

Then("the 'delete selected' button should be disabled", () => {
    cy.get('button.destructive').should('be.disabled')
})

Then("the 'delete selected' button should be enabled", () => {
    cy.get('button.destructive').should('be.enabled')
})

Then('the user should be asked to confirm his choice', () => {
    cy.get('{shared-deleteconfirmationdialog}').should('exist')
})

When('the user selects a message', () => {
    cy.get('@sentSms').its(0).as('selectedMessage')
    cy.get('tbody [data-test="dhis2-uicore-checkbox"]:eq(0)').click()
})

When('the user selects all messages', () => {
    cy.get('thead [data-test="dhis2-uicore-checkbox"]').click()
})

When("the user clicks on the 'delete selected' button", () => {
    cy.get('button.destructive').click()
})

When('the user confirms the deletion', () => {
    cy.get('{shared-deleteconfirmationdialog-confirm}').click()
})

Then('the message should be deleted', () => {
    cy.all(
        () => cy.wait('@sentMessageDeleted'),
        () => cy.get('@selectedMessage')
    ).then(([deletion, selectedMessage]) => {
        expect(deletion.response.statusCode).to.equal(200)
        expect(deletion.request.url).to.match(
            new RegExp(`sms[/]outbound[?]ids=${selectedMessage.id}`)
        )
    })
})

Then('all the messages should be deleted', () => {
    cy.all(
        () => cy.wait('@sentMessageDeleted'),
        () => cy.get('@sentSms')
    ).then(([deletion, sentSms]) => {
        expect(deletion.response.statusCode).to.equal(200)

        const allIds = sentSms.map(({ id }) => id).join(',')
        expect(deletion.request.url).to.match(
            new RegExp(`sms[/]outbound[?]ids=${allIds}`)
        )
    })
})
