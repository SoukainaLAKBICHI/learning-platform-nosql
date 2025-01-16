// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Valider les variables d'environnement au démarrage garantit que l'application dispose des configurations nécessaires, évite les erreurs inattendues, améliore la sécurité, détecte les problèmes tôt, standardise les configurations et simplifie la maintenance.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application peut planter, se comporter de manière imprévisible ou échouer à se connecter aux services nécessaires, compromettant ainsi son fonctionnement.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Les variables d'environnement suivantes sont manquantes : ${missingVars.join(', ')}. ` +
      `Veuillez les définir dans le fichier .env ou les variables système.`
    );
  }

  console.log('Toutes les variables d\'environnement requises sont définies.');

}

// Appeler la validation au démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};