describe('Gestion des Actualités - CRUD', () => {
  // Configuration de base
  const adminEmail = 'hamdane.khiari@gmail.com'
  const adminPassword = 'Admin123!'
  
  // Utilitaire pour générer un titre unique
  const generateUniqueTitle = () => `Actualité Test ${Date.now()}`

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
    cy.contains('Actualités').click()
    cy.url().should('include', '/admin/news')
  })

  it('Doit afficher la liste des actualités depuis le backend', () => {
    // Attendre le chargement de la page
    cy.wait(1000)
  
    // Vérifier que le tableau est visible
    cy.get('table').should('be.visible')
  
    // Vérifier que le tableau contient des lignes
    cy.get('tbody tr').should('have.length.greaterThan', 0)
  
    // Vérifier les en-têtes du tableau
    cy.get('thead th').should('contain', 'Titre')
    cy.get('thead th').should('contain', 'Catégorie')
    cy.get('thead th').should('contain', 'Importance')
  
    // Vérifier que chaque ligne a les colonnes attendues
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').should('have.length', 4) // Titre, Catégorie, Importance, Actions
      
      // Vérifier que chaque colonne n'est pas vide
      cy.wrap($row).find('td').each(($cell) => {
        cy.wrap($cell).invoke('text').should('not.be.empty')
      })
    })
  })
  
  it('Doit créer une nouvelle actualité', () => {
    // Générer un titre unique
    const newsTitle = generateUniqueTitle()

    // Ouvrir le formulaire d'ajout
    cy.contains('Ajouter une Actualité').click()

    // Remplir le formulaire
    cy.get('input[placeholder="Titre de l\'actualité"]')
      .should('be.visible')
      .type(newsTitle)

    cy.get('select').eq(0) // Catégorie
      .should('be.visible')
      .select('Festival')

    cy.get('select').eq(1) // Importance
      .should('be.visible')
      .select('Moyenne')

    cy.get('textarea')
      .should('be.visible')
      .type('Description détaillée pour le test de création d\'actualité')

    // Soumettre le formulaire
    cy.get('form button[type="submit"]').click()

    // Vérifier la création
    cy.contains(newsTitle).should('be.visible')
  })

  it('Doit modifier une actualité existante', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Sélectionner la première actualité
    cy.get('tbody tr').first().find('button').contains('Modifier').click()

    // Générer un nouveau titre
    const newTitle = generateUniqueTitle()

    // Modifier le titre
    cy.get('input[placeholder="Titre de l\'actualité"]')
      .should('be.visible')
      .clear()
      .type(newTitle)

    // Soumettre la modification
    cy.get('form button[type="submit"]').click()

    // Vérifier le nouveau titre
    cy.contains(newTitle).should('be.visible')
  })

  it('Doit supprimer une actualité', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Récupérer le titre de la première actualité
    cy.get('tbody tr').first().find('td').eq(0).invoke('text').then((title) => {
      // Supprimer l'actualité
      cy.get('tbody tr').first().find('button').contains('Supprimer').click()

      // Confirmer la suppression
      cy.on('window:confirm', () => true)

      // Vérifier la suppression
      cy.wait(1000)
      cy.contains(title).should('not.exist')
    })
  })
})