describe('Gestion des Rencontres - CRUD', () => {
  // Configuration de base
  const adminEmail = 'hamdane.khiari@gmail.com'
  const adminPassword = 'Admin123!'
  
  // Utilitaire pour générer un titre unique
  const generateUniqueTitle = () => `Rencontre Test ${Date.now()}`

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
    cy.contains('Rencontres').click()
    cy.url().should('include', '/admin/meetings')
  })

  it('Doit afficher la liste des rencontres depuis le backend', () => {
    // Attendre le chargement de la page
    cy.wait(1000)
  
    // Vérifier que le tableau est visible
    cy.get('table').should('be.visible')
  
    // Vérifier que le tableau contient des lignes
    cy.get('tbody tr').should('have.length.greaterThan', 0)
  
    // Vérifier les en-têtes du tableau
    cy.get('thead th').should('contain', 'Titre')
    cy.get('thead th').should('contain', 'Artiste')
    cy.get('thead th').should('contain', 'Date')
    cy.get('thead th').should('contain', 'Horaires')
    cy.get('thead th').should('contain', 'Lieu')
    cy.get('thead th').should('contain', 'Type')
  
    // Vérifier que chaque ligne a les colonnes attendues
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').should('have.length', 7) // Titre, Artiste, Date, Horaires, Lieu, Type, Actions
      
      // Vérifier que chaque colonne n'est pas vide
      cy.wrap($row).find('td').each(($cell) => {
        cy.wrap($cell).invoke('text').should('not.be.empty')
      })
    })
  })
  
  it('Doit créer une nouvelle rencontre', () => {
    // Générer un titre unique
    const meetingTitle = generateUniqueTitle()

    // Ouvrir le formulaire d'ajout
    cy.contains('Ajouter une Rencontre').click()

    // Remplir le formulaire
    cy.get('select').first() // Artiste
      .should('be.visible')
      .select('1')

    cy.get('input[placeholder="Titre de la rencontre"]')
      .should('be.visible')
      .type(meetingTitle)

    cy.get('input[placeholder="Lieu"]')
      .should('be.visible')
      .type('Lieu de test')

    cy.get('input[type="date"]')
      .should('be.visible')
      .type('2024-08-15')

    cy.get('input[type="time"]').first()
      .should('be.visible')
      .type('14:00')

    cy.get('input[type="time"]').last()
      .should('be.visible')
      .type('16:00')

    cy.get('select').last() // Type de rencontre
      .should('be.visible')
      .select('Meet & Greet')

    cy.get('textarea')
      .should('be.visible')
      .type('Description de la rencontre')

    // Soumettre le formulaire
    cy.get('form button[type="submit"]').click()

    // Vérifier la création
    cy.contains(meetingTitle).should('be.visible')
  })

  it('Doit modifier une rencontre existante', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Sélectionner la première rencontre
    cy.get('tbody tr').first().find('button').contains('Modifier').click()

    // Générer un nouveau titre
    const newTitle = generateUniqueTitle()

    // Modifier le titre
    cy.get('input[placeholder="Titre de la rencontre"]')
      .should('be.visible')
      .clear()
      .type(newTitle)

    // Soumettre la modification
    cy.get('form button[type="submit"]').click()

    // Vérifier le nouveau titre
    cy.contains(newTitle).should('be.visible')
  })

  it('Doit supprimer une rencontre', () => {
    // Attendre le chargement
    cy.wait(1000)

    // Récupérer le titre de la première rencontre
    cy.get('tbody tr').first().find('td').eq(0).invoke('text').then((title) => {
      // Supprimer la rencontre
      cy.get('tbody tr').first().find('button').contains('Supprimer').click()

      // Confirmer la suppression
      cy.on('window:confirm', () => true)

      // Vérifier la suppression
      cy.wait(1000)
      cy.contains(title).should('not.exist')
    })
  })
})