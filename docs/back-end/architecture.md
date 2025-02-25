# Architecture

## Vue d'ensemble

Ce projet est une application web développée avec **React** pour le front-end et **Laravel** pour le back-end, avec une base de données **MySQL** pour la gestion des données. L'architecture est monolithique, avec une séparation claire entre le front-end et le back-end. Le front-end récupère les données via une API REST exposée par le back-end. Une particularité du projet est l'utilisation d'un CMS WordPress pour la gestion des contenus relatifs aux concerts, artistes, et partenaires, mais les données transitent d'abord par le back-end Laravel pour des raisons de sécurité.

## Front-end (React)

- **Atomic Design :**
  - Le front-end est structuré selon les principes du **Atomic Design**, avec une organisation des composants en cinq niveaux :
    - **Atoms** : Les éléments les plus fondamentaux de l'interface, comme les boutons, les champs de texte, etc.
    - **Molecules** : Combinaisons de plusieurs atomes, comme un champ de recherche avec un bouton.
    - **Organisms** : Structures complexes constituées de plusieurs molécules, comme des formulaires complets ou des barres de navigation.
    - **Templates** : Dispositions qui définissent la structure globale d'une page, mais avec des contenus dynamiques.
    - **Pages** : Les pages finales qui regroupent les templates et les composants pour créer les vues du site.
  
- **Gestion du CSS :**
  - Le style est géré via **Tailwind CSS**, un framework de CSS utilitaire qui permet de construire des interfaces rapidement en appliquant des classes directement dans le HTML.
  - Un fichier de configuration `tailwind.config.js` centralise la gestion des couleurs et autres aspects personnalisés du design, garantissant une cohérence à travers toute l'application.

- **Tests :**
  - Des tests unitaires sont réalisés pour les composants via **Jest** et **React Testing Library**.
  - Des tests end-to-end (E2E) sont effectués avec **Cypress** pour simuler des scénarios utilisateurs et vérifier le bon fonctionnement de l'application.

- **Routing :**
  - La navigation entre les différentes pages est gérée par **React Router**, permettant un contrôle fluide de la navigation dans l'application.

## Back-end (Laravel)

- **API REST :**
  - Le back-end expose une API REST qui permet au front-end de récupérer les actualités, de gérer les inscriptions à la newsletter et aux événements, et de récupérer les données provenant du CMS WordPress.
  
- **Intégration avec WordPress :**
  - Le CMS WordPress est utilisé pour gérer les contenus relatifs aux concerts, artistes, et partenaires. Ces données sont récupérées via des appels API à WordPress, mais passent d'abord par le back-end Laravel avant d'être envoyées au front-end, assurant ainsi un contrôle de sécurité supplémentaire et une cohérence dans les réponses.
  
- **Structure du code :**
  - Le code Laravel est organisé en suivant le pattern MVC (Modèle-Vue-Contrôleur).
  - Les routes de l'application sont définies dans le fichier `routes/web.php`, avec une séparation logique entre les différentes fonctionnalités (ex. News, WordPress).
  - Le middleware est utilisé pour appliquer des règles de sécurité, comme le `ContentSecurityPolicy` qui restreint les sources autorisées pour les scripts, styles, et images.

## Base de données (MySQL)

- **Modèle de données :**
  - La structure de la base de données est définie par les migrations Laravel, et les relations entre les différentes tables sont gérées via l'ORM Eloquent.
  - Les informations concernant la structure des données (MCD, MLD, MPD) sont documentées dans le répertoire `/database/`.

## Interactions Front-end/Back-end

- **API REST :**
  - Le front-end interagit avec le back-end via des appels API pour récupérer les actualités, les informations sur les concerts, les artistes, et les partenaires. Ces données sont renvoyées au front-end sous forme de JSON.

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
  - Les requêtes CORS sont configurées pour permettre au front-end (hébergé sur un domaine différent) de communiquer avec le back-end tout en restreignant les origines non autorisées.
  - Un test vérifie que les requêtes provenant du front-end sont correctement autorisées, tandis que les autres sont bloquées.

## Mises à jour et Maintenance

- **Mise à jour des dépendances :**
  - Les dépendances utilisées dans le projet, tant pour le front-end que pour le back-end, sont régulièrement mises à jour pour bénéficier des dernières corrections de sécurité.
  - Une surveillance active des vulnérabilités connues (via des outils comme **npm audit** ou **Composer Security Checker**) est mise en place pour prévenir les risques.
