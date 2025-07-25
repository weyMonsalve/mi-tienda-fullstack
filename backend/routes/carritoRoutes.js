const express = require('express');
const router = express.Router();

// Importamos el controlador del carrito
const carritoController = require('../controllers/carritoController');

// Ruta para crear un nuevo carrito
router.post('/', carritoController.crearCarrito);

// Ruta para agregar un producto al carrito 
router.post('/agregar', carritoController.agregarAlCarrito);

module.exports = router;
