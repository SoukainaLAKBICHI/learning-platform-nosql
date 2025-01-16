// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser la gestion, améliorer la réutilisabilité, faciliter la maintenance, et respecter le principe de séparation des préoccupations.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est essentiel d'utiliser des blocs try...finally ou des gestionnaires de contexte qui garantissent la fermeture automatique des connexions, même en cas d'erreur.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    // Crée une instance du client MongoDB
    mongoClient = new MongoClient(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connexion à la base de données
    await mongoClient.connect();

    // Affecte l'objet de la base de données
    db = mongoClient.db(config.mongoDbName); 
    console.log('Connexion à MongoDB réussie');
    return db; 
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
};