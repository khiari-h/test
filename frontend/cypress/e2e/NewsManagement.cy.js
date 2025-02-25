describe('Gestion des Actualités', () => {
    beforeEach(() => {
      // Simuler une connexion et accéder à la page de gestion des actualités
      cy.visit('http://localhost:3000/admin/login')
      cy.get('input[type="email"]').type('admin@example.com')
      cy.get('input[type="password"]').type('motdepasse123')
      cy.get('button[type="submit"]').click()
      cy.visit('/admin/news')
    })
  
    it('Doit charger la page de gestion des actualités', () => {
      cy.get('h1').contains('Gestion des Actualités').should('be.visible')
      cy.get('table').should('be.visible')
      cy.get('button').contains('Ajouter une Actualité').should('be.visible')
    })
  
    it('Doit ouvrir le formulaire d\'ajout d\'actualité', () => {
      cy.contains('Ajouter une Actualité').click()
      
      // Vérifier la présence des champs du formulaire
      cy.get('input[placeholder="Titre de l\'actualité"]').should('be.visible')
      cy.get('select').contains('Catégorie').should('be.visible')
      cy.get('select').contains('Importance').should('be.visible')
      cy.get('textarea[placeholder="Description de l\'actualité"]').should('be.visible')
    })
  
    it('Doit ajouter une nouvelle actualité', () => {
      cy.contains('Ajouter une Actualité').click()
      
      // Remplir le formulaire
      cy.get('input[placeholder="Titre de l\'actualité"]').type('Actualité de Test')
      
      // Sélectionner la catégorie
      cy.get('select').eq(0).select('Concert')
      
      // Sélectionner l'importance
      cy.get('select').eq(1).select('Moyenne')
      
      // Ajouter une description
      cy.get('textarea[placeholder="Description de l\'actualité"]').type('Description détaillée de l\'actualité de test')
      
      // Soumettre le formulaire
      cy.get('button').contains('Enregistrer').click()
      
      // Vérifier l'ajout dans le tableau
      cy.get('table').contains('Actualité de Test').should('be.visible')
    })
  
    it('Doit permettre la suppression d\'une actualité', () => {
      // Intercepter la requête de suppression
      cy.intercept('DELETE', '/api/news/*').as('deleteNews')
      
      // Trouver et supprimer la première actualité
      cy.get('table tbody tr').first().then(($row) => {
        const newsTitle = $row.find('td:first').text()
        
        // Cliquer sur le bouton Supprimer
        cy.wrap($row).find('button').contains('Supprimer').click()
        
        // Attendre la suppression
        cy.wait('@deleteNews')
        
        // Vérifier que l'actualité n'est plus dans la liste
        cy.get('table').should('not.contain', newsTitle)
      })
    })
  
    it('Doit afficher un message d\'erreur pour un formulaire incomplet', () => {
      cy.contains('Ajouter une Actualité').click()
      
      // Tenter de soumettre un formulaire vide
      cy.get('button').contains('Enregistrer').click()
      
      // Vérifier les contraintes de validation HTML5
      cy.get('input[placeholder="Titre de l\'actualité"]:invalid').should('exist')
      cy.get('select:invalid').should('exist')
      cy.get('textarea[placeholder="Description de l\'actualité"]:invalid').should('exist')
    })
  })
