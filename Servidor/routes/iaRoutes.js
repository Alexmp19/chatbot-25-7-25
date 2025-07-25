const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController.js');

// Ruta POST para la IA
router.post('/', iaController.getResponse);

module.exports = router;
