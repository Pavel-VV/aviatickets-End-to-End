// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('reachThePage', () => {
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/countries', { fixture: 'countries.json' }).as('getCountries')
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/cities', { fixture: 'cities.json' }).as('getCities')
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/airlines', { fixture: 'airlines.json' }).as('getAirlines')
    cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', { fixture: 'tickets.json' })
    

    cy.visit('http://localhost:9000')
    cy.get('[data-hook=mainForm]').should('be.visible')

    cy.wait('@getCountries')
    cy.wait('@getCities')
    cy.wait('@getAirlines')
})

Cypress.Commands.add('initElements', () => {
    cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
    cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
    cy.get('[data-hook=datePickerDepartInput]').as('departInput')
    cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')
    cy.get('[data-hook=submitButton]').as('submitButton')
    cy.get('[data-hook=resetButton]').as('resetButton')
})

Cypress.Commands.add('filleTheForm', () => {
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