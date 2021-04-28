import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const interceptCommandDetails = fixture => {
    cy.get('@commandId').then(commandId => {
        cy.intercept(new RegExp(`${commandId}[?].*fields=[*]`), {
            method: 'GET',
            fixture,
        })
    })
}

Before(() => {
    cy.intercept(/[/]smsCommands[?]paging=false&fields=[*]/, {
        method: 'GET',
        fixture: 'commands/edit_cmd_j2me/commandsForListView',
    })

    cy.fixture('commands/edit_cmd_j2me/commandsForListView').then(
        ({ smsCommands }) => {
            const [{ id: commandId }] = smsCommands
            cy.wrap(commandId).as('commandId')

            cy.intercept(
                new RegExp(`${commandId}[?]fields=parserType&paging=false`),
                {
                    method: 'GET',
                    fixture: 'commands/edit_cmd_j2me/commandParserType',
                }
            )

            cy.intercept(new RegExp(`smsCommands/${commandId}$`), {
                method: 'PUT',
                body: {},
            }).as('updateSmsCommandXhr')
        }
    )

    cy.fixture('commands/edit_cmd_j2me/dataSets').then(dataSets => {
        // This is used by the formula modal,
        // which will display a dropdown with data elements
        cy.intercept(/dataSets[/][a-zA-Z0-9]+/, {
            method: 'GET',
            fixture: 'commands/edit_cmd_j2me/dataSets',
        })

        // This is used by the formula button of the sms code field
        dataSets.dataSetElements.forEach(({ dataElement }) => {
            cy.intercept(new RegExp(`dataElements/${dataElement.id}`), {
                method: 'GET',
                body: { displayName: dataElement.displayName },
            })
        })
    })
})

Given('a sms command with parser type J2ME exists', () => {
    interceptCommandDetails('commands/edit_cmd_j2me/commandDetails')
})

Given(
    'a sms command with parser type J2ME exists with a short code field with a value',
    () => {
        interceptCommandDetails(
            'commands/edit_cmd_j2me/commandDetailsWithCodeValue'
        )
    }
)

Given(
    'a sms command with parser type J2ME exists with a short code fields with a value and a formula',
    () => {
        const fixture =
            'commands/edit_cmd_j2me/commandDetailsWithCodeValueAndFormula'
        interceptCommandDetails(fixture)

        // Extracting the data element of the formula for later use
        cy.fixture(fixture).then(command => {
            const code = command.smsCodes[0]
            const codeDataElementId = code.dataElement.id
            const dataElement = command.dataset.dataSetElements.find(
                dataSetElement => {
                    return dataSetElement.dataElement.id === codeDataElementId
                }
            ).dataElement

            cy.wrap(code).as('code')
            cy.wrap(dataElement).as('formulaDataElement')
        })
    }
)

Given('the user is editing an J2ME parser command', () => {
    cy.visitWhenStubbed('/')
    cy.get('{shared-navigationitem}:nth-child(3)').click()

    // There's only one command in the mocked api response
    cy.get('{views-smscommandlist-commandtable} button').click()
})

When('the user changes the name field', () => {
    cy.get('{smscommand-fieldcommandname} input')
        .invoke('val')
        .then(currentName => {
            cy.wrap({ name: `${currentName}!` }).as('newValues')
            cy.get('{smscommand-fieldcommandname} input').type('!')
        })
})

When('the user changes the completenessMethod field', () => {
    const completenessMethod = 'ALL_DATAVALUE'
    cy.get('{smscommand-fieldcompletenessmethod-content}').click()
    cy.get(`[data-value="${completenessMethod}"]`).click()
    cy.wrap({ completenessMethod }).as('newValues')
})

When('the user changes the currentPeriodUsedForReporting field', () => {
    cy.get('{smscommand-fieldusecurrentperiodforreporting} label').click()
    cy.wrap({ currentPeriodUsedForReporting: true }).as('newValues')
})

When('the user changes the fieldSeparator field', () => {
    const separator = 'New separator'

    cy.get('{smscommand-fieldseparator} input').clear().type(separator)

    cy.wrap({ separator }).as('newValues')
})

When('the user changes the replyMessage field', () => {
    const defaultMessage = 'New default message'

    cy.get('{smscommand-fielddefaultmessage} textarea')
        .clear()
        .type(defaultMessage)

    cy.wrap({ defaultMessage }).as('newValues')
})

