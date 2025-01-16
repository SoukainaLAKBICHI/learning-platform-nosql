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
  try {
    // Crée une instance du client Redis
    redisClient = redis.createClient({
      url: config.redisUrl, 
    });

    // Écoute les événements pour détecter les erreurs
    redisClient.on('error', (err) => {
      console.error('Erreur de connexion Redis:', err.message);
    });

    // Connexion au serveur Redis
    await redisClient.connect();

    console.log('Connexion à Redis réussie');
    return redisClient; 
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion à Redis:', error.message);

   
  }
}

function closeConnections() {
  if (mongoClient) {
    mongoClient.close().then(() => console.log('MongoDB connection closed.'));
  }
  if (redisClient) {
    redisClient.quit().then(() => console.log('Redis connection closed.'));
  }
}

// Handle process termination
process.on('SIGINT', () => {
  closeConnections();
  process.exit(0);
});

process.on('SIGTERM', () => {
  closeConnections();
  process.exit(0);
});

// Export connections and database
module.exports = {
  connectMongo,
  connectRedis,
  getMongoDb: () => db,
  getRedisClient: () => redisClient,
};