const db = require('../db');

const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;

        if (!nombre || !descripcion || !precio || stock === undefined) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4)',
            [nombre, descripcion, precio, stock]
        );

        // Mensaje al crear correctamente
        res.status(201).json({ mensaje: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear producto', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await db.query('SELECT * FROM productos ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener productos', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await db.query('SELECT * FROM productos WHERE id = $1', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al obtener producto por ID', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        const resultado = await db.query(
            'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *',
            [nombre, descripcion, precio, stock, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await db.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
