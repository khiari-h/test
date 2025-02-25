describe('Page Actualités - Tests Complets', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/news')
    })
  
    it('Doit charger la page des actualités', () => {
      cy.get('h1').contains('Actualités').should('be.visible')
      cy.get('.grid').should('be.visible')
    })
  
    it('Doit permettre le filtrage par catégorie', () => {
      cy.wait(1000)
  
      // Vérifier les boutons de filtre
      cy.get('button').contains('Tous').should('be.visible')
      cy.get('button').contains('Concert').should('be.visible')
  
      // Filtrer par catégorie Concert
      cy.get('button').contains('Concert').click()
      cy.wait(500)
  
      // Vérifier que les actualités affichées sont de la catégorie Concert
      cy.get('.grid > div').each(($newsItem) => {
        cy.wrap($newsItem).contains('Concert').should('exist')
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
  
    it('Doit afficher les détails de chaque actualité', () => {
      // Attendre le chargement des actualités
      cy.wait(1000)
  
      // Vérifier que chaque carte d'actualité a un titre et une description
      cy.get('.grid > div').each(($newsItem) => {
        cy.wrap($newsItem).find('h2').should('be.visible')
        cy.wrap($newsItem).find('p').should('be.visible')
      })
    })
  })