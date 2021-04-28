import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import queryString from 'query-string'

const endpointUrl = /[/]sms[/]outbound([?]|$)/

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

When("the user clicks on the status filter and selects 'Failed'", () => {
    cy.get(
        '{smsoutbound-statusfilter} [data-test="dhis2-uicore-select-input"]'
    ).click()
    cy.get('[data-value="FAILED"]').click()
})

Then("only messages with the status of 'Failed' will be shown", () => {
    const query = queryString.stringify({
        status: 'FAILED',
        page: 1,
    })
    cy.hash().should('eq', `#/sent?${query}`)
})
