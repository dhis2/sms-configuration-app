import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('there are no gateways', () => {
    const body = { gateways: [] }
    cy.intercept('GET', /.*\/gateways.json$/, { body })
})

Given('some gateways exist', () => {
    const gateways = [
        {
            type: 'http',
            uid: 'wRi738xEht',
            name: 'Foobarbaz',
            isDefault: true,
            urlTemplate: 'https://a.url.tld',
            useGet: false,
            contentType: 'FORM_URL_ENCODED',
            parameters: [],
        },
        {
            type: 'http',
            uid: 'wddjdkXLsD',
            name: 'asdf',
            isDefault: false,
            urlTemplate: 'http://d.dd',
            useGet: false,
            contentType: 'FORM_URL_ENCODED',
            parameters: [],
        },
        {
            type: 'http',
            uid: 'EylO7K98mx',
            name: 'foobar',
            isDefault: false,
            urlTemplate: 'http://d.dd',
            useGet: false,
            contentType: 'FORM_URL_ENCODED',
            parameters: [],
        },
    ]

    cy.wrap(gateways).as('gateways')
    cy.intercept('GET', /.*\/gateways.json$/, { body: { gateways } })

    gateways.forEach(gateway => {
        cy.intercept('GET', new RegExp(`gateways/${gateway.uid}$`), {
            body: gateway,
        })
    })
})

Given('the first gateway is the default', () => {
    cy.getWithDataTest(
        '{smsgateway-table-row}:first-child {smsgateway-table-isdefault}'
    ).should('exist')
})

Given('the user navigated to the gateway configuration page', () => {
    cy.visitWhenStubbed('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
})

When('the user makes the second gateway the default gateway', () => {
    cy.get('@gateways').then(gateways => {
        const secondGateway = gateways[1]

        cy.intercept(
            'PUT',
            new RegExp(`.*/gateways/default/${secondGateway.uid}`),
            {
                delay: 1000,
                body: {
                    httpStatus: 'OK',
                    httpStatusCode: 200,
                    status: 'OK',
                    message: 'Jan-Gerke Salomon is set to default',
                },
            }
        ).as('makeDefaultGatewayXHR')
    })

    cy.getWithDataTest(
        '{smsgateway-table-row}:nth-child(2) {smsgateway-table-makedefault}'
    ).click()
})

When(
    'the user clicks on the edit button of the first gateway configuration',
    () => {
        cy.getWithDataTest(
            '{smsgateway-table-row}:first-child {smsgateway-table-edit}'
        ).click()
    }
)

Then('no table should be displayed', () => {
    cy.getWithDataTest('{smsgateway-table-row}').should('not.exist')
})

Then('the gateways are rendered as tabular data', () => {
    cy.all(
        () => cy.get('@gateways'),
        () => cy.getWithDataTest('{smsgateway-table-row}')
    ).then(([gateways, $rows]) => {
        expect(gateways.length).to.equal($rows.length)

        gateways.forEach(gateway => {
            cy.getWithDataTest(
                `{smsgateway-table-name}:contains("${gateway.name}")`
            ).should('exist')
        })
    })
})

Then("each row displays the gateway configuration's data", () => {
    cy.all(
        () => cy.get('@gateways'),
        () => cy.getWithDataTest('{smsgateway-table-row}')
    ).then(([gateways, $rows]) => {
        $rows.each((index, $row) => {
            const gateway = gateways[index]

            cy.wrap($row)
                .findWithDataTest('{smsgateway-table-name}')
                .then($nameCell => {
                    expect($nameCell.text()).to.equal(gateway.name)
                })

            cy.wrap($row)
                .findWithDataTest('{smsgateway-table-type}')
                .then($typeCell => {
                    const typeText =
                        gateway.type === 'http'
                            ? 'Generic'
                            : gateway.type === 'bulksms'
                            ? 'BulkSMS'
                            : gateway.type === 'clickatell'
                            ? 'Clickatell'
                            : (() => {
                                  throw new Error('Unsupported type')
                              })()

                    expect($typeCell.text()).to.equal(typeText)
                })

            cy.wrap($row)
                .findWithDataTest('{smsgateway-table-isdefault}')
                .should(gateway.isDefault ? 'exist' : 'not.exist')
        })
    })
})

Then('exactly one default gateway should be displayed', () => {
    cy.getWithDataTest(
        '{smsgateway-table-row}:first-child {smsgateway-table-isdefault}'
    ).should('have.lengthOf', 1)
})

Then(
    'a PUT request to the default gateways endpoint should be sent with the id as url segment',
    () => {
        // It's totally fine to do the assertion for a stubbed request.
        // This should only make sure that the correct url has been called.
        // -> It's not testing whether the server works correctly,
        //    that's the responsibility of the backend test suite.
        cy.wait('@makeDefaultGatewayXHR').should(xhr => {
            expect(xhr.response.statusCode).to.equal(200)
        })
    }
)

Then('the edit form should be visible', () => {
    cy.getWithDataTest('{smsgateway-viewsmsgatewayedit}').should('exist')
})
