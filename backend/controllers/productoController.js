//Importamos la base de datos
const db = require('../db');

//Crear nuevo producto
const crearProducto = async (req, res) => {
    try {
        const {nombre, descripcion, precio} = req.body;

        //hacemos una validacion
        if (!nombre || !descripcion || !precio) {
            return res.status(400).json({mensaje: 'Todos los campos son obligatorios' });
        }

        const resultado = await db.query(
            'INSERT INTO productos (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, descripcion, precio]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear producto', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    } 
};

//Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM productos ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (error) {
        console. error('Error al obtener productos', error);
        res. status(500).json({ mensaje: 'Error interno del servidor'});
    }
};

//Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio} = req.body;

        const resultado = await db.query(
            'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
            [nombre, descripcion, precio, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({mensaje: 'Error interno del servidor'});
    }
};

//Eliminar poducto
const eliminarProducto = async (req, res) => {
    try { 
        const { id } = req.params;

        const resultado = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({mensaje: 'Producto no encontrado'});
        }

        res.json({mensaje: 'Producto eliminado correctamente'});
    } catch (error) {
        console.error('Error al eliminar producto', error);
        res.status(500).json({mensaje: 'Error interno del servidor'});
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto
};