// models/usuariosModel.js
const pool = require('../db');

// Crear un nuevo usuario
const crearUsuario = async (nombre, correo, contraseña) => {
    const resultado = await pool.query(
        'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING *',
        [nombre, correo, contraseña]
    );
    return resultado.rows[0];
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    const resultado = await pool.query('SELECT * FROM usuarios');
    return resultado.rows;
};

//Editar usuario
 const editarUsuario = async (id, nombre, correo, contraseña) => {
    const resultado = await pool.query(
        'UPDATE usuarios SET nombre = $1, correo = $2, contraseña = $3 WHERE id = $4 RETURNING *',
        [nombre, correo, contraseña, id]
    );
    return resultado.rows[0]
 };

 //Eliminar usuario
 const eliminarUsuario = async (id) => {
    const resultado = await pool.query(
         'DELETE FROM usuarios WHERE id = $1 RETURNING *',
        [id]
    );
    return resultado.rows[0]
 };

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    editarUsuario,
    eliminarUsuario
};
