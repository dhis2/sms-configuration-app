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
        response: 'fixture:commands/add_cmd_program_stage_data_entry/programs',
    }).as('programsXhr')

    cy.route({
        url: /.*\/programStages/,
        method: 'GET',
        response:
            'fixture:commands/add_cmd_program_stage_data_entry/programStages',
    }).as('programStagesXhr')
})

Given(
    'the user is adding a new program stage data entry parser sms command',
    () => {
        cy.visitWhenStubbed('/')

        cy.get('{navigation-navigationitem}:nth-child(3)').click()
        cy.get('{views-smscommandlist-add}').click()
        cy.get('{forms-fieldcommandparser-content}').click()
        cy.get('[data-value="PROGRAM_STAGE_DATAENTRY_PARSER"]').click()

        cy.get(
            '{forms-fieldcommandparser} [data-test="dhis2-uicore-select-input"]'
        )
            .invoke('text')
            .should('equal', 'Program stage data entry parser')
    }
)

Given("the user hasn't chosen a program", () => {
    cy.get('{forms-fieldprogram} {forms-fieldprogram-content}')
        .invoke('text')
        .should('equal', '')
})

When('the user enters the name', () => {
    cy.get('{commands-fieldcommandname} input').type('User name')
})

When('the user chooses a program', () => {
    cy.fixture('commands/add_cmd_program_stage_data_entry/programs').then(
        ({ programs }) => {
            const program = programs[0]
            cy.wrap(program).as('selectedProgram')

            cy.get('{forms-fieldprogram}').click()
            cy.get(`[data-value="${program.id}"]`).click()
        }
    )
})

When('the user chooses a program stage', () => {
    cy.fixture('commands/add_cmd_program_stage_data_entry/programStages').then(
        ({ programStages }) => {
            const programStage = programStages[0]
            cy.wrap(programStage).as('selectedProgramStage')

            cy.get('{forms-fieldprogramstage}').click()
            cy.get(`[data-value="${programStage.id}"]`).click()
        }
    )
})

When('the user submits the form', () => {
    cy.get('{app} [type="submit"]').click()
})

When('the user leaves the name empty', () => {
    cy.get('{commands-fieldcommandname} input').should('have.value', '')
})

When('the user leaves the program field empty', () => {
    cy.get('{forms-fieldprogram} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
})

When('the user leaves the program stage field empty', () => {
    cy.get('{forms-fieldprogramstage} [data-test="dhis2-uicore-select-input"]')
        .invoke('text')
        .should('equal', '')
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

Then('display an error message on the program field', () => {
    cy.get('{forms-fieldprogram-validation}').should('exist')
})

Then('display an error message on the program stage field', () => {
    cy.get('{forms-fieldprogramstage-validation}').should('exist')
})

Then('the program stage field should be disabled', () => {
    cy.get('{forms-fieldprogramstage} > .disabled').should('exist')
})

Then('the program stage field should be enabled', () => {
    cy.get('{forms-fieldprogramstage} > .disabled').should('not.exist')
})

Then(
    'the program stage field should contain program stages related to the program',
    () => {
        cy.all(
            () => cy.get('@selectedProgram'),
            () => cy.wait('@programStagesXhr')
        ).then(([selectedProgram, programStagesXhr]) => {
            expect(programStagesXhr.url).to.match(
                new RegExp(`program.id:eq:${selectedProgram.id}`)
            )

            const attributedProgramStages =
                programStagesXhr.response.body.programStages

            cy.get('{forms-fieldprogramstage-content}').click()

            attributedProgramStages.forEach(programStage => {
                cy.get(`[data-value="${programStage.id}"]`).should('exist')
            })
        })
    }
)
