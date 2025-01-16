Learning-platform-nosql
Ce projet est une plateforme centrée sur l'éducation utilisant MongoDB, Redis, et Node.js pour une meilleure gestion des données.

🛠️ Installation et lancement du projet
Prérequis :
Node.js version 14 ou supérieure
MongoDB et Redis installés localement ou accessibles via une URI distante
Étapes d'installation :
Cloner le dépôt :

bash
git clone https://github.com/SoukainaLAKBICHI/learning-platform-nosql
cd learning-platform-nosql
git remote remove origin
git remote add origin https://github.com/SoukainaLAKBICHI/learning-platform-nosql
git push -u origin main
Installation des dépendances :

bash

npm install
📂 Structure du projet
bash

📂 Laerning-Platform
├── 📁 config          # Fichiers de configuration pour MongoDB, Redis, etc.
│   ├── db.js          # Connexions à MongoDB et Redis
│   └── env.js         # Chargement des variables d'environnement
├── 📁 controllers     # Logique métier des API
│   └── courseController.js  # Contrôleurs pour les opérations de l’application
├── 📁 routes          # Définition des routes de l'API
│   └── courseRoutes.js       # Routes pour les opérations principales
├── 📁 services        # Services pour interagir avec MongoDB et Redis
│   ├── mongoService.js       # Fonctions MongoDB
│   └── redisService.js       # Fonctions Redis
├── 📄 package.json     # Dépendances et scripts
├── 📄 package-lock.json # Verrouillage des versions des dépendances
├── 📄 .env     # fichier d'environnement
├── 📄 README.md        # Documentation du projet
└── 📄 app.js        # Point d'entrée de l'application



✨ Choix techniques
MongoDB :
Utilisé pour stocker les données structurées de l'application.

Redis :
Utilisé pour la mise en cache des données afin d’améliorer les performances.

Node.js avec Express :
Permet une configuration rapide et flexible des APIs RESTful.

Postman :
Utilisé pour tester les APIs en local de manière rapide et efficace.

Architecture :
Basée sur une séparation claire entre les routes, les contrôleurs, et les services pour un code maintenable.

❓ Réponses aux questions posées dans les commentaires
Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser la gestion, améliorer la réutilisabilité, faciliter la maintenance, et respecter le principe de séparation des préoccupations.
Question : Comment gérer proprement la fermeture des connexions ?
Réponse : Pour gérer proprement la fermeture des connexions, il est essentiel d'utiliser des blocs try...finally ou des gestionnaires de contexte qui garantissent la fermeture automatique des connexions, même en cas d'erreur.


Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
Réponse : Valider les variables d'environnement au démarrage garantit que l'application dispose des configurations nécessaires, évite les erreurs inattendues, améliore la sécurité, détecte les problèmes tôt, standardise les configurations et simplifie la maintenance.
Question: Que se passe-t-il si une variable requise est manquante ?
Réponse : Si une variable requise est manquante, l'application peut planter, se comporter de manière imprévisible ou échouer à se connecter aux services nécessaires, compromettant ainsi son fonctionnement.


Question: Quelle est la différence entre un contrôleur et une route ?
Réponse: Un contrôleur est une couche logique qui traite les requêtes et gère les traitements métiers, tandis qu'une route définit l'URL qui relie une requête HTTP à un contrôleur ou à une fonction spécifique.
Question : Pourquoi séparer la logique métier des routes ?
Réponse :Séparer la logique métier des routes permet d'améliorer la modularité, la maintenabilité, et de respecter le principe de responsabilité unique en isolant les traitements métiers du traitement des requêtes.


Question: Pourquoi séparer les routes dans différents fichiers ?
Réponse : Séparer les routes dans différents fichiers améliore l'organisation, facilite la lecture du code, et permet une maintenance plus simple en structurant les fonctionnalités par module ou domaine.
Question : Comment organiser les routes de manière cohérente ?
Réponse: Pour organiser les routes de manière cohérente, regroupez-les par fonctionnalité ou domaine dans des fichiers distincts, utilisez des noms explicites pour les fichiers, et centralisez leur importation dans un routeur principal.


Question: Pourquoi créer des services séparés ?
Réponse: Créer des services séparés permet de centraliser la logique métier réutilisable, d'améliorer la modularité, et de faciliter la maintenance et les tests de l'application.


Question : Comment gérer efficacement le cache avec Redis ?
Réponse : Pour gérer efficacement le cache avec Redis, il est essentiel d'utiliser des clés bien structurées, de définir des TTL appropriés pour éviter l'expiration excessive ou le stockage inutile, et de surveiller régulièrement les performances et l'utilisation du cache.
Question: Quelles sont les bonnes pratiques pour les clés Redis ?
Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés explicites et structurés (par exemple, `namespace:resource:id`), la limitation de la taille des clés, l'évitement de caractères spéciaux, et l'organisation logique pour faciliter leur gestion et leur recherche.





