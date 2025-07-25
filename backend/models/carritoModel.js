const db  = require('../db');      //Importamos la conexion con base de datos

//Crear un nuevo carrito
const crearCarrito = async(id_usuario) => {
    const query = 'INSERT INTO carrito (id_usuario) VALUES ($1) RETURNING *';  
    const values = [id_usuario];

    const resultado = await db.query(query, values);
    return resultado.rows[0];
};

module.exports = {
    crearCarrito
}