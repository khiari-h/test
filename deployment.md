# Guide de Déploiement

Ce document décrit les étapes nécessaires pour déployer le projet sur un serveur de production. Assurez-vous de suivre attentivement chaque étape pour garantir un déploiement réussi.

## Pré-requis

Avant de commencer, assurez-vous que votre serveur de production dispose des éléments suivants :

- **Système d'exploitation** : Linux (Ubuntu, Debian, etc.)
- **Serveur web** : Nginx ou Apache
- **PHP** : Version 8.0 ou supérieure
- **MySQL** : Version 5.7 ou supérieure
- **Node.js** : Version 14.x ou supérieure
- **Composer** : Dernière version
- **Git** : Dernière version
- **Certificat SSL** : Pour HTTPS

## Configuration de l'environnement

1. **Cloner le dépôt** :

   Connectez-vous à votre serveur et naviguez vers le répertoire où vous souhaitez déployer l'application.

   ```bash
   git clone https://github.com/votre-repo/nom-du-projet.git
   cd nom-du-projet
Installer les dépendances PHP :

Utilisez Composer pour installer les dépendances Laravel.

bash
Copier le code
composer install --optimize-autoloader --no-dev
Installer les dépendances Node.js :

Installez les dépendances front-end via npm et compilez les assets.

bash
Copier le code
npm install
npm run build
Configurer l'environnement :

Copiez le fichier .env.example en .env et modifiez-le pour correspondre à votre environnement de production.

bash
Copier le code
cp .env.example .env
Mettez à jour les variables d'environnement suivantes dans le fichier .env :

APP_ENV : production
APP_DEBUG : false
DB_HOST : Adresse de votre serveur MySQL
DB_DATABASE : Nom de la base de données
DB_USERNAME : Nom d'utilisateur MySQL
DB_PASSWORD : Mot de passe MySQL
API_KEYS : Clés API nécessaires pour les services externes
WORDPRESS_API_URL : URL de l'API WordPress
Ensuite, générez la clé d'application Laravel :

bash
Copier le code
php artisan key:generate
Configurer le serveur web :

Si vous utilisez Nginx, voici un exemple de configuration pour votre site :

nginx
Copier le code
server {
    listen 80;
    server_name votre-domaine.com;
    root /chemin/vers/nom-du-projet/public;

    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
Pour Apache, assurez-vous que le mod_rewrite est activé et que votre fichier .htaccess est configuré pour rediriger toutes les requêtes vers index.php.

Configurer la base de données :

Créez la base de données MySQL et exécutez les migrations Laravel.

bash
Copier le code
mysql -u root -p
CREATE DATABASE nom_de_la_base_de_donnees;
exit

php artisan migrate --force
php artisan db:seed --force # Si vous avez des seeders
Commandes de Déploiement
Après avoir configuré l'environnement, exécutez les commandes suivantes pour optimiser et sécuriser l'application en production :

bash
Copier le code
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
Ces commandes vont mettre en cache les configurations, les routes et les vues pour améliorer les performances.

Considérations de sécurité
Désactiver le mode debug :

Assurez-vous que le mode debug est désactivé en production (APP_DEBUG=false dans le fichier .env).

Configurer les permissions :

Assurez-vous que les répertoires storage et bootstrap/cache sont accessibles en écriture par le serveur web.

bash
Copier le code
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
Configurer HTTPS :

Utilisez un certificat SSL pour sécuriser les communications entre les utilisateurs et le serveur. Vous pouvez obtenir un certificat gratuit avec Let’s Encrypt et le configurer via Certbot.

bash
Copier le code
sudo certbot --nginx -d votre-domaine.com
Logs et Monitoring :

Assurez-vous que les logs sont configurés correctement pour suivre les erreurs et les accès. Utilisez des outils de monitoring comme Sentry ou Loggly pour suivre les erreurs en production.

Mise à jour et maintenance
Mettre à jour l'application :

Pour mettre à jour l'application, tirez les dernières modifications du dépôt, installez les nouvelles dépendances, et exécutez les migrations si nécessaire.

bash
Copier le code
git pull origin main
composer install --no-dev
npm install
npm run build
php artisan migrate --force
Sauvegardes :

Avant d'effectuer des mises à jour ou des modifications majeures, effectuez une sauvegarde complète de la base de données et des fichiers de l'application.

bash
Copier le code
mysqldump -u root -p nom_de_la_base_de_donnees > backup.sql
tar -czvf backup.tar.gz /chemin/vers/nom-du-projet
Gestion des dépendances :

Surveillez les vulnérabilités des dépendances et mettez à jour régulièrement les packages avec Composer et npm. Utilisez npm audit et composer audit pour vérifier les vulnérabilités.