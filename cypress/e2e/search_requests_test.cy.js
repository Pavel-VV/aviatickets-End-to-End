context('Test search requests', () => {
    beforeEach(() => {
        cy.reachThePage()
        
        cy.initElements()

        cy.filleTheForm()
    })

    it('Form submit with correct request params', () => {
        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', (req) => {
            console.log(req)
            expect(req.query.currency).to.equal('USD')
            // expect(req.query.depart_date).to.equal('2023-12')
            expect(req.query.depart_date).to.match(/^\d{4}-\d{2}$/)
            expect(req.query.destination).to.equal('PAR')
            expect(req.query.origin).to.equal('MOW')
        })
    })

    it('Tickets display correctly', () => {
        cy.get('[data-hook=ticketsContainer]').as('ticketsContainer')
        cy.get('@ticketsContainer').find('.ticket-card').should('have.length', 2)
    })

    // it('Form submit with correct request params', () => {
    //     cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
    //     cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
    //     cy.get('[data-hook=datePickerDepartInput]').as('departInput')
    //     cy.get('[data-hook=datePickerWrap] .datepicker-container').as('modalWindow')
    //     cy.get('[data-hook=submitButton]').as('submitButton')
    // })
})

