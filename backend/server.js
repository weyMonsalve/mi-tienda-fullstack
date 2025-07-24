// Importamos el módulo express
const express = require('express');

// Importamos el módulo cors para permitir peticiones desde otro origen
const cors = require('cors');

// Importamos la conexión a la base de datos
const pool = require('./db');

// Importamos las rutas de productos
const productosRoutes = require('./routes/productosRoutes'); // 👈 nueva línea

// Prueba de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error de conexión con PostgreSQL:', err);
  } else {
    console.log('Conectado a PostgreSQL correctamente. Hora actual:', res.rows[0]);
  }
});

// Creamos una aplicación de express
const app = express();

// Definimos el puerto en el que va a correr el servidor
const PORT = 3001;

// Usamos middlewares: cors y express.json para manejar JSON
app.use(cors());                // permite que React se comunique con el backend
app.use(express.json());       // convierte automáticamente el cuerpo de la solicitud a JSON

// Usamos las rutas de productos
app.use('/api/productos', productosRoutes); // 👈 nueva línea

// Creamos una ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// Ponemos a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
