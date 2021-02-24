import { Before, Given } from 'cypress-cucumber-preprocessor/steps'

export const apiRouteOptions = {
    method: 'GET',
    url: '**/sms/outbound**',
}

Before(() => {
    cy.server()
})

Given('there are no sent messages', () => {
    cy.route({
        ...apiRouteOptions,
        response: 'fixture:sent/noSent',
    })
})

Given('some sent messages exist', () => {
    cy.route({
        ...apiRouteOptions,
        response: 'fixture:sent/sent',
    })
})

Given('the user navigated to the sent messages page', () => {
    cy.visit('/')
    cy.getWithDataTest('{navigation-navigationitem}:nth-child(4)').click()
})
