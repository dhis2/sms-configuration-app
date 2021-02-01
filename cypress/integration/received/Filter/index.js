import { When, Then } from 'cypress-cucumber-preprocessor/steps'
import { createSearchString } from '../../../../src/utils'
import '../common'

const phoneNumber = '+555123'

When("the user clicks on the status filter and selects 'Failed'", () => {
    cy.get('[data-test="status-filter"]:eq(0)').click()
    cy.get('[data-value="FAILED"]').click()
})

Then("only messages with the status of 'Failed' will be shown", () => {
    const query = createSearchString({
        status: 'FAILED',
        pageSize: 50,
        page: 1,
    })
    cy.hash().should('eq', `#/received${query}`)
})

When(
    'the user clicks on the phone number filter and types in a phone number',
    () => {
        cy.get('[data-test="phone-number-filter"]').type(phoneNumber)
    }
)

Then('only messages from that phone number will be shown', () => {
    const query = createSearchString({
        phoneNumber,
        pageSize: 50,
        page: 1,
    })
    cy.hash().should('eq', `#/received${query}`)
})

When("the user clicks on 'Reset filter' button", () => {
    const query = createSearchString({
        status: 'FAILED',
        phoneNumber: '+123456',
        pageSize: 50,
        page: 1,
    })
    cy.visit(`/#/received${query}`)
    cy.get('[data-test="reset-filter-btn"]').click()
})

Then('all filters are reset', () => {
    const query = createSearchString({
        pageSize: 50,
        page: 1,
    })
    cy.hash().should('eq', `#/received${query}`)
})
