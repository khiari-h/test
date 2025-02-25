import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // URL du backend Laravel
  withCredentials: true, // Important pour CSRF et cookies
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur de requêtes
instance.interceptors.request.use(
  config => {
    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// Intercepteur de réponses
instance.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs globales
    if (error.response) {
      // Erreurs de réponse du serveur
      switch (error.response.status) {
        case 401: // Non autorisé
          localStorage.removeItem('admin_token');
          window.location.href = '/admin/login';
          break;
        case 403: // Forbidden
          console.error('Accès refusé');
          break;
        case 404: // Ressource non trouvée
          console.error('Ressource non trouvée');
          break;
        case 500: // Erreur serveur
          console.error('Erreur interne du serveur');
          break;
        default:
          console.error('Erreur Axios:', error.response.data || error.message);
      }
    } else if (error.request) {
      // Erreurs de requête (pas de réponse du serveur)
      console.error('Pas de réponse du serveur');
    } else {
      // Erreurs de configuration de la requête
      console.error('Erreur de configuration de la requête:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default instance;