describe('Loading Page with correct parameters', () => {
    it('successfully loads', () => {
      cy.viewport(1920, 1080)
      cy.visit('http://localhost:5173/')
      cy.get('#email').type('Kevinagudomontil@gmail.com')
      cy.get('#password').type('1234')
      cy.get('button')
        .click().then(() => {
            cy.url().should('include', '/Dashboard')
        })

    })
  })