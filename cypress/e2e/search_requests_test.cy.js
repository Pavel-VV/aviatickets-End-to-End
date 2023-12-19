context('Test search requests', () => {
    it('Visit home page', () => {
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')

        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')

        cy.wait('@getCountries')
        cy.wait('@getCities')
        cy.wait('@getAirlines')
    })
})

//14.00