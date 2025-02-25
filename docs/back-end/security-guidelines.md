# Security Guidelines

## Authentification et Autorisation

- **Authentification :**
  - Ce projet ne nécessite pas de mécanisme d'authentification utilisateur puisque l'application n'a pas de fonctionnalité de gestion des utilisateurs.

## Protection des données

- **Validation des entrées :**
  - Toutes les entrées utilisateur, comme les inscriptions à la newsletter ou aux événements, sont validées côté serveur pour éviter les soumissions incorrectes ou malveillantes.
  - Les tests sont mis en place pour vérifier que les données sont correctement validées, par exemple en rejetant les emails non valides lors de l'inscription à la newsletter.

- **Protection contre les injections SQL :**
  - Les requêtes SQL sont sécurisées via l'ORM Eloquent de Laravel, qui protège contre les tentatives d'injection SQL.
  - Un test spécifique vérifie que les tentatives d'injection SQL dans les requêtes de recherche sont correctement neutralisées.

## Sécurité des API

- **Protection contre les attaques XSS :**
  - Les entrées utilisateur sont échappées pour empêcher les attaques XSS (Cross-Site Scripting). Par exemple, les titres des actualités sont vérifiés pour s'assurer qu'ils ne contiennent pas de code JavaScript malveillant.
  - Un test est mis en place pour s'assurer que les scripts insérés par des utilisateurs malveillants sont correctement échappés.

- **Politique de sécurité des contenus (CSP) :**
  - Un middleware `ContentSecurityPolicy` est utilisé pour appliquer une politique de sécurité des contenus. Cela limite les sources de scripts, styles, et images à celles autorisées, réduisant ainsi le risque d'attaques XSS.

## Sécurisation du CMS WordPress

- **Contrôle des accès :**
  - Les données provenant de WordPress transitent par le back-end Laravel avant d'être renvoyées au front-end. Cela permet de contrôler et de sécuriser les accès, et d'appliquer des règles de sécurité supplémentaires.

## Sécurisation des communications

- **CORS (Cross-Origin Resource Sharing) :**
  - Les requêtes CORS sont configurées pour permettre au front-end de communiquer avec le back-end tout en restreignant les origines non autorisées.
  - Un test vérifie que les requêtes provenant du front-end sont correctement autorisées, tandis que les autres sont bloquées.

## Mises à jour et Maintenance

- **Mise à jour des dépendances :**
  - Les dépendances utilisées dans le projet, tant pour le front-end que pour le back-end, sont régulièrement mises à jour pour bénéficier des dernières corrections de sécurité.
  - Une surveillance active des vulnérabilités connues (via des outils comme **npm audit** ou **Composer Security Checker**) est mise en place pour prévenir les risques.
