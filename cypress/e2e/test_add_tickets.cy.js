context('Test add tickets', () => {
    beforeEach(() => {
        cy.reachThePage()
        cy.initElements()
        cy.filleTheForm()
    })

    it('Add favorite tickets', () => {
        cy.get('@submitButton').click()

        cy.get('[data-hook=ticketsContainer] .ticket-card:first .add-favorite').as('firstTicket')
        cy.get('[data-hook=ticketsContainer] .ticket-card:last .add-favorite').as('lastTicket')
        
        cy.get('@firstTicket').click()
        cy.get('@lastTicket').click()

        cy.get('[data-hook=favoritesTickets] .dropdown-content').find('.favorite-item').should('have.length', 2)
    })

    it('Delete favorite ticket', () => {
        cy.get('@submitButton').click()

        cy.get('[data-hook=ticketsContainer] .ticket-card:first .add-favorite').as('firstTicket')
        cy.get('[data-hook=ticketsContainer] .ticket-card:last .add-favorite').as('lastTicket')
        
        cy.get('@firstTicket').click()
        cy.get('@lastTicket').click()
        cy.get('[data-hook=favoritesTickets]').click()

        cy.get('[data-hook=favoritesTickets] .dropdown-content .favorite-item:first .delete-favorite').click()
        cy.get('[data-hook=favoritesTickets] .dropdown-content').find('.favorite-item').should('have.length', 1)
    })    
})