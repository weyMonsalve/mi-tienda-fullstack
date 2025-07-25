const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

//POST /api/carrito
router.post('/',carritoController.crearCarrito);

module.exports = router;