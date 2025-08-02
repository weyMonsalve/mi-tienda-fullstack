const carritoModel = require('../models/carritoModel');

// Controlador para agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
  try {
    const { id_usuario, id_producto, cantidad } = req.body;

    if (!id_usuario || !id_producto || !cantidad) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const resultado = await carritoModel.agregarAlCarrito(id_usuario, id_producto, cantidad);

    res.status(201).json({
      mensaje: 'Producto agregado exitosamente',
      producto: resultado
    });

  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error del servidor al agregar al carrito' });
  }
};
  

// Controlador para obtener los productos del carrito de un usuario
const obtenerCarrito = async(req, res) => {
    try {
        const { id_usuario } = req.params;

        if (!id_usuario) {
            return res.status(400).json({ error: 'Falta el id_usuario en la URL' });
        }

        const productosEnCarrito = await carritoModel.obtenerCarritoPorUsuario(id_usuario);
        res.status(200).json(productosEnCarrito);
    } catch (error) {
        console.error('Error al obtener el carrito', error);
        res.status(500).json({ error: 'Error del servidor al obtener el carrito' });
    }
};

//Controlador para eliminar un producto del carrito
const eliminarProductoDelCarrito = async(req, res) => {
    try {
        const { id_carrito } = req.params;

        if (!id_carrito) {
            return res.status(400).json({ error: 'Falta el id del producto en el carrito' });
        }

        await carritoModel.eliminarProductoDelCarrito(id_carrito);
        res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar producto del carrito', error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
};

// Vaciar carrito
const vaciarCarrito = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        if (!id_usuario) {
            return res.status(400).json({ error: 'Falta el id del usuario' });
        }

        await carritoModel.vaciarCarritoPorUsuario(id_usuario);
        res.status(200).json({ mensaje: 'Carrito vaciado correctamente' });
    } catch (error) {
        console.error('Error al vaciar el carrito', error);
        res.status(500).json({ error: 'Error al vaciar el carrito' });
    }
};


// Controlador para actualizar la cantidad de un producto en el carrito
const actualizarCantidad = async (req, res) => {
  try {
    const { id_usuario, id_producto } = req.params;
    const { cantidad } = req.body;

    if (!id_usuario || !id_producto || !cantidad) {
      return res.status(400).json({ error: 'Faltan datos: id_usuario, id_producto o cantidad' });
    }

    const actualizado = await carritoModel.actualizarCantidadEnCarrito(id_usuario, id_producto, cantidad);

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    res.status(200).json(actualizado);
  } catch (error) {
    console.error('Error al actualizar cantidad', error);
    res.status(500).json({ error: 'Error del servidor al actualizar cantidad' });
  }

};



module.exports = {
    agregarAlCarrito,
    obtenerCarrito,
    eliminarProductoDelCarrito,
    vaciarCarrito,
    actualizarCantidad
    
};
