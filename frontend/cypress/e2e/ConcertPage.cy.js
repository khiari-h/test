describe('Page Concerts - Tests Complets', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/concerts')
    })
  
    it('Doit charger la page des concerts', () => {
      cy.get('h1').contains('Concerts').should('be.visible')
      cy.get('.grid').should('be.visible')
    })
  
    it('Doit permettre le filtrage par type de concert', () => {
      // Attendre le chargement des données
      cy.wait(1000)
  
      // Vérifier que les filtres sont présents
      cy.get('select[name="type"]').should('be.visible')
  
      // Sélectionner un type de concert spécifique
      cy.get('select[name="type"]').select('Rock')
      cy.wait(500)
      
      // Vérifier que les concerts affichés correspondent au filtre
      cy.get('.grid > div').each(($concert) => {
        cy.wrap($concert).contains('Rock').should('exist')
      })
    })
  
    it('Doit permettre le filtrage par date', () => {
      cy.wait(1000)
  
      cy.get('select[name="date"]').should('be.visible')
      cy.get('select[name="date"]').select('04/08/2024')
      cy.wait(500)
  
      // Vérifier les concerts de cette date
      cy.get('.grid > div').each(($concert) => {
        cy.wrap($concert).contains('04/08/2024').should('exist')
      })
    })
  
    it('Doit permettre la pagination', () => {
      // Vérifier que les boutons de pagination existent
      cy.get('.flex.justify-center').within(() => {
        cy.get('button').contains('1').should('be.visible')
        cy.get('button').contains('Suivant').should('be.visible')
      })
  
      // Tester le changement de page
      cy.get('button').contains('2').click()
      cy.wait(500)
      cy.get('.grid > div').should('have.length.greaterThan', 0)
    })
  })