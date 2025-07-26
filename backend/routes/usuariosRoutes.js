
const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  editarUsuario, 
  eliminarUsuario
} = require('../controllers/usuariosController');

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.put('/:id', editarUsuario);  
router.delete('/:id', eliminarUsuario);

module.exports = router;
