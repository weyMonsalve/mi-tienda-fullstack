const db = require('../db'); // Conexión a la base de datos

// Agregar producto al carrito (o actualizar si ya existe)
const agregarAlCarrito = async (id_usuario, id_producto, cantidad) => {
    // Verificamos si ya existe ese producto en el carrito del usuario
    const existe = await db.query(
        'SELECT * FROM carrito WHERE id_usuario = $1 AND id_producto = $2',
        [id_usuario, id_producto]
    );

    if (existe.rows.length > 0) {
        // Si ya existe, sumamos la cantidad
        const nuevaCantidad = existe.rows[0].cantidad + cantidad;

        const actualizado = await db.query(
            'UPDATE carrito SET cantidad = $3 WHERE id_usuario = $1 AND id_producto = $2 RETURNING *',
            [id_usuario, id_producto, nuevaCantidad]
        );
        return actualizado.rows[0];
    } else {
        // Si no existe, lo agregamos
        const result = await db.query(
            'INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *',
            [id_usuario, id_producto, cantidad]
        );
        return result.rows[0];
    }
};

// Obtener productos del carrito de un usuario
const obtenerCarritoPorUsuario = async (id_usuario) => {
    const query = `
        SELECT c.id, c.id_producto, c.cantidad, p.nombre, p.precio, (c.cantidad * p.precio) AS subtotal
        FROM carrito c
        JOIN productos p ON c.id_producto = p.id
        WHERE c.id_usuario = $1
    `;
    const result = await db.query(query, [id_usuario]);
    return result.rows;
};

// Eliminar un producto del carrito por ID
const eliminarProductoDelCarrito = async (id_carrito) => {
    const query = 'DELETE FROM carrito WHERE id = $1';
    await db.query(query, [id_carrito]);
};

// Vaciar el carrito de un usuario (eliminar todos sus productos)
const vaciarCarritoPorUsuario = async (id_usuario) => {
    const query = 'DELETE FROM carrito WHERE id_usuario = $1';
    await db.query(query, [id_usuario]);
};


// Actualizar la cantidad de un producto en el carrito
const actualizarCantidadEnCarrito = async (id_usuario, id_producto, nuevaCantidad) => {
    const query = `
        UPDATE carrito
        SET cantidad = $3
        WHERE id_usuario = $1 AND id_producto = $2
        RETURNING *;
    `;
    const result = await db.query(query, [id_usuario, id_producto, nuevaCantidad]);
    return result.rows[0];
};

module.exports = {
    agregarAlCarrito,
    obtenerCarritoPorUsuario,
    eliminarProductoDelCarrito,
    actualizarCantidadEnCarrito,
    vaciarCarritoPorUsuario
};
