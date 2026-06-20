const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Base de Datos simulada en memoria
let productsDatabase = [
  { id: 1, name: 'Caja de Cartón Reforzada', sku: 'BOX-001', stock: 45, price: 2.50 },
  { id: 2, name: 'Cinta Embalar Transparente', sku: 'TAP-002', stock: 3, price: 1.20 },
  { id: 3, name: 'Plástico de Burbujas (Rollo)', sku: 'BUB-003', stock: 18, price: 15.00 }
];

// 🟢 RUTA GET: Devuelve la lista actual a la aplicación web
app.get('/api/products', (req, res) => {
  res.json(productsDatabase);
});

// 🔵 RUTA POST: Recibe un nuevo producto desde el formulario y lo guarda
app.post('/api/products', (req, res) => {
  // Extraemos los datos que viajan ocultos en la petición (req.body)
  const { name, sku, stock, price } = req.body;

  // Validación básica: Si falta el nombre o el SKU, rechazamos el guardado
  if (!name || !sku) {
    return res.status(400).json({ error: 'El nombre y el SKU son obligatorios.' });
  }

  // Creamos el nuevo objeto clonando la estructura de nuestra base de datos
  const newProduct = {
    id: Date.now(), // ID único basado en el milisegundo actual
    name: name,
    sku: sku,
    stock: parseInt(stock) || 0,
    price: parseFloat(price) || 0
  };

  // Metemos el producto al final de nuestra lista (Guardado en memoria)
  productsDatabase.push(newProduct);

  // Le respondemos al frontend confirmando que todo salió bien (Código 201 = Creado)
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de StockMaster corriendo en http://localhost:${PORT}`);
});