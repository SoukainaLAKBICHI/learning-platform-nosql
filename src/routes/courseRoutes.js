// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers améliore l'organisation, facilite la lecture du code, et permet une maintenance plus simple en structurant les fonctionnalités par module ou domaine.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Pour organiser les routes de manière cohérente, regroupez-les par fonctionnalité ou domaine dans des fichiers distincts, utilisez des noms explicites pour les fichiers, et centralisez leur importation dans un routeur principal.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;