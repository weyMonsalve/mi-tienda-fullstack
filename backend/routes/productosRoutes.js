const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Ruta para crear un producto
router.post('/', productoController.crearProducto);

// Ruta para obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Ruta para obtener un producto por ID
router.get('/:id', productoController.obtenerProductoPorId);

// Ruta para actualizar un producto
router.put('/:id', productoController.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
