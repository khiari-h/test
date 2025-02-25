# Style Guide

Ce document décrit les configurations et personnalisations de Tailwind CSS utilisées dans ce projet. Il sert de guide pour maintenir une cohérence dans les styles à travers l'application front-end.

## Configuration de Tailwind CSS

La configuration de Tailwind CSS est définie dans le fichier `tailwind.config.js`. Voici un aperçu des principales personnalisations apportées au projet.

### Purge

La propriété `purge` est utilisée pour supprimer les classes inutilisées en production, ce qui réduit la taille du fichier CSS généré.

```javascript
purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
Mode sombre
Le mode sombre est désactivé dans ce projet.

javascript
Copier le code
darkMode: false,
Thème
Le thème a été étendu avec plusieurs personnalisations pour répondre aux besoins spécifiques du design de l'application.

Background Image
Une image de fond personnalisée a été ajoutée sous le nom hero-pattern.

javascript
Copier le code
backgroundImage: {
  'hero-pattern': "url('../public/concert2.jpg')",
},
Fonts (Font Family)
Des familles de polices personnalisées ont été définies pour différentes parties de l'application :

concert-title : Utilise Oswald pour les titres.
concert-body : Utilise Roboto pour le corps du texte.
concert-description : Utilise Lora pour les descriptions.
concert-subtitle : Utilise Montserrat pour les sous-titres.
javascript
Copier le code
fontFamily: {
  'concert-title': ['Oswald', 'sans-serif'],
  'concert-body': ['Roboto', 'sans-serif'],
  'concert-description': ['Lora', 'serif'],
  'concert-subtitle': ['Montserrat', 'sans-serif'],
},
Height (Hauteur)
Une hauteur personnalisée a été ajoutée sous le nom 1/2-screen pour définir des sections prenant la moitié de la hauteur de l'écran.

javascript
Copier le code
height: {
  '1/2-screen': '50vh',
},
Couleurs
Une palette de couleurs personnalisée a été définie pour répondre aux besoins esthétiques du projet. Voici les couleurs disponibles :

concert-bg-beige : #FAF0E6 - Beige utilisé en arrière-plan.
gray-800 : #2D3748 - Gris foncé utilisé pour les textes ou fonds.
light-blue : #3B82F6 - Bleu clair utilisé pour des accents ou des liens.
pure-blue : #0000FF - Bleu pur utilisé pour des accents.
error-red : #b71c1c - Rouge utilisé pour les messages d'erreur.
white : #ffffff - Blanc utilisé pour les fonds et les textes.
black : #000000 - Noir utilisé pour les textes ou fonds.
custom-yellow-500 : #FCD34D - Jaune utilisé pour les boutons ou accents.
custom-gray : #f0f0f0 - Gris clair utilisé pour les fonds.
border-gray : #D1D5DB - Gris utilisé pour les bordures.
bg-green-300 : #9AE3B2 - Vert utilisé pour les arrière-plans d'éléments.
text-green-500 : #22c55e - Vert utilisé pour les textes.
text-gray-400 : #9ca3af - Gris utilisé pour les textes.
javascript
Copier le code
colors: {
  'concert-bg-beige': '#FAF0E6',
  'gray-800': '#2D3748',
  'light-blue': '#3B82F6',
  'pure-blue': '#0000FF',
  'error-red': '#b71c1c',
  'white': '#ffffff',
  'black': '#000000',
  'custom-yellow-500': '#FCD34D',
  'custom-gray': '#f0f0f0',
  'border-gray': '#D1D5DB',
  'bg-green-300':'#9AE3B2',
  'text-green-500':'#22c55e',
  'text-gray-400':'#9ca3af'
},
Variants
La propriété variants permet d'étendre les variantes pour certains utilitaires. Dans cette configuration, aucune variante supplémentaire n'a été définie.

javascript
Copier le code
variants: {
  extend: {},
},
Plugins
Aucun plugin supplémentaire n'a été ajouté à cette configuration.

javascript
Copier le code
plugins: [],
Utilisation des Styles
Les classes définies dans cette configuration de Tailwind peuvent être utilisées directement dans les fichiers JSX de l'application pour appliquer les styles correspondants.

Exemple :

jsx
Copier le code
<div className="bg-concert-bg-beige font-concert-title h-1/2-screen">
  <h1 className="text-pure-blue">Bienvenue au concert</h1>
</div>
Cet exemple applique un fond beige, utilise la police Oswald pour le titre, et définit une hauteur de 50% de l'écran.