describe('Page Programmation - Tests Complets', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.visit('http://localhost:3000/programmation');
  });

  it('Doit charger la page de programmation avec les bons éléments', () => {
    // Vérifier que le titre de la page est affiché
    cy.get('h1').contains('Programmation du Festival').should('be.visible');
    // Vérifier que les boutons de navigation sont présents
    cy.get('button').contains('Concerts').should('be.visible');
    cy.get('button').contains('Rencontres avec les Artistes').should('be.visible');
  });

  it('Doit basculer entre la section Concerts et Rencontres avec les Artistes', () => {
    // Par défaut, la section "Concerts" doit être affichée
    cy.get('section').within(() => {
      cy.contains('Concerts').should('be.visible');
      // Ici, on peut aussi vérifier un élément spécifique au composant Concerts si nécessaire
      // par exemple : cy.get('.concerts-component').should('exist');
    });

    // Cliquer sur le bouton "Rencontres avec les Artistes"
    cy.get('button').contains('Rencontres avec les Artistes').click();
    cy.wait(500);
    // Vérifier que le contenu de la section change pour afficher "Rencontres avec les Artistes"
    cy.get('section').within(() => {
      cy.contains('Rencontres avec les Artistes').should('be.visible');
      // Optionnel : vérifier un élément spécifique au composant Rencontres avec les Artistes
      // par exemple : cy.get('.artist-meetings-component').should('exist');
    });

    // Optionnel : Revenir sur "Concerts" pour s'assurer que le basculement fonctionne dans les deux sens
    cy.get('button').contains('Concerts').click();
    cy.wait(500);
    cy.get('section').within(() => {
      cy.contains('Concerts').should('be.visible');
    });
  });
});
