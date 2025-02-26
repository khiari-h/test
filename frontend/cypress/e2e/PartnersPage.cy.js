describe('Page Partenaires - Tests Complets', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.visit('http://localhost:3000/partenaires');
  });

  it('Doit charger la page des partenaires', () => {
    cy.get('h1').contains('Nos Partenaires').should('be.visible');
    cy.get('.grid').should('be.visible');
    cy.get('.grid > div').should('have.length.greaterThan', 0); // Vérifie qu'il y a des partenaires
  });

  it('Doit permettre le filtrage', () => {
    cy.wait(1000); // Attendre le chargement des données

    // Vérifier que les boutons de filtrage sont présents (au moins le bouton 'Tous')
    cy.get('button').contains('Tous').should('be.visible');
    
    // Appliquer le filtre "Tous"
    cy.get('button').contains('Tous').click();
    cy.wait(500);

    // Vérifier que les partenaires sont toujours affichés après le filtrage
    cy.get('.grid > div').should('have.length.greaterThan', 0);
  });

  it('Doit afficher la pagination uniquement si plus de 6 éléments sont affichés', () => {
    cy.wait(500); // Attendre le chargement initial

    cy.get('.grid > div').then(($elements) => {
      if ($elements.length > 6) {
        // Vérifier que la pagination est présente
        cy.get('.flex.justify-center').should('be.visible');
      } else {
        // Vérifier que la pagination est absente si moins de 7 éléments
        cy.get('.flex.justify-center').should('not.exist');
      }
    });
  });

});
