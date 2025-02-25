# Documentation de l'API

## 1. NewsController

### GET /api/news

**Description** : Récupère toutes les actualités.

**Réponse** :
- **200 OK** : Liste des actualités.
```json
[
    {
        "id": 1,
        "title": "Titre de l'actualité",
        "description": "Description de l'actualité",
        "category": "Catégorie",
        "importance": 5,
        ...
    },
    ...
]
GET /api/news/{id}
Description : Récupère une actualité spécifique.

Paramètres :

id : ID de l'actualité à récupérer.
Réponse :

200 OK : Détails de l'actualité.
404 Not Found : L'actualité n'a pas été trouvée.
POST /api/news
Description : Crée une nouvelle actualité.

Paramètres :

title : Titre de l'actualité (obligatoire).
description : Description de l'actualité (obligatoire).
category : Catégorie de l'actualité (obligatoire).
image : URL de l'image associée (facultatif).
Réponse :

201 Created : L'actualité a été créée avec succès.
422 Unprocessable Entity : Erreur de validation.
PUT /api/news/{id}
Description : Met à jour une actualité existante.

Paramètres :

id : ID de l'actualité à mettre à jour.
title : Titre de l'actualité (facultatif).
description : Description de l'actualité (facultatif).
category : Catégorie de l'actualité (facultatif).
image : URL de l'image associée (facultatif).
Réponse :

200 OK : L'actualité a été mise à jour.
404 Not Found : L'actualité n'a pas été trouvée.
DELETE /api/news/{id}
Description : Supprime une actualité.

Paramètres :

id : ID de l'actualité à supprimer.
Réponse :

200 OK : L'actualité a été supprimée.
404 Not Found : L'actualité n'a pas été trouvée.
2. NewsletterController
POST /api/newsletter
Description : Inscrit un utilisateur à la newsletter.

Paramètres :

first_name : Prénom de l'utilisateur (obligatoire).
last_name : Nom de l'utilisateur (obligatoire).
email : Adresse email de l'utilisateur (obligatoire, unique).
Réponse :

200 OK : Inscription réussie.
422 Unprocessable Entity : Erreur de validation.
3. RegistrationController
POST /api/register
Description : Inscrit un participant à un événement.

Paramètres :

first_name : Prénom du participant (obligatoire).
last_name : Nom du participant (obligatoire).
email : Adresse email du participant (obligatoire, unique).
event_id : ID de l'événement auquel le participant s'inscrit (obligatoire).
Réponse :

201 Created : Inscription réussie.
409 Conflict : Participant déjà inscrit à cet événement.
422 Unprocessable Entity : Erreur de validation.
4. WordpressController
GET /api/wordpress/points-interets
Description : Récupère les points d'intérêt depuis WordPress.

Réponse :

200 OK : Liste des points d'intérêt.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/artists_meetings
Description : Récupère les rencontres avec les artistes depuis WordPress.

Réponse :

200 OK : Liste des rencontres avec les artistes.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/concerts
Description : Récupère les concerts depuis WordPress.

Réponse :

200 OK : Liste des concerts.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/partners
Description : Récupère les partenaires depuis WordPress, avec leurs médias associés.

Réponse :

200 OK : Liste des partenaires.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/media/{mediaId}
Description : Récupère un média spécifique depuis WordPress.

Paramètres :

mediaId : ID du média à récupérer.
Réponse :

200 OK : Détails du média.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/programming-homepage
Description : Récupère les données de la page d'accueil de la programmation.

Réponse :

200 OK : Données de la page d'accueil de la programmation.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/concerts-homepage
Description : Récupère les concerts pour la page d'accueil des concerts.

Réponse :

200 OK : Liste des concerts pour la page d'accueil.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/concert-names
Description : Récupère les noms des concerts.

Réponse :

200 OK : Liste des noms des concerts.
500 Internal Server Error : Erreur lors de la récupération.
GET /api/wordpress/artist-meeting-names
Description : Récupère les noms des rencontres avec les artistes.

Réponse :

200 OK : Liste des noms des rencontres avec les artistes.
500 Internal Server Error : Erreur lors de la récupération.