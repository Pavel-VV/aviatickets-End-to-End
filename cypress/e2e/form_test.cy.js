context('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000')
    })
    it('When visiting the home page, the form is visible', () => {
        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')
    })

    it('Typing data on form', () => {
        //When typing a value into origin city autocomplete, this autocomplete is visible and has typed value
        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')

        cy.get('@autocompleteOrigin').should('be.visible')
        cy.get('@autocompleteOrigin').type('Химки')
        cy.get('@autocompleteOrigin').should('have.value', 'Химки')

        //When typing a value into destination city autocomplete, this autocomplete is visible and has typed value
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')

        cy.get('@autocompleteDestination').should('be.visible')
        cy.get('@autocompleteDestination').type('Москва')
        cy.get('@autocompleteDestination').should('have.value', 'Москва')

        //When clicking on the depart datepicker the datepicker modal should open
        cy.get('[data-hook=datePickerDepartInput]').as('datePickerDepartInput')
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container').as('modalWindow')

        cy.get('@datePickerDepartInput').click()
        cy.get('@modalWindow').should('be.visible')
    })

    // it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    //     cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')

    //     cy.get('@autocompleteDestination').should('be.visible')
    //     cy.get('@autocompleteDestination').type('Москва')
    //     cy.get('@autocompleteDestination').should('have.value', 'Москва')
    // })
})

//15.24