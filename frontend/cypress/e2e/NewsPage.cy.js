describe('Page Actualités - Tests de filtrage et pagination', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.visit('http://localhost:3000/news')
  })

  it('Doit afficher les actualités et permettre le filtrage par Festival', () => {
    // Vérifier que la page se charge avec des actualités
    cy.get('h1').contains('Actualités').should('be.visible')
    cy.get('.grid > div').should('have.length.greaterThan', 0)

    // Vérifier la présence des boutons de filtre
    cy.get('button').contains('Tous').should('be.visible')
    cy.get('button').contains('Festival').should('be.visible')

    // Appliquer le filtre "Festival"
    cy.get('button').contains('Festival').click()
    cy.wait(500) // Attendre la mise à jour des données

    // Vérifier que la liste affichée après filtrage n'est pas vide
    cy.get('.grid > div').should('have.length.greaterThan', 0)
  })

  it('Doit afficher la pagination uniquement si plus de 6 éléments sont affichés', () => {
    cy.wait(500) // Attendre le chargement initial

    cy.get('.grid > div').then(($elements) => {
      if ($elements.length > 6) {
        // Vérifier que la pagination est présente
        cy.get('.flex.justify-center').should('be.visible')
      } else {
        // Vérifier que la pagination est absente si moins de 7 éléments
        cy.get('.flex.justify-center').should('not.exist')
      }
    })
  })
})
