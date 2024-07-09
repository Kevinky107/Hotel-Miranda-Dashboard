describe('Loading Page with wrong parameters', () => {
    it('successfully loads', () => {
      cy.viewport(1920, 1080)
      cy.visit('http://localhost:5173/')
      cy.get('#email').type('email@gmail.com')
      cy.get('#password').type('password')
      cy.get('button')
        .click().then(() => {
            cy.url().should('equal', 'http://localhost:5173/')
        })

    })
  })