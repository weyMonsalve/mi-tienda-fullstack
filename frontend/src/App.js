// 1️⃣ Importamos React
import React from 'react';

// 2️⃣ Importamos el componente del carrito
import Carrito from './components/Carrito'; // Asegúrate de que la ruta sea correcta

// 3️⃣ Creamos el componente principal llamado App
function App() {
  return (
    <div className="App">
      {/* 4️⃣ Mostramos el título de la página */}
      <h1>Mi Tienda en Línea</h1>

      {/* 5️⃣ Renderizamos el componente Carrito */}
      <Carrito />
    </div>
  );
}

// 6️⃣ Exportamos el componente App para que React lo pueda mostrar en el navegador
export default App;

