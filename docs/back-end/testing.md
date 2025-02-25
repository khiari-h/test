# Documentation des Tests

Ce projet utilise une suite de tests pour garantir la qualité et la stabilité du code. Les tests couvrent les services, les contrôleurs, et les modèles, en utilisant des tests unitaires, d'intégration, et end-to-end.

## Outils de Test Utilisés

- **PHPUnit** : Pour les tests unitaires et d'intégration côté back-end (Laravel).
- **Jest** et **React Testing Library** : Pour les tests unitaires côté front-end (React).
- **Cypress** : Pour les tests end-to-end (E2E).

## Couverture des Tests

### Services
- Tests unitaires vérifiant la logique des services, y compris les intégrations avec des API externes (ex. : récupération des données du CMS WordPress).

### Contrôleurs
- Tests d'intégration pour s'assurer que les contrôleurs renvoient les réponses appropriées pour les requêtes API.
- Tests de validation des entrées pour vérifier que les données utilisateur sont correctement traitées.

### Modèles
- Tests unitaires pour vérifier la validité des relations entre les modèles (ORM Eloquent) et les interactions avec la base de données.

## Exécution des Tests

Pour exécuter les tests, utilisez les commandes suivantes dans votre terminal :

### Back-end (Laravel)
```bash
php artisan test
Front-end (React)
bash
Copier le code
npm run test
Tests End-to-End (Cypress)
bash
Copier le code
npx cypress open