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

//Controlador para agregar al carrito
const agregarAlCarrito = async(req, res) => {
    try {
        const { id_usuario, id_producto, cantidad } = req.body;

        if (!id_usuario || !id_producto || !cantidad) {
            return  res.status(400).json({error: 'Faltan datos: id_usuario, id_producto o cantidad '});
        }

        const resultado = await carritoModel.agregarAlCarrito(id_usuario, id_producto, cantidad);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al agregar al carrito', error);
        res.status(500).json({ error: 'Error del servidor al agregar al carrito'});
    }
};

module.exports = {
    crearCarrito,
    agregarAlCarrito
}