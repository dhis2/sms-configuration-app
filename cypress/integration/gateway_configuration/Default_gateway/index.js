import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Before(() => {
    cy.server()
})

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
    cy.route({
        url: /.*\/gateways.json$/,
        method: 'GET',
        response: { gateways },
    })

    gateways.forEach(({ uid }) => {
        cy.route({
            url: new RegExp(`.*/gateways/default/${uid}`),
            method: 'PUT',
            response: {},
        }).as('defaultGatewayXHR')
    })

    cy.visitWhenStubbed('/')
    cy.get('{navigation-navigationitem}:nth-child(2)').click()
})

When(
    'the user clicks on the make default button of a non-default gateway configuration',
    () => {
        cy.get('{gateways-gatewaystable-makedefault}')
            .first()
            .as('makeDefaultButton')

        cy.get('@makeDefaultButton')
            .parents('tr')
            .as('newDefaultGatewayConfiguration')

        cy.get('@makeDefaultButton').click()
    }
)

Then('there should be exactly one default gateway configuration', () => {
    cy.get('{gateways-gatewaystable-isdefault}').should('have.lengthOf', 1)
})

Then(
    'the endpoint for setting the default gateway should be called with the id of the clicked one',
    () => {
        cy.all(
            () => cy.wait('@defaultGatewayXHR'),
            () =>
                cy
                    .get('@newDefaultGatewayConfiguration')
                    .find('{gateways-gatewaystable-id} input')
                    .invoke('val')
        ).then(([xhr, id]) => {
            expect(xhr.status).to.equal(200)
            expect(xhr.url).to.match(new RegExp(`/${id}$`))
        })
    }
)
