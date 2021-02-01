import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import '../common'

When("the user clicks on the status filter and selects 'Failed'", () => {
    cy.get('[data-test="dhis2-uicore-select-input"]:eq(0)').click()
    cy.get('[data-value="FAILED"]').click()
})

Then("only messages with the status of 'Failed' will be shown", () => {
    cy.hash().should('eq', '#/sent?status=FAILED&pageSize=50&page=1')
})
