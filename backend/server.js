// 1️⃣ Importamos el módulo express
const express = require('express');

// 2️⃣ Importamos el módulo cors para permitir peticiones desde otro origen
const cors = require('cors');

// 3️⃣ Creamos una aplicación de express
const app = express();

// 4️⃣ Definimos el puerto en el que va a correr el servidor
const PORT = 3001;

// 5️⃣ Usamos middlewares: cors y express.json para manejar JSON
app.use(cors()); // permite que React se comunique con el backend
app.use(express.json()); // convierte automáticamente el cuerpo de la solicitud a JSON

// 6️⃣ Creamos una ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend funcionando correctamente!');
});

// 7️⃣ Ponemos a escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
