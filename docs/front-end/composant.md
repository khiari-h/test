# Documentation des Composants

Cette section documente l'organisation des composants dans le projet, en suivant une approche basée sur Atomic Design. Les composants sont organisés en plusieurs catégories, allant des éléments les plus simples (Atoms) aux structures les plus complexes (Pages et Templates).

## Structure des Composants

Les composants sont divisés en plusieurs niveaux selon leur complexité et leur rôle dans l'application :

### 1. Atoms
Les Atoms sont les éléments les plus fondamentaux de l'interface utilisateur. Ils représentent les blocs de construction de base, tels que les boutons, les images, ou les éléments de texte.

- **Button.jsx** : Un bouton générique, utilisé dans diverses parties de l'application.
- **Filter.jsx** : Un composant de filtre utilisé pour affiner les résultats affichés.
- **GeolocationButton.jsx** : Un bouton permettant d'activer la géolocalisation.
- **Image.jsx** : Un composant d'image générique.
- **Text.jsx** : Un composant de texte de base.

### 2. Molecules
Les Molecules sont des combinaisons de plusieurs Atoms. Elles forment des ensembles plus complexes qui réalisent une fonctionnalité spécifique.

- **Accordion.jsx** : Un composant accordéon permettant de cacher/montrer du contenu.
- **CTASection.jsx** : Une section d'appel à l'action, combinant texte et bouton.
- **InfoCard.jsx** : Une carte d'information combinant texte et image.
- **NavItem.jsx** : Un élément de navigation, utilisé dans les menus.
- **NewsCard.jsx** : Une carte d'actualités affichant un titre, une image, et un résumé.
- **PartnersCard.jsx** : Une carte présentant un partenaire, avec logo et description.
- **RegisterForm.jsx** : Un formulaire d'inscription.

### 3. Organisms
Les Organisms sont des assemblages complexes de Molecules et d'Atoms. Ils constituent des parties autonomes de l'interface utilisateur.

- **ArtistMeeting.jsx** : Un organisme affichant les détails des rencontres avec des artistes.
- **ConcertProgramming.jsx** : Un organisme pour la programmation des concerts.
- **ConcertsOverview.jsx** : Une vue d'ensemble des concerts disponibles.
- **Footer.jsx** : Le pied de page de l'application, combinant plusieurs liens et informations.
- **Header.jsx** : L'en-tête de l'application, contenant le logo, la navigation, et d'autres éléments interactifs.
- **HeroSection.jsx** : Une section héroïque en haut de la page d'accueil, contenant un texte accrocheur et une image.
- **Map.jsx** : Une carte interactive pour afficher des emplacements géographiques.
- **NewsAndUpdates.jsx** : Une section pour les dernières nouvelles et mises à jour.
- **PracticalInfo.jsx** : Une section pour les informations pratiques relatives aux événements.
- **ProgrammingOverview.jsx** : Une vue d'ensemble de la programmation, combinant plusieurs sous-sections.

### 4. Pages
Les Pages sont des vues complètes qui regroupent plusieurs Organisms et Molecules pour former une page complète de l'application.

- **ConcertsDetailsPage.jsx** : Page détaillant un concert spécifique.
- **HomePage.jsx** : La page d'accueil de l'application.
- **NewsPage.jsx** : Page listant toutes les actualités.
- **PartnersPage.jsx** : Page présentant les partenaires de l'application.
- **ProgrammingPage.jsx** : Page détaillant la programmation des événements.

### 5. Templates
Les Templates définissent la structure de base des Pages. Ils organisent les Organisms et Molecules de manière cohérente pour former des layouts réutilisables.

- **ConcertsDetailsPageTemplate.jsx** : Template pour les pages de détails des concerts.
- **HomePageTemplate.jsx** : Template pour la page d'accueil.
- **NewsPageTemplate.jsx** : Template pour la page des actualités.
- **PartnersPageTemplate.jsx** : Template pour la page des partenaires.
- **ProgrammingPageTemplate.jsx** : Template pour la page de programmation.

---

Cette documentation donne une vue d'ensemble de la structure des composants de l'application. Pour plus de détails sur l'utilisation de chaque composant, vous pouvez consulter les fichiers correspondants dans le répertoire `src/components/`.