When('the user changes the wrongFormatMessage field', () => {
    const wrongFormatMessage = 'New wrong format message'

    cy.get('{smscommand-fieldwrongformatmessage} textarea')
        .clear()
        .type(wrongFormatMessage)

    cy.wrap({ wrongFormatMessage }).as('newValues')
})

When('the user changes the noUserMessage field', () => {
    const noUserMessage = 'New no user message'

    cy.get('{smscommand-fieldnousermessage} textarea')
        .clear()
        .type(noUserMessage)

    cy.wrap({ noUserMessage }).as('newValues')
})

When('the user changes the moreThanOneOrgUnitMessage field', () => {
    const moreThanOneOrgUnitMessage = 'New more than one org unit message'

    cy.get('{smscommand-fieldmorethanoneorgunitmessage} textarea')
        .clear()
        .type(moreThanOneOrgUnitMessage)

    cy.wrap({ moreThanOneOrgUnitMessage }).as('newValues')
})

When('the user changes the successMessage field', () => {
    const successMessage = 'New success message'

    cy.get('{smscommand-fieldsuccessmessage} textarea')
        .clear()
        .type(successMessage)

    cy.wrap({ successMessage }).as('newValues')
})

When('the user changes the name field to an invalid value', () => {
    cy.get('{smscommand-fieldcommandname} input').clear()
})

When('the user submits the form', () => {
    cy.get('{smscommand-viewsmscommandedit} button[type="submit"]').click()
})

When('the user changes the value of a short code', () => {
    const newSmsCodeValue = 'Foo bar baz'

    cy.get('{smscommand-dataelementtimescategoryoptioncombos-rows} input')
        .invoke('filter', (_, input) => !!Cypress.$(input).val())
        .clear()
        .type(newSmsCodeValue)

    cy.wrap(newSmsCodeValue).as('newSmsCodeValue')
})

When('the user adds a formula', () => {
    cy.get(
        '{smscommand-dataelementtimescategoryoptioncombos-rows} {shared-formrow}:first-child {smscommand-fielddataelementwithcategoryoptioncombo-addformulabutton}'
    ).click()

    cy.fixture('commands/edit_cmd_j2me/dataSets').then(
        ({ dataSetElements }) => {
            const [{ dataElement }] = dataSetElements

            cy.get(
                '{smscommand-fielddataelementwithcategoryoptioncomboformula-dataelement}'
            ).click()

            cy.get(
                `[data-test="dhis2-uicore-singleselectoption"][data-value="${dataElement.id}"]`
            ).click()

            cy.wrap(dataElement).as('formulaDataElement')
        }
    )

    cy.get(
        '{smscommand-fielddataelementwithcategoryoptioncomboformula-save}'
    ).click()
})

When('the user changes the formula', () => {
    cy.get('button:contains("Edit formula")').click()
    cy.fixture(
        'commands/edit_cmd_j2me/commandDetailsWithCodeValueAndFormula'
    ).then(command => {
        const dataElementId = command.smsCodes[0].formula.slice(1)
        const dataElementDisplayName = command.dataset.dataSetElements.find(
            ({ dataElement }) => {
                const { id } = dataElement
                return id === dataElementId
            }
        ).dataElement.displayName

        // open select with the data element
        cy.get(
            `[data-test="dhis2-uicore-select"]:contains("${dataElementDisplayName}")`
        ).click()

        // select first non-active option
        cy.get('[data-test="dhis2-uicore-singleselectoption"]:not(.active)')
            .then($options => {
                const $option = $options.eq(0)
                const label = $option.text()
                const dataElement = command.dataset.dataSetElements.find(
                    ({ dataElement }) => dataElement.displayName === label
                ).dataElement

                cy.wrap(dataElement).as('formulaDataElement')

                // keep options as the current subject
                return cy.wrap($option)
            })
            .click()

        cy.get(
            '[data-test="dhis2-uicore-modalactions"] button:contains("Save")'
        ).click()
    })
})

When('the user removes the formula', () => {
    cy.get('button:contains("Edit formula")').click()
    cy.get('button:contains("Remove")').click()
})

Then('the form should submit successfully', () => {
    cy.wait('@updateSmsCommandXhr').then(result => {
        expect(result.response.statusCode).to.equal(200)
        cy.wrap(result.request.body).as('payload')
    })
})

