const db  = require('../db');      //Importamos la conexion con base de datos

//Crear un nuevo carrito
const crearCarrito = async(id_usuario) => {
    const query = 'INSERT INTO carrito (id_usuario) VALUES ($1) RETURNING *';  
    const values = [id_usuario];

    const resultado = await db.query(query, values);
    return resultado.rows[0];
};

//Agregar producto al carrito
const agregarAlCarrito = async(id_usuario, id_producto, cantidad) => {
    const result = await pool.query(
        'INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *',
        [id_usuario, id_producto, cantidad]
    );
    return result.rows[0];
}

module.exports = {
    crearCarrito,
    agregarAlCarrito
}