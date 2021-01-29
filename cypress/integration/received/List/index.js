import { Given, Then } from 'cypress-cucumber-preprocessor/steps'
import { statusMap } from '../../../../src/views/received_sms_list/translations'

const apiRouteMatcher = {
    method: 'GET',
    path: /sms\/inbound/,
}

Given('there are no received messages', () => {
    cy.intercept(apiRouteMatcher, { fixture: 'received/noReceived' })
})

Given('some received messages exist', () => {
    cy.intercept(apiRouteMatcher, { fixture: 'received/received' })
})

Given('the user navigated to the received messages page', () => {
    cy.visit('/')
    cy.get('{navigation-navigationitem}:nth-child(4)').click()
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
    cy.fixture('received/received').then(({ outboundsmss }) => {
        outboundsmss.forEach(({ message, recipients, status }) => {
            cy.get('[data-test="dhis2-uicore-tablerow"]').should($elem => {
                expect($elem.text()).to.contain(message)
                expect($elem.text()).to.contain(recipients.join(', '))
                expect($elem.text()).to.contain(statusMap[status])
            })
        })
    })
})
