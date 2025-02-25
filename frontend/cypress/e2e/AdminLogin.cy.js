describe('Authentification Admin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/admin/login')
  })

  it('Doit afficher la page de connexion', () => {
    cy.get('h2').contains('Espace Admin').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('Doit gérer une connexion invalide', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Identifiants incorrects' }
    }).as('loginRequest')
  
    cy.get('input[type="email"]').type('invalid@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
  
    // Attendre la réponse de l'API
    cy.wait('@loginRequest')
  
    // Ajouter un délai pour attendre que le message d'erreur apparaisse
    cy.wait(1000) // Attente d'une seconde avant de vérifier l'erreur

    // Vérifier que le message d'erreur est affiché
    cy.contains('Identifiants incorrects').should('be.visible')
  })
  

  it('Doit empêcher la connexion sans données', () => {
    cy.get('button[type="submit"]').click()
    
    // Vérifier les contraintes HTML5 de validation
    cy.get('input[type="email"]:invalid').should('exist')
    cy.get('input[type="password"]:invalid').should('exist')
  })
})
