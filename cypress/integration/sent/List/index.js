import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { statusMap } from '../../../../src/views/sent_sms_list/translations'

const apiRouteMatcher = {
    method: 'GET',
    path: /sms\/outbound/,
}

Given('there are no sent messages', () => {
    cy.intercept(apiRouteMatcher, { fixture: 'sent/noSent' })
})

Given('some sent messages exist', () => {
    cy.intercept(apiRouteMatcher, { fixture: 'sent/sent' })
})

Given('the user navigated to the sent messages page', () => {
    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(4)').click()
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
        outboundsmss.forEach(({ message, recipients, status }) => {
            cy.get('[data-test="dhis2-uicore-tablerow"]').should($elem => {
                expect($elem.text()).to.contain(message)
                expect($elem.text()).to.contain(recipients.join(', '))
                expect($elem.text()).to.contain(statusMap[status])
            })
        })
    })
})
