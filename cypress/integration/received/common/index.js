import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

export const apiRouteOptions = {
    method: 'GET',
    url: '**/sms/inbound**',
}

Before(() => {
    cy.server()
})

Given('there are no received messages', () => {
    cy.route({
        ...apiRouteOptions,
        response: 'fixture:received/noReceived',
    })
})

Given('some received messages exist', () => {
    cy.route({
        ...apiRouteOptions,
        response: 'fixture:received/received',
    })
})

Given('the user navigated to the received messages page', () => {
    cy.visit('/')
    cy.get('{shared-navigationitem}:nth-child(5)').click()
})
