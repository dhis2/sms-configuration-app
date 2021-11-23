import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

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

Given('some gateway configurations exist', () => {
    cy.intercept('GET', /.*\/gateways.json$/, { body: { gateways } })

    gateways.forEach(({ uid }) => {
        const method = 'PUT'
        const url = new RegExp(`.*/gateways/default/${uid}`)
        const routeHandler = { body: {} }
        cy.intercept(method, url, routeHandler).as(`defaultGatewayXHR${uid}`)
    })

    cy.visit('/')
    cy.getWithDataTest('{shared-navigationitem}:nth-child(2)').click()
})

When(
    'the user clicks on the make default button of a non-default gateway configuration',
    () => {
        cy.getWithDataTest('tbody {smsgateway-table-row}:nth-child(2)')
            .as('newDefaultGatewayConfiguration')
            .findWithDataTest('{smsgateway-table-makedefault}')
            .click()
    }
)

Then('there should be exactly one default gateway configuration', () => {
    cy.getWithDataTest('{smsgateway-table-isdefault}').should(
        'have.lengthOf',
        1
    )
})

Then(
    'the endpoint for setting the default gateway should be called with the id of the clicked one',
    () => {
        cy.get('@newDefaultGatewayConfiguration')
            .findWithDataTest('{smsgateway-table-id} input')
            .invoke('val')
            .then((id) => {
                cy.wait(`@defaultGatewayXHR${id}`).then((xhr) => {
                    expect(xhr.response.statusCode).to.equal(200)
                    expect(xhr.request.url).to.match(new RegExp(`/${id}$`))
                })
            })
    }
)
