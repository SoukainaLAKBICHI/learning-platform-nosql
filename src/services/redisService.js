// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est essentiel d'utiliser des clés bien structurées, de définir des TTL appropriés pour éviter l'expiration excessive ou le stockage inutile, et de surveiller régulièrement les performances et l'utilisation du cache.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés explicites et structurés (par exemple, `namespace:resource:id`), la limitation de la taille des clés, l'évitement de caractères spéciaux, et l'organisation logique pour faciliter leur gestion et leur recherche.

const redis = require('redis');
const config = require('../config/env');

let redisClient;

/**
 * Initialise le client Redis et se connecte au serveur Redis.
 */
async function connectRedis() {
  redisClient = redis.createClient({ url: config.redis.uri });

  redisClient.on('error', (err) => {
    console.error('Erreur de connexion Redis :', err);
  });

  await redisClient.connect();
  console.log('Connecté à Redis');
}

/**
 * Mettre en cache des données dans Redis avec un TTL (Time-to-Live) spécifié.
 * @param {string} key - La clé Redis.
 * @param {any} data - Les données à mettre en cache (seront converties en chaîne JSON).
 * @param {number} ttl - Durée de vie en secondes.
 */
async function cacheData(key, data, ttl) {
  try {
    const serializedData = JSON.stringify(data);
    await redisClient.set(key, serializedData, { EX: ttl });
    console.log(`Données mises en cache pour la clé : ${key}`);
  } catch (error) {
    console.error(`Échec de la mise en cache des données pour la clé : ${key}`, error);
  }
}

/**
 * Récupérer des données mises en cache dans Redis.
 * @param {string} key - La clé Redis.
 * @returns {Promise<any>} - Les données mises en cache ou null si la clé n'existe pas.
 */
async function getCachedData(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Échec de la récupération des données pour la clé : ${key}`, error);
    return null;
  }
}

/**
 * Supprimer les données mises en cache par clé.
 * @param {string} key - La clé Redis à supprimer.
 */
async function deleteCache(key) {
  try {
    await redisClient.del(key);
    console.log(`Cache supprimé pour la clé : ${key}`);
  } catch (error) {
    console.error(`Échec de la suppression du cache pour la clé : ${key}`, error);
  }
}

/**
 * Fermer la connexion Redis proprement.
 */
async function closeRedis() {
  if (redisClient) {
    await redisClient.quit();
    console.log('Connexion Redis fermée');
  }
}

// Exporter les fonctions utilitaires
module.exports = {
  connectRedis,
  cacheData,
  getCachedData,
  deleteCache,
  closeRedis,
};
