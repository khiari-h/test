NationSounds
NationSounds est un projet de festival de musique qui offre des informations complètes sur les concerts, les rencontres avec les artistes, ainsi que les informations pratiques sur le festival. Il comprend également une carte interactive pour se repérer, avec la localisation des scènes et les concerts en cours.

Table des matières
Aperçu
Technologies utilisées
Prérequis
Installation
Démarrage
Tests
Déploiement
Contributions
Licence
Contact
Aperçu
NationSounds est une plateforme dédiée à la gestion et à la présentation des événements d'un festival de musique. Elle permet aux utilisateurs de :

Consulter les concerts et événements à venir.
Obtenir des informations sur les artistes et les rencontres.
Visualiser une carte du festival pour se repérer.
Voir en temps réel les concerts en cours.
Technologies utilisées
Front-end : React.js
Back-end : Laravel
CI/CD : Pipeline d'intégration et déploiement continu (CI/CD)
Node.js : Version 20.11.1
Tests :
Tests de composants : Jest
Tests end-to-end (E2E) : Cypress
Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

Node.js : Version 20.11.1 ou supérieure
npm : Inclut avec Node.js
Git : Pour cloner le dépôt
Installation
Cloner le dépôt

bash
Copier le code
git clone https://github.com/yourusername/NationSounds.git
cd NationSounds
Installer les dépendances

Pour le front-end (React) :

bash
Copier le code
cd frontend
npm install
Pour le back-end (Laravel) :

bash
Copier le code
cd backend
composer install
npm install
Configurer les variables d'environnement

Créez un fichier .env dans les répertoires frontend et backend à partir des exemples .env.example et configurez les variables nécessaires (base de données, API, etc.).

Démarrage
Front-end
bash
Copier le code
cd frontend
npm start
Back-end
bash
Copier le code
cd backend
php artisan serve
Les applications front-end et back-end devraient maintenant être accessibles via http://localhost:3000 pour le front-end et http://localhost:8000 pour le back-end.

Tests
Tests de composants (Jest)
Pour exécuter les tests de composants avec Jest, utilisez :

bash
Copier le code
cd frontend
npm run test
Tests end-to-end (Cypress)
Pour lancer Cypress en mode interactif :

bash
Copier le code
cd frontend
npx cypress open
Pour exécuter Cypress en mode headless (sans interface graphique) :

bash
Copier le code
npx cypress run
Déploiement
Le projet utilise une pipeline CI/CD pour le déploiement automatisé. Assurez-vous que toutes les configurations CI/CD sont correctement définies dans les workflows GitHub Actions ou dans un autre outil d'intégration continue que vous utilisez.

Contributions
Les contributions sont les bienvenues ! Pour contribuer :

Fork le projet.
Créez une branche pour votre fonctionnalité (git checkout -b feature/your-feature).
Commitez vos modifications (git commit -m 'Add some feature').
Poussez vers la branche (git push origin feature/your-feature).
Ouvrez une Pull Request.
Licence
Ce projet est sous licence libre classique. Vous êtes libre de l'utiliser, le modifier, et le distribuer sous les conditions de cette licence.

Contact
Pour toute question ou support, vous pouvez contacter Hamdane KHIARI.