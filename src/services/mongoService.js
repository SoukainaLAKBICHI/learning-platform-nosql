// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de centraliser la logique métier réutilisable, d'améliorer la modularité, et de faciliter la maintenance et les tests de l'application.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
/**
 * Trouver un document unique par son ID.
 * @param {Object} collection - Instance de la collection MongoDB.
 * @param {string} id - ID du document à rechercher.
 * @returns {Promise<Object|null>} - Document trouvé ou null s'il n'est pas trouvé.
 */
async function findOneById(collection, id) {
  try {
    const objectId = new ObjectId(id);
    return await collection.findOne({ _id: objectId });
  } catch (error) {
    throw new Error(`Format d'ID invalide : ${id}`);
  }
}

/**
 * Insérer un nouveau document dans la collection.
 * @param {Object} collection - Instance de la collection MongoDB.
 * @param {Object} document - Document à insérer.
 * @returns {Promise<Object>} - Résultat de l'insertion.
 */
async function insertOne(collection, document) {
  try {
    const result = await collection.insertOne(document);
    return result;
  } catch (error) {
    throw new Error(`Échec de l'insertion du document : ${error.message}`);
  }
}

/**
 * Mettre à jour un document par son ID.
 * @param {Object} collection - Instance de la collection MongoDB.
 * @param {string} id - ID du document à mettre à jour.
 * @param {Object} updates - Modifications à appliquer.
 * @returns {Promise<Object>} - Résultat de l'opération de mise à jour.
 */
async function updateOneById(collection, id, updates) {
  try {
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({ _id: objectId }, { $set: updates });
    return result;
  } catch (error) {
    throw new Error(`Échec de la mise à jour du document avec l'ID ${id} : ${error.message}`);
  }
}

/**
 * Supprimer un document par son ID.
 * @param {Object} collection - Instance de la collection MongoDB.
 * @param {string} id - ID du document à supprimer.
 * @returns {Promise<Object>} - Résultat de l'opération de suppression.
 */
async function deleteOneById(collection, id) {
  try {
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result;
  } catch (error) {
    throw new Error(`Échec de la suppression du document avec l'ID ${id} : ${error.message}`);
  }
}

// Export des services
module.exports = {
  findOneById,
  insertOne,
  updateOneById,
  deleteOneById,
};
