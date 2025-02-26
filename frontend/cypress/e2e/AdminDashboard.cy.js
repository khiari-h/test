describe('Tableau de Bord Admin', () => {
  beforeEach(() => {
    // Simuler une connexion avec l'email et le mot de passe spécifiques
    cy.visit('http://localhost:3000/admin/login')
    cy.get('input[type="email"]').type('hamdane.khiari@gmail.com')
    cy.get('input[type="password"]').type('Admin123!')
    cy.get('button[type="submit"]').click()

    // Attendre que la page de tableau de bord soit complètement chargée
    cy.wait(3000) // Attendre 3 secondes (ajuste cette valeur si nécessaire)
  })

  it('Doit charger le tableau de bord', () => {
    cy.url().should('include', 'http://localhost:3000/admin/dashboard')
    cy.get('h1').contains('Tableau de Bord Admin').should('be.visible')
  })

  it('Doit avoir une sidebar de navigation', () => {
    const menuItems = [
      'Tableau de bord',
      'Concerts', 
      'Rencontres Artistes', 
      'Actualités', 
      'Déconnexion'
    ]

    menuItems.forEach(item => {
      cy.get('nav').contains(item).should('be.visible')
    })
  })

  it('Doit permettre la navigation vers différentes sections', () => {
    // Naviguer vers la gestion des concerts
    cy.contains('Concerts').click()
    cy.url().should('include', 'http://localhost:3000/admin/concerts')
    cy.get('h1').contains('Gestion des Concerts').should('be.visible')

    // Naviguer vers la gestion des rencontres
    cy.visit('http://localhost:3000/admin/dashboard') // Retour au tableau de bord
    cy.contains('Rencontres Artistes').click()
    cy.url().should('include', 'http://localhost:3000/admin/meetings')
    cy.get('h1').contains('Gestion des Rencontres Artistes').should('be.visible')

    // Naviguer vers la gestion des actualités
    cy.visit('http://localhost:3000/admin/dashboard') // Retour au tableau de bord
    cy.contains('Actualités').click()
    cy.url().should('include', 'http://localhost:3000/admin/news')
    cy.get('h1').contains('Gestion des Actualités').should('be.visible')
  })
})