Then('the complete command should be sent to the endpoint', () => {
    cy.get('@payload').then(payload => {
        assert.isBoolean(payload.currentPeriodUsedForReporting)
        assert.isString(payload.completenessMethod)
        assert.isString(payload.dataset.id)
        assert.isString(payload.moreThanOneOrgUnitMessage)
        assert.isString(payload.name)
        assert.isString(payload.noUserMessage)
        assert.isString(payload.parserType)
        assert.isString(payload.separator)
        assert.isString(payload.wrongFormatMessage)
        assert.isString(payload.successMessage)
        assert.isArray(payload.smsCodes)
    })
})

Then(
    'the value of the changed name field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.name).to.equal(newValues.name)
        })
    }
)

Then(
    'the value of the changed completenessMethod field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.completenessMethod).to.equal(
                newValues.completenessMethod
            )
        })
    }
)

Then(
    'the value of the changed currentPeriodUsedForReporting field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.currentPeriodUsedForReporting).to.equal(
                newValues.currentPeriodUsedForReporting
            )
        })
    }
)

Then(
    'the value of the changed fieldSeparator field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.separator).to.equal(newValues.separator)
        })
    }
)

Then(
    'the value of the changed replyMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.defaultMessage).to.equal(newValues.defaultMessage)
        })
    }
)

Then(
    'the value of the changed wrongFormatMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.wrongFormatMessage).to.equal(
                newValues.wrongFormatMessage
            )
        })
    }
)

Then(
    'the value of the changed noUserMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.noUserMessage).to.equal(newValues.noUserMessage)
        })
    }
)

Then(
    'the value of the changed moreThanOneOrgUnitMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.moreThanOneOrgUnitMessage).to.equal(
                newValues.moreThanOneOrgUnitMessage
            )
        })
    }
)

Then(
    'the value of the changed successMessage field should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newValues')
        ).then(([payload, newValues]) => {
            expect(payload.successMessage).to.equal(newValues.successMessage)
        })
    }
)

Then('the form should not submit successfully', () => {
    cy.get('{smscommand-viewsmscommandedit} .error').should(
        'have.length.of.at.least',
        1
    )
})

Then(
    'the value of the changed short code should be reflected in the payload',
    () => {
        cy.all(
            () => cy.get('@payload'),
            () => cy.get('@newSmsCodeValue')
        ).then(([payload, newSmsCodeValue]) => {
            expect(payload.smsCodes[0].code).to.equal(newSmsCodeValue)
        })
    }
)

Then('the formula should be reflected below the code', () => {
    cy.all(
        () =>
            cy.fixture(
                'commands/edit_cmd_j2me/commandDetailsWithCodeValueAndFormula'
            ),
        () => cy.get('@formulaDataElement')
    ).then(([command, formulaDataElement]) => {
        const code = command.smsCodes[0]
        const codeValue = code.code
        const operator = code.formula[0]

        cy.get(
            `:contains("${codeValue} ${operator} ${formulaDataElement.displayName}")`
        ).should('exist')
    })
})

Then('the formula should not be shown below the code', () => {
    cy.all(
        () => cy.get('@code'),
        () => cy.get('@formulaDataElement')
    ).then(([code, formulaDataElement]) => {
        const codeValue = code.code
        const operator = code.formula[0]

        cy.get(
            `:contains("${codeValue} ${operator} ${formulaDataElement.displayName}")`
        ).should('not.exist')
    })
})

Then('the formula should be send alongside the short code', () => {
    cy.all(
        () => cy.get('@payload'),
        () => cy.get('@formulaDataElement')
    ).then(([payload, formulaDataElement]) => {
        const shortCode = payload.smsCodes.find(
            smsCode => smsCode.dataElement.id === formulaDataElement.id
        )
        expect(shortCode).to.not.equal(null)
        expect(shortCode.formula).to.equal(`+${formulaDataElement.id}`)
    })
})

Then('the formula should not be send alongside the short code', () => {
    cy.all(
        () => cy.get('@payload'),
        () => cy.get('@formulaDataElement')
    ).then(([payload, formulaDataElement]) => {
        const shortCode = payload.smsCodes.find(
            smsCode => smsCode.dataElement.id === formulaDataElement.id
        )

        expect(shortCode).to.not.be.null
        expect(shortCode.formula).to.be.undefined
    })
})
