import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import { createSearchString } from '../../../../src/utils'
import '../common'

When("the user clicks on the status filter and selects 'Failed'", () => {
    cy.get(
        '[data-test="status-filter"] [data-test="dhis2-uicore-select-input"]'
    ).click()
    cy.get('[data-value="FAILED"]').click()
})

Then("only messages with the status of 'Failed' will be shown", () => {
    const query = createSearchString({
        status: 'FAILED',
        pageSize: 50,
        page: 1,
    })
    cy.hash().should('eq', `#/sent${query}`)
})
