import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept('GET', /.*\/smsCommands/, {
        body: { commands: [] },
    }).as('createSmsCommandXhr')

    cy.intercept('GET', /.*\/programs/, {
        fixture: 'commands/add_cmd_tracked_entity_registration/programs',
    }).as('programsXhr')

    cy.intercept('GET', /.*\/programStages/, {
        fixture: 'commands/add_cmd_tracked_entity_registration/programStages',
    }).as('programStagesXhr')
})

Given(
    'the user is adding a new tracked entity registration parser sms command',
    () => {
        cy.visitWhenStubbed('/')

        cy.getWithDataTest('{shared-navigationitem}:nth-child(3)').click()
        cy.getWithDataTest('{shared-listactions-add}').click()
        cy.getWithDataTest('{smscommand-fieldparser-content}').click()
        cy.get('[data-value="TRACKED_ENTITY_REGISTRATION_PARSER"]').click()

        cy.getWithDataTest(
            '{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]'
        )
            .invoke('text')
            .should('equal', 'Tracked entity registration parser')
    }
)

When('the user enters the name', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').type('User name')
})

When('the user chooses a program', () => {
    cy.fixture('commands/add_cmd_tracked_entity_registration/programs').then(
        ({ programs }) => {
            const program = programs[0]
            cy.wrap(program).as('selectedProgram')

            cy.getWithDataTest('{smscommand-fieldprogram}').click()
            cy.get(`[data-value="${program.id}"]`).click()
        }
    )
})

When('the user submits the form', () => {
    cy.getWithDataTest('{shared-layoutcontainer} [type="submit"]').click()
})

When('the user leaves the name empty', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').should(
        'have.value',
        ''
    )
})

When('the user leaves the program field empty', () => {
    cy.getWithDataTest(
        '{smscommand-fieldprogram} [data-test="dhis2-uicore-select-input"]'
    )
        .invoke('text')
        .should('equal', '')
})

Then('the data should be sent successfully', () => {
    cy.wait('@createSmsCommandXhr')
        .its('response')
        .its('statusCode')
        .should('eql', 200)
})

Then('the form should not submit', () => {
    cy.getWithDataTest('{smscommand-viewsmscommandlist}').should('not.exist')
})

Then('display an error message on the name field', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname-validation}').should(
        'exist'
    )
})

Then('display an error message on the program field', () => {
    cy.getWithDataTest('{smscommand-fieldprogram-validation}').should('exist')
})
