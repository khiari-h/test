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
    // Intercepter la requête de connexion et simuler une réponse 401
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Identifiants incorrects' }
    }).as('loginRequest')
  
    // Remplir les champs du formulaire avec des données invalides
    cy.get('input[type="email"]').type('invalid@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
  
    // Soumettre le formulaire de connexion
    cy.get('button[type="submit"]').click()
  
    // Attendre la réponse de l'API
    cy.wait('@loginRequest')
  
    // Vérifier que la requête a bien renvoyé un code 401 (connexion échouée)
    cy.get('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })
  
  
  
  
  
  

  it('Doit empêcher la connexion sans données', () => {
    cy.get('button[type="submit"]').click()
    
    // Vérifier les contraintes HTML5 de validation
    cy.get('input[type="email"]:invalid').should('exist')
    cy.get('input[type="password"]:invalid').should('exist')
  })
})
