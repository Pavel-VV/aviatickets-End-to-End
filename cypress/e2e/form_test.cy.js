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

        //After selecting  the departing date, it should be displayed in the input field in the right format
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .is-today').as('isToday')
        cy.get('[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat').as('modalButtons')

        cy.get('@isToday').click()
        cy.get('@isToday').should('have.class', 'is-selected')
        cy.get('@modalButtons').contains('Ok').click()

        //Input depart date matches the condition
        cy.get('@datePickerDepartInput').then(($input) => {
            const val =$input.val()
            //2023-12
            expect(val).to.match(/^\d{4}-\d{2}$/)
        })
    })

    // it('When typing a value into destination city autocomplete, this autocomplete is visible and has typed value', () => {
    //     cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')

    //     cy.get('@autocompleteDestination').should('be.visible')
    //     cy.get('@autocompleteDestination').type('Москва')
    //     cy.get('@autocompleteDestination').should('have.value', 'Москва')
    // })
})

//26.01