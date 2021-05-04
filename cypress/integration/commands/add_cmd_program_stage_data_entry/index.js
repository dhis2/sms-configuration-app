import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.intercept('GET', /.*\/smsCommands/, {
        body: { commands: [] },
    }).as('createSmsCommandXhr')

    cy.intercept('GET', /.*\/programs/, {
        fixture: 'commands/add_cmd_program_stage_data_entry/programs',
    }).as('programsXhr')

    cy.intercept('GET', /.*\/programStages/, {
        fixture: 'commands/add_cmd_program_stage_data_entry/programStages',
    }).as('programStagesXhr')
})

Given(
    'the user is adding a new program stage data entry parser sms command',
    () => {
        cy.visitWhenStubbed('/')

        cy.getWithDataTest('{shared-navigationitem}:nth-child(3)').click()
        cy.getWithDataTest('{shared-listactions-add}').click()
        cy.getWithDataTest('{smscommand-fieldparser-content}').click()
        cy.get('[data-value="PROGRAM_STAGE_DATAENTRY_PARSER"]').click()

        cy.getWithDataTest(
            '{smscommand-fieldparser} [data-test="dhis2-uicore-select-input"]'
        )
            .invoke('text')
            .should('equal', 'Program stage data entry parser')
    }
)

Given("the user hasn't chosen a program", () => {
    cy.getWithDataTest(
        '{smscommand-fieldprogram} {smscommand-fieldprogram-content}'
    )
        .invoke('text')
        .should('equal', '')
})

When('the user enters the name', () => {
    cy.getWithDataTest('{smscommand-fieldcommandname} input').type('User name')
})

When('the user chooses a program', () => {
    cy.fixture('commands/add_cmd_program_stage_data_entry/programs').then(
        ({ programs }) => {
            const program = programs[0]
            cy.wrap(program).as('selectedProgram')

            cy.getWithDataTest('{smscommand-fieldprogram}').click()
            cy.get(`[data-value="${program.id}"]`).click()
        }
    )
})

When('the user chooses a program stage', () => {
    cy.fixture('commands/add_cmd_program_stage_data_entry/programStages').then(
        ({ programStages }) => {
            const programStage = programStages[0]
            cy.wrap(programStage).as('selectedProgramStage')

            cy.getWithDataTest('{smscommand-fieldprogramstage}').click()
            cy.get(`[data-value="${programStage.id}"]`).click()
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

When('the user leaves the program stage field empty', () => {
    cy.getWithDataTest(
        '{smscommand-fieldprogramstage} [data-test="dhis2-uicore-select-input"]'
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

Then('display an error message on the program stage field', () => {
    cy.getWithDataTest('{smscommand-fieldprogramstage-validation}').should(
        'exist'
    )
})

Then('the program stage field should be disabled', () => {
    cy.getWithDataTest('{smscommand-fieldprogramstage} > .disabled').should(
        'exist'
    )
})

Then('the program stage field should be enabled', () => {
    cy.getWithDataTest('{smscommand-fieldprogramstage} > .disabled').should(
        'not.exist'
    )
})

Then(
    'the program stage field should contain program stages related to the program',
    () => {
        cy.all(
            () => cy.get('@selectedProgram'),
            () => cy.wait('@programStagesXhr')
        ).then(([selectedProgram, programStagesXhr]) => {
            expect(decodeURIComponent(programStagesXhr.request.url)).to.match(
                new RegExp(`program.id:eq:${selectedProgram.id}`)
            )

            const attributedProgramStages =
                programStagesXhr.response.body.programStages

            cy.getWithDataTest('{smscommand-fieldprogramstage-content}').click()

            attributedProgramStages.forEach(programStage => {
                cy.get(`[data-value="${programStage.id}"]`).should('exist')
            })
        })
    }
)
