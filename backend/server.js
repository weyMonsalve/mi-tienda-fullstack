// Importamos express para crear el servidor
const express = require('express');

// Importamos cors para permitir peticiones desde otro origen (como el frontend React)
const cors = require('cors');

// Importamos dotenv para poder usar variables de entorno como el puerto
require('dotenv').config();

// Importamos la conexión a PostgreSQL
const pool = require('./db');

//Importamos rutas (cada una maneja un módulo del sistema)
const productosRoutes = require('./routes/productosRoutes');  // Ruta para productos
const carritoRoutes = require('./routes/carritoRoutes');      // Ruta para carrito
const usuariosRoutes = require('./routes/usuariosRoutes');    // Ruta para usuarios

// Creamos la app de express
const app = express();

// Definimos el puerto desde una variable de entorno o usamos 3001 por defecto
const PORT = process.env.PORT || 3001;

// Middlewares:
app.use(cors());             //cors para permitir conexión desde React
app.use(express.json());    //express.json para aceptar datos JSON en las peticiones


// Conectamos las rutas a sus respectivos endpoints
app.use('/api/productos', productosRoutes);   // Productos: http://localhost:3001/api/productos
app.use('/api/carrito', carritoRoutes);       // Carrito:   http://localhost:3001/api/carrito
app.use('/api/usuarios', usuariosRoutes);     // Usuarios:  http://localhost:3001/api/usuarios


// Probamos si la conexión a PostgreSQL funciona correctamente
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error de conexión con PostgreSQL:', err);
  } else {
    console.log('✅ Conectado a PostgreSQL. Hora actual:', res.rows[0]);
  }
});



// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
