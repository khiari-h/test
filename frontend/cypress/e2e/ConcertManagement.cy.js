describe('Gestion des Concerts - CRUD', () => {
  // Configuration de base
  const adminEmail = 'hamdane.khiari@gmail.com'
  const adminPassword = 'Admin123!'
  
  // Utilitaire pour générer un nom unique
  const generateUniqueName = () => `Concert Test ${Date.now()}`

  // Gestion des exceptions
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
  })

  // Connexion et navigation avant chaque test
  beforeEach(() => {
    // Connexion
    cy.visit('http://localhost:3000/admin/login')
    cy.get('input[type="email"]').type(adminEmail)
    cy.get('input[type="password"]').type(adminPassword)
    cy.get('button[type="submit"]').click()

    // Vérification de la connexion et navigation
    cy.url().should('include', '/admin/dashboard')
    cy.contains('Concerts').click()
    cy.url().should('include', '/admin/concerts')
  })

  it('Doit afficher la liste des concerts depuis le backend', () => {
    // Attendre le chargement de la page
    cy.wait(1000)

    // Vérifier que le tableau est visible
    cy.get('table').should('be.visible')

    // Vérifier que le tableau contient des lignes
    cy.get('tbody tr').should('have.length.greaterThan', 0)

    // Vérifier les en-têtes du tableau
    cy.get('thead th').should('contain', 'Nom')
    cy.get('thead th').should('contain', 'Date')
    cy.get('thead th').should('contain', 'Horaires')
    cy.get('thead th').should('contain', 'Lieu')
    cy.get('thead th').should('contain', 'Type')

    // Vérifier que chaque ligne a les colonnes attendues
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').should('have.length', 6) // Nom, Date, Horaires, Lieu, Type, Actions
      
      // Vérifier que chaque colonne n'est pas vide
      cy.wrap($row).find('td').each(($cell) => {
        cy.wrap($cell).invoke('text').should('not.be.empty')
      })
    })
  })

  it('Doit créer un nouveau concert', () => {
    // Générer un nom unique
    const concertName = generateUniqueName()
    
    // Ouvrir le formulaire d'ajout
    cy.contains('Ajouter un Concert').click()

    // Remplir le formulaire
    cy.get('input[placeholder="Nom du concert"]')
      .should('be.visible')
      .type(concertName)

    cy.get('input[placeholder="Lieu"]')
      .should('be.visible')
      .type('Salle de Test')

    cy.get('input[type="date"]')
      .should('be.visible')
      .type('2025-09-15')

    cy.get('input[type="time"]').eq(0)
      .should('be.visible')
      .type('19:30')

    cy.get('input[type="time"]').eq(1)
      .should('be.visible')
      .type('22:30')

    cy.get('input[placeholder="Type de concert"]')
      .should('be.visible')
      .type('Rock')

    cy.get('textarea')
      .should('be.visible')
      .type('Description de test')
    
    // Soumettre le formulaire
    cy.get('form button[type="submit"]').click()
    
    // Vérifier le résultat
    cy.contains(concertName).should('be.visible')
  })

  it('Doit modifier un concert existant', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Sélectionner le premier concert
    cy.get('tbody tr').first().find('button').contains('Modifier').click()

    // Générer un nouveau nom
    const newConcertName = generateUniqueName()
    
    // Modifier le nom du concert
    cy.get('input[placeholder="Nom du concert"]')
      .should('be.visible')
      .clear()
      .type(newConcertName)
    
    // Soumettre le formulaire
    cy.get('form button[type="submit"]').click()
    
    // Vérifier le résultat
    cy.contains(newConcertName).should('be.visible')
  })

  it('Doit supprimer un concert', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Récupérer le nom du premier concert
    cy.get('tbody tr').first().find('td').eq(0).invoke('text').then((text) => {
      const concertName = text.trim()
      
      // Supprimer le concert
      cy.get('tbody tr').first().find('button').contains('Supprimer').click()
      
      // Confirmer la suppression
      cy.on('window:confirm', () => true)
      
      // Vérifier la suppression
      cy.wait(1000)
      cy.contains(concertName).should('not.exist')
    })
  })
})