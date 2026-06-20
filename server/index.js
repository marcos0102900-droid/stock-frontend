const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());

let db;

// 💾 CONFIGURACIÓN E INICIALIZACIÓN DE LA BASE DE DATOS
async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, 'database.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT NOT NULL UNIQUE,
      stock INTEGER DEFAULT 0,
      price REAL DEFAULT 0.0
    )
  `);

  const count = await db.get('SELECT COUNT(*) AS total FROM products');
  if (count.total === 0) {
    await db.run('INSERT INTO products (name, sku, stock, price) VALUES (?, ?, ?, ?)', 'Caja de Cartón Reforzada', 'BOX-001', 45, 2.50);
    await db.run('INSERT INTO products (name, sku, stock, price) VALUES (?, ?, ?, ?)', 'Cinta Embalar Transparente', 'TAP-002', 3, 1.20);
    await db.run('INSERT INTO products (name, sku, stock, price) VALUES (?, ?, ?, ?)', 'Plástico de Burbujas (Rollo)', 'BUB-003', 18, 15.00);
    console.log('📦 Productos de prueba insertados en la base de datos.');
  }
}

// 🟢 RUTA GET: Lee los productos de la base de datos
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

// 🔵 RUTA POST: Guarda un nuevo producto
app.post('/api/products', async (req, res) => {
  const { name, sku, stock, price } = req.body;

  if (!name || !sku) {
    return res.status(400).json({ error: 'El nombre y el SKU son obligatorios.' });
  }

  try {
    const result = await db.run(
      'INSERT INTO products (name, sku, stock, price) VALUES (?, ?, ?, ?)',
      name,
      sku,
      parseInt(stock) || 0,
      parseFloat(price) || 0
    );

    const newProduct = {
      id: result.lastID,
      name,
      sku,
      stock: parseInt(stock) || 0,
      price: parseFloat(price) || 0
    };

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Ya existe un producto con ese SKU.' });
    }
    res.status(500).json({ error: 'Error al guardar en la base de datos' });
  }
});

// 🔴 RUTA DELETE: Elimina un producto por su ID de la base de datos real
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.run('DELETE FROM products WHERE id = ?', id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar de la base de datos' });
  }
});

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor Fullstack con SQLite corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error crítico al iniciar la base de datos:', err);
});