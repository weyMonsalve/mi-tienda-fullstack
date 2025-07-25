const carritoModel = require('../models/carritoModel');

// Controlador para crear un nuevo carrito
const crearCarrito = async(req, res) => {
    try {
        const { id_usuario } = req.body;

        //Validación basica
        if (!id_usuario) {
            return res.status(400).json({error: 'Falta el id_usuario'});
        }

        const nuevoCarrito = await carritoModel.crearCarrito(id_usuario);
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        console.error('Error al crear carrito', error);
        res.status(500).json({error: 'Error al crear carrito'});
    }
};

module.exports = {
    crearCarrito
}