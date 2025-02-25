# Documentation des Services

## 1. WordpressService

### getPointsOfInterest

**Description** : Récupère les points d'intérêt depuis l'API WordPress.

**Paramètres** :
- `perPage` : Nombre de points d'intérêt par page (par défaut 20).

**Retourne** : Array contenant les points d'intérêt.

**Exceptions** : Exception si la récupération échoue.

### getArtistsMeetings

**Description** : Récupère les rencontres avec les artistes depuis l'API WordPress.

**Retourne** : Array contenant les rencontres avec les artistes.

**Exceptions** : Exception si la récupération échoue.

### getConcerts

**Description** : Récupère les concerts depuis l'API WordPress.

**Retourne** : Array contenant les concerts.

**Exceptions** : Exception si la récupération échoue.

### getPartnersWithMedia

**Description** : Récupère les partenaires depuis l'API WordPress, avec les médias associés.

**Retourne** : Array contenant les partenaires et leurs médias.

**Exceptions** : Exception si la récupération échoue.

### getMedia

**Description** : Récupère un média spécifique depuis l'API WordPress.

**Paramètres** :
- `mediaId` : ID du média à récupérer.

**Retourne** : Array contenant les détails du média.

**Exceptions** : Exception si la récupération échoue.

### getProgrammingHomepageData

**Description** : Récupère les données de la page d'accueil de la programmation depuis l'API WordPress.

**Retourne** : Array contenant les concerts et les rencontres avec les artistes pour la page d'accueil.

**Exceptions** : Exception si la récupération échoue.

### getConcertsHomepage

**Description** : Récupère une liste limitée de concerts pour la page d'accueil des concerts.

**Paramètres** :
- `limit` : Nombre maximum de concerts à récupérer (par défaut 3).

**Retourne** : Array contenant les concerts.

**Exceptions** : Exception si la récupération échoue.