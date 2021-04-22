import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

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
        url: /.*\/programs/,
        method: 'GET',
        response:
            'fixture:commands/add_cmd_tracked_entity_registration/programs',
    }).as('programsXhr')

    cy.route({
        url: /.*\/programStages/,
        method: 'GET',
        response:
            'fixture:commands/add_cmd_tracked_entity_registration/programStages',
    }).as('programStagesXhr')
})

Given(
    'the user is adding a new tracked entity registration parser sms command',
    () => {
        cy.visitWhenStubbed('/')

        cy.get('{navigation-navigationitem}:nth-child(3)').click()
        cy.get('{views-smscommandlist-add}').click()
        cy.get('{smscommand-fieldparser-content}').click()
        cy.get('[data-value="TRACKED_ENTITY_REGISTRATION_PARSER"]').click()

        cy.get(
            '{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]'
        )
            .invoke('text')
            .should('equal', 'Tracked entity registration parser')
    }
)

When('the user enters the name', () => {
    cy.get('{smscommand-fieldcommandname} input').type('User name')
})

When('the user chooses a program', () => {
    cy.fixture('commands/add_cmd_tracked_entity_registration/programs').then(
        ({ programs }) => {
            const program = programs[0]
            cy.wrap(program).as('selectedProgram')

            cy.get('{smscommand-fieldprogram}').click()
            cy.get(`[data-value="${program.id}"]`).click()
        }
    )
})

When('the user submits the form', () => {
    cy.get('{app} [type="submit"]').click()
})

When('the user leaves the name empty', () => {
    cy.get('{smscommand-fieldcommandname} input').should('have.value', '')
})

When('the user leaves the program field empty', () => {
    cy.get('{smscommand-fieldprogram} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr').then(xhr => {
        expect(xhr.status).to.equal(200)
    })
})

Then('the form should not submit', () => {
    cy.get('{smscommand-viewsmscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.get('{smscommand-fieldcommandname-validation}').should('exist')
})

Then('display an error message on the program field', () => {
    cy.get('{smscommand-fieldprogram-validation}').should('exist')
})
