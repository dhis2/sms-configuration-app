import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const smsCommandId = 'zYT407xRwIB'

const smsCommandsForList = [
    {
        access: {
            read: true,
            update: true,
            externalize: false,
            delete: true,
            write: true,
            manage: true,
        },
        attributeValues: [],
        completenessMethod: 'AT_LEAST_ONE_DATAVALUE',
        created: '2020-10-20T11:27:02.664',
        currentPeriodUsedForReporting: false,
        displayName: 'asdf',
        externalAccess: false,
        favorite: false,
        favorites: [],
        href: 'https://debug.dhis2.org/2.35dev/api/32/smsCommands/zYT407xRwIB',
        id: smsCommandId,
        lastUpdated: '2020-10-20T11:27:02.664',
        moreThanOneOrgUnitMessage:
            'Found more than one org unit for this number. Please specify one organisation unit',
        name: 'asdf',
        noUserMessage:
            'No user associated with this phone number. Please contact your supervisor.',
        parserType: 'ALERT_PARSER',
        receivedMessage: 'Command has been processed successfully',
        smsCodes: [],
        specialCharacters: [],
        successMessage: 'Command has been processed successfully',
        translations: [],
        userAccesses: [],
        userGroup: { id: 'vAvEltyXGbD' },
        userGroupAccesses: [],
        wrongFormatMessage: 'Wrong command format',
    },
]

const alertParserCommandParserTypeResponse = [
    {
        parserType: 'ALERT_PARSER',
    },
]

const alertParserCommandDetails = [
    {
        name: 'asdf',
        receivedMessage: 'Command has been processed successfully',
        parserType: 'ALERT_PARSER',
        userGroup: {
            name: 'Africare HQ',
            id: 'vAvEltyXGbD',
        },
    },
]

Before(() => {
    cy.server()

    cy.route({
        url: /\/smsCommands\?paging=false&fields=\*/,
        method: 'GET',
        response: { smsCommands: smsCommandsForList },
    })

    cy.route({
        url: new RegExp(`${smsCommandId}?fields=parserType&paging=false`),
        method: 'GET',
        response: { smsCommands: alertParserCommandParserTypeResponse },
    })

    cy.route({
        url: new RegExp(
            `${smsCommandId}?fields=name,parserType,receivedMessage,userGroup[name%2Cid]`
        ),
        method: 'GET',
        response: { smsCommands: alertParserCommandDetails },
    })

    cy.route({
        url: new RegExp(`smsCommands/${smsCommandId}`),
        method: 'PATCH',
        response: {},
    }).as('updateSmsCommandXhr')
})

Given('the user is editing an alert parser command', () => {
    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(3)').click()
    // There's only one command in the mocked api response
    cy.get('{views-smscommandlist-commandtable} button').click()
})

When('the user changes the name field', () => {
    const newNameValue = 'New name'

    cy.wrap({
        name: newNameValue,
    }).as('newValues')

    cy.get('{commands-fieldcommandname} input')
        .clear()
        .type(newNameValue)
})

When('the user changes the confirmMessage field', () => {
    const newConfirmMessageValue = 'New confirm message'

    cy.wrap({
        receivedMessage: newConfirmMessageValue,
    }).as('newValues')

    cy.get('{commands-fieldcommandconfirmmessage} textarea')
        .clear()
        .type(newConfirmMessageValue)
})

When('the user changes the name field to an invalid value', () => {
    cy.get('{commands-fieldcommandname} input').clear()
})

When('the user submits the form', () => {
    cy.get('{views-smscommandformedit} button[type="submit"]').click()
})

Then('the complete command should be sent to the endpoint', () => {
    cy.wait('@updateSmsCommandXhr').then(xhr => {
        const payload = xhr.request.body
        const payloadKeys = Object.keys(payload)
        const commandKeys = Object.keys(alertParserCommandDetails[0])

        cy.wrap(payload).as('updateRequestPayload')

        expect(payloadKeys.length).to.equal(commandKeys.length)

        commandKeys.forEach(commandKey => {
            expect(payloadKeys).to.include(commandKey)
        })
    })
})

Then(
    'the value of the changed name field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@updateRequestPayload'),
            () => cy.get('@newValues')
        ).then(([updateRequestPayload, newValues]) => {
            expect(updateRequestPayload.name).to.equal(newValues.name)
        })
    }
)

Then(
    'the value of the changed confirmMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@updateRequestPayload'),
            () => cy.get('@newValues')
        ).then(([updateRequestPayload, newValues]) => {
            expect(updateRequestPayload.receivedMessage).to.equal(
                newValues.receivedMessage
            )
        })
    }
)

Then('the form should not submit successfully', () => {
    cy.get('{views-smscommandlist}').should('not.exist')
})
