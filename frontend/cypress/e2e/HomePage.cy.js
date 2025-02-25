describe('Page Accueil - Tests Complets', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Doit charger la page d\'accueil correctement', () => {
    // Vérification des éléments principaux
    cy.get('header').should('be.visible')
    cy.get('section').contains('Réservez vos billets').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('Doit avoir un CTA de réservation fonctionnel', () => {
    cy.contains('Acheter des billets')
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.site-de-billetterie.com')
  })

  it('Doit permettre de naviguer vers la page des Partenaires', () => {
    cy.contains('Nos Partenaires').click()
    cy.url().should('include', '/partenaires')
  })

  it('Doit afficher les sections principales', () => {
    // Sections à vérifier
    const sections = [
      'Actualités et Mises à Jour',
      'Aperçu des Concerts', 
      'Programmation',
      'Infos Pratiques',
      'Carte'
    ]

    sections.forEach(section => {
      cy.contains(section).should('be.visible')
    })
  })
})