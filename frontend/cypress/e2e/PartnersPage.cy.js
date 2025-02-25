describe('Page Partenaires - Tests Complets', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/partenaires')
  })

  it('Doit charger la page des partenaires', () => {
    cy.get('h1').contains('Nos Partenaires').should('be.visible')
    cy.get('.grid').should('be.visible')
  })

  it('Doit permettre le filtrage par catégorie', () => {
    cy.wait(1000)

    // Vérifier les boutons de filtre
    cy.get('button').contains('Tous').should('be.visible')
    cy.get('button').contains('Sponsors principaux').should('be.visible')

    // Filtrer par catégorie Sponsors principaux
    cy.get('button').contains('Sponsors principaux').click()
    cy.wait(500)

    // Vérifier que les partenaires affichés sont de la catégorie Sponsors principaux
    cy.get('.grid > div').each(($partnerCard) => {
      cy.wrap($partnerCard).contains('Sponsors principaux').should('exist')
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

  it('Doit avoir un CTA pour devenir partenaire', () => {
    // Vérifier le bouton pour envoyer un email
    cy.contains('Envoyez-nous un email')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('contain', 'mailto:')
  })

  it('Doit afficher les détails des partenaires', () => {
    // Attendre le chargement des partenaires
    cy.wait(1000)

    // Vérifier que chaque carte de partenaire a un nom, un logo et potentiellement un lien
    cy.get('.grid > div').each(($partnerCard) => {
      cy.wrap($partnerCard).find('h2').should('be.visible') // Nom du partenaire
      cy.wrap($partnerCard).find('img').should('be.visible') // Logo
    })
  })
})