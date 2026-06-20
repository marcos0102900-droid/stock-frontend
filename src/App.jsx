import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Import from './pages/Import';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);

  // 📡 Pide los productos al backend al cargar la app
  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con el servidor');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error cargando productos:', err));
  }, []);

  // Función para guardar un nuevo producto en el servidor
  const handleSaveProductOnServer = (newProductData) => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProductData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar el producto');
        return res.json();
      })
      .then((savedProduct) => {
        setProducts((prevProducts) => [...prevProducts, savedProduct]);
      })
      .catch((err) => console.error('Error al guardar:', err));
  };

  // 🔴 Función para borrar un producto de la base de datos
  const handleDeleteProductOnServer = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar el producto');
        setProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== id));
      })
      .catch((err) => console.error('Error al eliminar:', err));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products} />;
      case 'products':
        return (
          <Products 
            products={products} 
            onAddProduct={handleSaveProductOnServer} 
            onDeleteProduct={handleDeleteProductOnServer} 
          />
        );
      case 'import':
        return <Import />;
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800">
        <div>
          <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-white text-lg tracking-wide">StockMaster</span>
          </div>
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <span>📊</span>
              <span>Panel General</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'products' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <span>🛍️</span>
              <span>Inventario</span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === 'import' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <span>📥</span>
              <span>Importar Datos</span>
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-200">U</div>
          <div className="text-xs">
            <p className="font-medium text-slate-200">Usuario Demo</p>
            <p className="text-slate-500">Administrador</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8">
          <div className="flex items-center space-x-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Servidor Conectado</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}