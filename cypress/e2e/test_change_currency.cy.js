context('Test change currency', () => {
    beforeEach(() => {
        cy.reachThePage()
        cy.initElements()
        cy.filleTheForm()
    })

    it('Change currency USD', () => {
        cy.get('[data-hook=currencySelect] .select-wrapper .dropdown-trigger').should('have.value', '$ US Dollar')

        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', (req) => {
            console.log(req)
            expect(req.query.currency).to.equal('USD')
        })
        
        cy.get('@submitButton').click()
    })

    it('Change currency EUR', () => {
        cy.choiceTheCurrency()
        cy.get('[data-hook=currencySelect] .select-wrapper .dropdown-trigger').should('have.value', '€ Euro')

        cy.intercept('GET', 'https://aviasales-api.herokuapp.com/prices/cheap*', (req) => {
            expect(req.query.currency).to.equal('EUR')
        })
        cy.get('@submitButton').click()
    })
})