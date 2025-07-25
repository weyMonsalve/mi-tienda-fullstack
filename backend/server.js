// Importamos el módulo express para crear el servidor
const express = require('express');

// Importamos cors para permitir peticiones desde otro origen (como el frontend React)
const cors = require('cors');

// Importamos dotenv para poder usar variables de entorno como el puerto
require('dotenv').config();

// Importamos la conexión a PostgreSQL
const pool = require('./db');

// Importamos las rutas del backend (productos y carrito)
const productosRoutes = require('./routes/productosRoutes');  // Ruta para productos
const carritoRoutes = require('./routes/carritoRoutes');      // Ruta para carrito

// Creamos la app de express
const app = express();

// Definimos el puerto desde una variable de entorno o usamos 3001 por defecto
const PORT = process.env.PORT || 3001;

// Middlewares:
// - cors para permitir conexión desde React
// - express.json para aceptar datos JSON en las peticiones
app.use(cors());
app.use(express.json());

// Probamos si la conexión a PostgreSQL funciona correctamente
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error de conexión con PostgreSQL:', err);
  } else {
    console.log('✅ Conectado a PostgreSQL. Hora actual:', res.rows[0]);
  }
});

// Conectamos las rutas a sus respectivos endpoints
app.use('/api/productos', productosRoutes);  // Productos: http://localhost:3001/api/productos
app.use('/api/carrito', carritoRoutes);      // Carrito:   http://localhost:3001/api/carrito

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
