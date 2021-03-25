import { Then } from 'cypress-cucumber-preprocessor/steps'
import { translations } from '../../../../src/sms-received/utils/translations/translations'
import '../common'

Then('the user should be notified that there are no messages', () => {
    cy.get('[data-test="dhis2-uicore-tablecell"]').should(
        'contain',
        'No SMSes to display'
    )
})

Then('the received messages are rendered as tabular data', () => {
    cy.get('[data-test="dhis2-uicore-table"]').should('be.visible')
})

Then('each row displays the message contents and metadata', () => {
    cy.fixture('received/received').then(({ inboundsmss }) => {
        inboundsmss.forEach(({ text, originator, smsstatus }, index) => {
            cy.get(`[data-test="dhis2-uicore-tablerow"]:eq(${index})`).should(
                $elem => {
                    expect($elem.text()).to.contain(text)
                    expect($elem.text()).to.contain(originator)
                    expect($elem.text()).to.contain(translations[smsstatus])
                }
            )
        })
    })
})
