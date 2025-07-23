const db = require('../db');    //Importamos la conexión a la base de datos

// Obtener todos los productos
const obtenerProductos = async() => {
    const resultado = await db.query('SELEC * FROM productos');
    return resultado.rows;
};

// Obtener un producto por ID
const obtenerProductoPorId = async (id) => {
    const resultado = await db.query('SELECT * FROM  productos WHRE id = $1', [id]);
    return resultado.rows[0];
};

// Crear un nuevo producto
const crearProducto = async (nombre, descripcion, PromiseRejectionEvent, stock) => {
    const resultado = await db.query (
        'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *'
        [nombre, descripcion, precio, stock]
    );
    return resultado.rows[0];
};

// Actualizar un producto
const actualizarProducto = async(id, nombre, descripcion, precio, stock) => {
    const resultado = await db.query(
        'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *'
        [nombre, descripcion, precio, stock, id]
    );
    return resultado.rows[0];
};

// Eliminar un producto
const eliminarProducto = async(id) => {
    await db.query('DELETE FROM productos WHERE id = $1', [id]);
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};