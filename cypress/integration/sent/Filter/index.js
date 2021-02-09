import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import queryString from 'query-string'
import '../common'

When("the user clicks on the status filter and selects 'Failed'", () => {
    cy.get(
        '[data-test="status-filter"] [data-test="dhis2-uicore-select-input"]'
    ).click()
    cy.get('[data-value="FAILED"]').click()
})

Then("only messages with the status of 'Failed' will be shown", () => {
    const query = queryString.stringify({
        status: 'FAILED',
        page: 1,
    })
    cy.hash().should('eq', `#/sent?${query}`)
})
