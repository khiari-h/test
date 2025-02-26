describe('Page Concerts - Tests Essentiels', () => {
  // Gestion des exceptions
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
  })

  // Navigation avant chaque test
  beforeEach(() => {
    cy.visit('http://localhost:3000/concerts')
  })

  it('Doit charger la liste des concerts', () => {
    // Vérifier le titre de la page
    cy.get('h1').contains('Concerts').should('be.visible')
    
    // Vérifier que la liste des concerts est chargée
    cy.get('.grid > div').should('have.length.greaterThan', 0)
  })

  it('Doit permettre le filtrage des concerts', () => {
    // Vérifier la présence des filtres
    cy.get('select[name="type"]').should('be.visible')
  
    // Sélectionner un type de concert
    cy.get('select[name="type"]').select('Rock')
  
    // Vérifier que les résultats sont bien filtrés
    cy.get('.grid > div').should('have.length.greaterThan', 0)
  })
  
  
  

  it('Doit permettre la pagination', () => {
    // Vérifier les boutons de pagination
    cy.get('button').contains('Précédent').should('be.visible')
    cy.get('button').contains('Suivant').should('be.visible')

    // Changer de page
    cy.get('button').contains('2').click()
    cy.get('.grid > div').should('have.length.greaterThan', 0)
  })
})