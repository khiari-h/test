describe('Page Accueil - Tests de Navigation', () => {
  // Gestion des exceptions
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
  })

  // Navigation vers la page d'accueil avant chaque test
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Doit charger la page d\'accueil correctement', () => {
    // Vérification des éléments principaux
    cy.get('header').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('Doit permettre de naviguer vers la page des Partenaires', () => {
    // Rechercher le lien et supprimer l'attribut `target` pour éviter l'ouverture d'un nouvel onglet
    cy.contains('Nos Partenaires')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click()
  
    // Vérifier que la navigation fonctionne bien
    cy.url().should('include', '/partenaires')
  })
  

  it('Doit vérifier la présence d\'un CTA de réservation', () => {
    // Vérifier l'existence d'un bouton/lien d'achat de billets
    cy.contains('Acheter des billets')
      .should('be.visible')
      .and('have.attr', 'href')
  })
})