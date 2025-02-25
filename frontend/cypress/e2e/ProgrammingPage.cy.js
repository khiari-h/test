describe('Page Programmation - Tests Complets', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/programmation')
  })

  it('Doit charger la page de programmation', () => {
    cy.get('h1').contains('Programmation').should('be.visible')
    
    // Vérifier la présence des boutons de navigation
    cy.get('button').contains('Concerts').should('be.visible')
    cy.get('button').contains('Rencontres Artistes').should('be.visible')
  })

  it('Doit permettre de basculer entre Concerts et Rencontres Artistes', () => {
    // Vérifier la section Concerts par défaut
    cy.get('section').contains('Concerts').should('be.visible')

    // Basculer vers Rencontres Artistes
    cy.get('button').contains('Rencontres Artistes').click()
    cy.wait(500)
    cy.get('section').contains('Rencontres Artistes').should('be.visible')
  })

  it('Doit afficher les détails des concerts', () => {
    // Attendre le chargement des concerts
    cy.wait(1000)

    // Vérifier la présence des détails de concerts
    cy.get('section').contains('Concerts').within(() => {
      cy.get('.grid > div').each(($concertCard) => {
        cy.wrap($concertCard).find('h2').should('be.visible') // Titre du concert
        cy.wrap($concertCard).find('p').should('be.visible') // Description
      })
    })
  })

  it('Doit afficher les détails des rencontres artistes', () => {
    // Basculer vers Rencontres Artistes
    cy.get('button').contains('Rencontres Artistes').click()
    cy.wait(1000)

    // Vérifier la présence des détails des rencontres
    cy.get('section').contains('Rencontres Artistes').within(() => {
      cy.get('.grid > div').each(($meetingCard) => {
        cy.wrap($meetingCard).find('h2').should('be.visible') // Titre de la rencontre
        cy.wrap($meetingCard).find('p').should('be.visible') // Description
      })
    })
  })
})