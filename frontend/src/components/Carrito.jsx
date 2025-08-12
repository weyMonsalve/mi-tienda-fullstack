import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Carrito.css';

const Carrito = () => {
  // Estado que guarda los productos del carrito
  const [productos, setProductos] = useState([]);
  const id_usuario = 1; // Cambia por el ID del usuario que estás usando

  // Este efecto se ejecuta cuando el componente se carga por primera vez
  useEffect(() => {
    obtenerCarrito();
  }, []);

  // Función que trae los productos del carrito desde el backend
  const obtenerCarrito = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:3001/api/carrito/${id_usuario}`);
      setProductos(respuesta.data); // Guardamos los productos en el estado
    } catch (error) {
      console.error('Error al obtener el carrito', error);
    }
  };

  // Función para aumentar la cantidad de un producto
  const aumentarCantidad = async (idCarrito) => {
    try {
      await axios.put(`http://localhost:3001/api/carrito/aumentar/${idCarrito}`);
      obtenerCarrito(); // Volvemos a cargar el carrito actualizado
    } catch (error) {
      console.error('Error al aumentar cantidad', error);
    }
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = async (idCarrito) => {
    try {
      await axios.put(`http://localhost:3001/api/carrito/disminuir/${idCarrito}`);
      obtenerCarrito(); // Volvemos a cargar el carrito actualizado
    } catch (error) {
      console.error('Error al disminuir cantidad', error);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = async (idCarrito) => {
    try {
      await axios.delete(`http://localhost:3001/api/carrito/eliminar/${idCarrito}`);
      obtenerCarrito();
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  // Función para vaciar el carrito completamente
  const vaciarCarrito = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/carrito/vaciar/${id_usuario}`);
      obtenerCarrito();
    } catch (error) {
      console.error('Error al vaciar el carrito', error);
    }
  };

  // Calcular el total general del carrito
  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        productos.map((producto) => (
          <div className="producto-item" key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>Precio unitario: ${producto.precio.toLocaleString()}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <p>Total: ${ (producto.precio * producto.cantidad).toLocaleString() }</p>

            <div className="botones">
              <button onClick={() => aumentarCantidad(producto.id)}>🔼 Aumentar</button>
              <button onClick={() => disminuirCantidad(producto.id)}>🔽 Disminuir</button>
              <button onClick={() => eliminarProducto(producto.id)}>❌ Eliminar</button>
            </div>
          </div>
        ))
      )}

      {productos.length > 0 && (
        <>
          <h3>Total General: ${calcularTotal().toLocaleString()}</h3>
          <button className="btn vaciar" onClick={vaciarCarrito}>🗑 Vaciar carrito</button>
        </>
      )}
    </div>
  );
};

export default Carrito;
