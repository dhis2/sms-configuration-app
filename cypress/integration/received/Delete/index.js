import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const endpointUrl = /[/]sms[/]inbound([?]|$)/

Before(() => {
    const body = {}
    const alias = 'receivedMessageDeleted'
    cy.intercept('DELETE', endpointUrl, { body }).as(alias)
})

Given('there are no received messages', () => {
    const fixture = 'received/noReceived'
    cy.fixture(fixture).its('inboundsmss').as('receivedSms')
    cy.intercept('GET', endpointUrl, { fixture })
})

Given('some received messages exist', () => {
    const fixture = 'received/received'
    cy.fixture(fixture).its('inboundsmss').as('receivedSms')
    cy.intercept('GET', endpointUrl, { fixture })
})

Given('the user navigated to the received messages page', () => {
    cy.visit('/')
    cy.get('{shared-navigationitem}:nth-child(5)').click()
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
    cy.get('@receivedSms').its(0).as('selectedMessage')
    cy.get('tbody tr:first-child [data-test="dhis2-uicore-checkbox"]')
        .click()
        .find('input')
        .should('be.checked')
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
        () => cy.wait('@receivedMessageDeleted'),
        () => cy.get('@selectedMessage')
    ).then(([deletion, selectedMessage]) => {
        expect(deletion.response.statusCode).to.equal(200)
        expect(deletion.request.url).to.match(
            new RegExp(`sms[/]inbound[?]ids=${selectedMessage.id}`)
        )
    })
})

Then('all the messages should be deleted', () => {
    cy.all(
        () => cy.wait('@receivedMessageDeleted'),
        () => cy.get('@receivedSms')
    ).then(([deletion, receivedSms]) => {
        expect(deletion.response.statusCode).to.equal(200)

        const allIds = receivedSms.map(({ id }) => id).join(',')
        expect(deletion.request.url).to.match(
            new RegExp(`sms[/]inbound[?]ids=${allIds}`)
        )
    })
})
