import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { translations } from '../../../../src/sms-inbound/translations'

const endpointUrl = /[/]sms[/]inbound([?]|$)/

Given('there are no received messages', () => {
    cy.intercept('GET', endpointUrl, { fixture: 'received/noReceived' })
})

Given('some received messages exist', () => {
    cy.intercept('GET', endpointUrl, { fixture: 'received/received' })
})

Given('the user navigated to the received messages page', () => {
    cy.visit('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(5)').click()
})

Then('the user should be notified that there are no messages', () => {
    cy.get('[data-test="dhis2-uicore-tablecell"]').should(
        'contain',
        'No SMSes to display'
    )
})

Then('the received messages are rendered as tabular data', () => {
    cy.get('[data-test="dhis2-uicore-table"]').should('be.visible')
})

Then('each row displays the message contents and metadata', () => {
    cy.fixture('received/received').then(({ inboundsmss }) => {
        inboundsmss.forEach(({ text, originator, smsstatus }, index) => {
            cy.get(`[data-test="dhis2-uicore-tablerow"]:eq(${index})`).should(
                ($elem) => {
                    expect($elem.text()).to.contain(text)
                    expect($elem.text()).to.contain(originator)
                    expect($elem.text()).to.contain(translations[smsstatus])
                }
            )
        })
    })
})
