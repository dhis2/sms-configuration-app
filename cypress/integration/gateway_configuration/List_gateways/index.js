import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

Given('there are no gateways', () => {
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: {
            gateways: [],
        },
    })
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
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: { gateways },
    })

    gateways.forEach(gateway => {
        cy.route({
            url: new RegExp(`gateways/${gateway.uid}$`),
            method: 'GET',
            response: gateway,
        })
    })
})

Given('the first gateway is the default', () => {
    cy.get(
        '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-isdefault}'
    ).should('exist')
})

Given('the user navigated to the gateway configuration page', () => {
    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When('the user makes the second gateway the default gateway', () => {
    cy.get('@gateways').then(gateways => {
        const secondGateway = gateways[1]

        cy.route({
            url: new RegExp(`.*/gateways/default/${secondGateway.uid}`),
            method: 'PUT',
            delay: 1000,
            // stub the response as the mocked gateway data above
            // most likely contains IDs that do not exist
            response: {
                httpStatus: 'OK',
                httpStatusCode: 200,
                status: 'OK',
                message: 'Jan-Gerke Salomon is set to default',
            },
        }).as('makeDefaultGatewayXHR')
    })

    cy.get(
        '{gateways-gatewaystable-row}:nth-child(2) {gateways-gatewaystable-makedefault}'
    ).click()
})

When(
    'the user clicks on the edit button of the first gateway configuration',
    () => {
        cy.get(
            '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-edit}'
        ).click()
    }
)

Then('no table should be displayed', () => {
    cy.get('{gateways-gatewaystable-row}').should('not.exist')
})

Then('the gateways are rendered as tabular data', () => {
    cy.all(
        () => cy.get('@gateways'),
        () => cy.get('{gateways-gatewaystable-row}')
    ).then(([gateways, $rows]) => {
        expect(gateways.length).to.equal($rows.length)

        gateways.forEach(gateway => {
            cy.get(
                `{gateways-gatewaystable-name}:contains("${gateway.name}")`
            ).should('exist')
        })
    })
})

Then("each row displays the gateway configuration's data", () => {
    cy.all(
        () => cy.get('@gateways'),
        () => cy.get('{gateways-gatewaystable-row}')
    ).then(([gateways, $rows]) => {
        $rows.each((index, $row) => {
            const gateway = gateways[index]

            cy.wrap($row)
                .find('{gateways-gatewaystable-name}')
                .then($nameCell => {
                    expect($nameCell.text()).to.equal(gateway.name)
                })

            cy.wrap($row)
                .find('{gateways-gatewaystable-type}')
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
                .find('{gateways-gatewaystable-isdefault}')
                .should(gateway.isDefault ? 'exist' : 'not.exist')
        })
    })
})

Then('exactly one default gateway should be displayed', () => {
    cy.get(
        '{gateways-gatewaystable-row}:first-child {gateways-gatewaystable-isdefault}'
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
            expect(xhr.status).to.equal(200)
        })
    }
)

Then('the edit form should be visible', () => {
    cy.get('{views-gatewayconfigformedit}').should('exist')
})
