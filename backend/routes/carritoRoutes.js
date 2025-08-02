const express = require('express');
const router = express.Router();

const {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarProductoDelCarrito,
  vaciarCarrito,
  actualizarCantidad
} = require('../controllers/carritoController');

// POST /api/carrito
router.post('/', agregarAlCarrito);

// Otros endpoints opcionales:
router.get('/:id_usuario', obtenerCarrito);
router.put('/:id_usuario/:id_producto', actualizarCantidad);
router.delete('/:id_carrito', eliminarProductoDelCarrito);
router.delete('/vaciar/:id_usuario', vaciarCarrito);


module.exports = router;
