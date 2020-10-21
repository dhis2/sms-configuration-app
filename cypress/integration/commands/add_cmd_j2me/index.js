import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const dataSets = [
    {
        id: 'lyLU2wR22tC',
        displayName: 'ART monthly summary',
    },
    {
        id: 'BfMAe6Itzgt',
        displayName: 'Child Health',
    },
    {
        id: 'VTdjfLXXmoi',
        displayName: 'Clinical Monitoring Checklist ',
    },
    {
        id: 'Lpw6GcnTrmS',
        displayName: 'Emergency Response',
    },
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
        url: /.*\/datasets/,
        method: 'GET',
        response: { dataSets },
    })
})

Given('the user is adding a new j2me parser sms command', () => {
    cy.visitWhenStubbed('/')

    cy.get('{navigation-navigationitem}:nth-child(3)').click()
    cy.get('{views-smscommandlist-add}').click()
    cy.get('{forms-fieldcommandparser-content}').click()
    cy.get('[data-value="J2ME_PARSER"]').click()

    cy.get('{forms-fieldcommandparser} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', 'J2ME parser')
})

When('the user enters the name', () => {
    cy.get('{commands-fieldcommandname} input').type('User name')
})

When('the user leaves the name empty', () => {
    cy.get('{commands-fieldcommandname} input').should('have.value', '')
})

When('the user chooses a data set', () => {
    cy.get('{forms-fielddataset}').click()
    cy.get(`[data-value="${dataSets[0].id}"]`).click()
})

When('the user leaves the data set field empty', () => {
    cy.get('{forms-fielddataset} [data-test="dhis2-uicore-select-input"]')
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

Then('display an error message on the data set field', () => {
    cy.get('{forms-fielddataset-validation}').should('exist')
})
