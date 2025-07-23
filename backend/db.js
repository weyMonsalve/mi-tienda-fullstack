// 1️⃣ Importamos el paquete pg
const { Pool } = require('pg');

// 2️⃣ Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// 3️⃣ Creamos un nuevo pool de conexión usando los datos de .env
const pool = new Pool({
  host: process.env.DB_HOST,        // Dirección del servidor PostgreSQL
  port: process.env.DB_PORT,        // Puerto (5432 por defecto)
  user: process.env.DB_USER,        // Usuario (normalmente "postgres")
  password: process.env.DB_PASSWORD, // Contraseña que pusiste en pgAdmin
  database: process.env.DB_NAME     // Nombre de tu base de datos
});

// 4️⃣ Exportamos el pool para usarlo en otros archivos
module.exports = pool;
