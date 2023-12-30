context('Test add tickets', () => {
    beforeEach(() => {
        // cy.reachThePage()
        // cy.initElements()
        // cy.filleTheForm()
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', { fixture: 'tickets.json' })
        
        ///
        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')

        cy.wait('@getCountries')
        cy.wait('@getCities')
        cy.wait('@getAirlines')

        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        cy.get('[data-hook=datePickerDepartInput]').as('departInput')
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')
        cy.get('[data-hook=submitButton]').as('submitButton')
        cy.get('[data-hook=resetButton]').as('resetButton')

        ///
        cy.get('@resetButton').click()
        cy.get('@autocompleteOrigin').should('be.visible')
        cy.get('@autocompleteOrigin').type('Москва')
        cy.get('.input-origin .autocomplete-content li:first').contains('Москва,Россия').click()
        cy.get('@autocompleteOrigin').should('have.value', 'Москва,Россия')

        cy.get('@autocompleteDestination').should('be.visible')
        cy.get('@autocompleteDestination').type('Париж')
        cy.get('.input-destination .autocomplete-content li:first').contains('Париж,Франция').click()
        cy.get('@autocompleteDestination').should('have.value', 'Париж,Франция')

        cy.get('@departInput').should('be.visible')
        cy.get('@departInput').click()
        cy.get('@modalWindow').should('be.visible')

        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .is-today').as('isToday')
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons')

        cy.get('@isToday').click()
        cy.get('@isToday').should('have.class', 'is-selected')
        cy.get('@modalButtons').contains('Ok').click()

        cy.get('@submitButton').click()
    })

    it('Add favorite tickets', () => {
        cy.get('[data-hook=ticketsContainer] .ticket-card:first .add-favorite').as('firstTicket')
        cy.get('[data-hook=ticketsContainer] .ticket-card:last .add-favorite').as('lastTicket')
        
        cy.get('@firstTicket').click()
        cy.get('@lastTicket').click()

        cy.get('[data-hook=favoritesTickets] .dropdown-content').find('.favorite-item').should('have.length', 2)
    })

    it('Delete favorite ticket', () => {
        cy.get('[data-hook=ticketsContainer] .ticket-card:first .add-favorite').as('firstTicket')
        cy.get('[data-hook=ticketsContainer] .ticket-card:last .add-favorite').as('lastTicket')
        
        cy.get('@firstTicket').click()
        cy.get('@lastTicket').click()
        cy.get('[data-hook=favoritesTickets]').click()

        cy.get('[data-hook=favoritesTickets] .dropdown-content .favorite-item:first .delete-favorite').click()
        cy.get('[data-hook=favoritesTickets] .dropdown-content').find('.favorite-item').should('have.length', 1)
    })    
})