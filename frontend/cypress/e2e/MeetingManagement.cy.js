describe('Gestion des Rencontres Artistes', () => {
    beforeEach(() => {
      // Simuler une connexion et accéder à la page de gestion des rencontres
      cy.visit('http://localhost:3000/admin/login')
      cy.get('input[type="email"]').type('admin@example.com')
      cy.get('input[type="password"]').type('motdepasse123')
      cy.get('button[type="submit"]').click()
      cy.visit('/admin/meetings')
    })
  
    it('Doit charger la page de gestion des rencontres', () => {
      cy.get('h1').contains('Gestion des Rencontres Artistes').should('be.visible')
      cy.get('table').should('be.visible')
      cy.get('button').contains('Ajouter une Rencontre').should('be.visible')
    })
  
    it('Doit ouvrir le formulaire d\'ajout de rencontre', () => {
      cy.contains('Ajouter une Rencontre').click()
      
      // Vérifier la présence des champs du formulaire
      cy.get('select[value=""]').contains('Sélectionner un artiste').should('be.visible')
      cy.get('input[placeholder="Titre de la rencontre"]').should('be.visible')
      cy.get('input[placeholder="Lieu"]').should('be.visible')
      cy.get('input[type="date"]').should('be.visible')
      cy.get('input[type="time"]').should('have.length', 2) // Heure de début et de fin
      cy.get('select[value=""]').contains('Type de rencontre').should('be.visible')
      cy.get('textarea[placeholder="Description"]').should('be.visible')
    })
  
    it('Doit ajouter une nouvelle rencontre', () => {
      cy.contains('Ajouter une Rencontre').click()
      
      // Remplir le formulaire
      // Note : Assurez-vous que la liste des artistes est chargée
      cy.get('select').eq(0).find('option').should('have.length.greaterThan', 1)
      cy.get('select').eq(0).select('1') // Sélectionner le premier artiste
      
      cy.get('input[placeholder="Titre de la rencontre"]').type('Meet & Greet de Test')
      cy.get('input[placeholder="Lieu"]').type('Zone VIP')
      cy.get('input[type="date"]').type('2024-08-16')
      cy.get('input[type="time"]').eq(0).type('18:00') // Heure de début
      cy.get('input[type="time"]').eq(1).type('19:30') // Heure de fin
      cy.get('select').eq(1).select('Meet & Greet')
      cy.get('textarea[placeholder="Description"]').type('Une rencontre exclusive avec nos artistes')
      
      // Soumettre le formulaire
      cy.get('button').contains('Enregistrer').click()
      
      // Vérifier l'ajout dans le tableau
      cy.get('table').contains('Meet & Greet de Test').should('be.visible')
    })
  
    it('Doit permettre la suppression d\'une rencontre', () => {
      // Intercepter la requête de suppression
      cy.intercept('DELETE', '/api/meetings/*').as('deleteMeeting')
      
      // Trouver et supprimer la première rencontre
      cy.get('table tbody tr').first().then(($row) => {
        const meetingTitle = $row.find('td:first').text()
        
        // Cliquer sur le bouton Supprimer
        cy.wrap($row).find('button').contains('Supprimer').click()
        
        // Attendre la suppression
        cy.wait('@deleteMeeting')
        
        // Vérifier que la rencontre n'est plus dans la liste
        cy.get('table').should('not.contain', meetingTitle)
      })
    })
  })