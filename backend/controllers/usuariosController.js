// controllers/usuariosController.js
const usuariosModel = require('../models/usuariosModel');

const pool = require('../db'); // ✅ Importar conexión

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevoUsuario = await usuariosModel.crearUsuario(nombre, correo, contraseña);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};


//Editar usuario
const editarUsuario = async (req, res) => {
  const id = req.params.id;
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const resultado = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2, contraseña = $3 WHERE id = $4 RETURNING *',
      [nombre, correo, contraseña, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente', usuario: resultado.rows[0] });
  } catch (error) {
    console.error('Error al editar el usuario:', error);
    res.status(500).json({ error: 'Error al editar el usuario' });
  }
};


//Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEliminado = await usuariosModel.eliminarUsuario(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario
};
