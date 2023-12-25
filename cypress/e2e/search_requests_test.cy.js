context('Test search requests', () => {
    it('Visit home page', () => {
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
        // cy.intercept('GET', 'https://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')

        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')

        cy.wait('@getCountries')
        cy.wait('@getCities')
        // cy.wait('@getAirlines')

        //Form submit with correct request params
        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        cy.get('[data-hook=datePickerDepartInput]').as('departInput')
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')
        cy.get('[data-hook=submitButton]').as('submitButton')
        // cy.get('[data-hook=inputFieldOrigin]').as('inputFieldOrigin')
        // cy.get('[data-hook=inputFieldDestination]').as('inputFieldDestination')

        // cy.get('@autocompleteOrigin').should('be.visible')
        // cy.get('@autocompleteOrigin').type('Харьков')
        // cy.get('.input-origin .autocomplete-content li:first').contains('Харьков,Украина').click()
        // cy.get('@autocompleteOrigin').should('have.value', 'Харьков,Украина')

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

    // it('Form submit with correct request params', () => {
    //     cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
    //     cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
    //     cy.get('[data-hook=datePickerDepartInput]').as('departInput')
    //     cy.get('[data-hook=datePickerWrap] .datepicker-container').as('modalWindow')
    //     cy.get('[data-hook=submitButton]').as('submitButton')
    // })
})

//27.57