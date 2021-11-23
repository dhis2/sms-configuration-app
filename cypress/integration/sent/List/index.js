import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { translations } from '../../../../src/sms-outbound/translations/index.js'

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
    cy.getWithDataTest('{shared-navigationitem}:nth-child(4)').click()
})

Then('the user should be notified that there are no messages', () => {
    cy.get('[data-test="dhis2-uicore-tablecell"]').should(
        'contain',
        'No SMSes to display'
    )
})

Then('the sent messages are rendered as tabular data', () => {
    cy.get('[data-test="dhis2-uicore-table"]').should('be.visible')
})

Then('each row displays the message contents and metadata', () => {
    cy.fixture('sent/sent').then(({ outboundsmss }) => {
        outboundsmss.forEach(({ message, recipients, status }, index) => {
            cy.get(`[data-test="dhis2-uicore-tablerow"]:eq(${index})`).should(
                ($elem) => {
                    expect($elem.text()).to.contain(message)
                    expect($elem.text()).to.contain(recipients.join(', '))
                    expect($elem.text()).to.contain(translations[status])
                }
            )
        })
    })
})
