import React, { useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Caja de Cartón Reforzada', sku: 'BOX-001', stock: 45, price: 2.50 },
    { id: 2, name: 'Cinta Embalar Transparente', sku: 'TAP-002', stock: 3, price: 1.20 }, // Alerta stock bajo
    { id: 3, name: 'Plástico de Burbujas (Rollo)', sku: 'BUB-003', stock: 18, price: 15.00 }
  ]);

  const [formData, setFormData] = useState({ name: '', sku: '', stock: '', price: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;
    
    const newProd = {
      id: Date.now(),
      name: formData.name,
      sku: formData.sku,
      stock: parseInt(formData.stock) || 0,
      price: parseFloat(formData.price) || 0
    };

    setProducts([...products, newProd]);
    setFormData({ name: '', sku: '', stock: '', price: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">🛍️ Gestión de Inventario</h1>
        <p className="text-gray-500 text-sm">Controla, añade y supervisa tus productos existentes.</p>
      </div>

      {/* Formulario Rápido */}
      <form onSubmit={handleAddProduct} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nombre</label>
          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: Bolsa Kraft" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">SKU / Código</label>
          <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="SKU-999" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stock Inicial</label>
          <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Precio (€)</label>
          <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded-lg text-sm transition shadow-sm h-9">
          + Añadir Producto
        </button>
      </form>

      {/* Tabla de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-4">Producto</th>
              <th className="p-4">SKU / Código</th>
              <th className="p-4">Existencias</th>
              <th className="p-4">Precio Unitario</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-slate-600">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-medium text-slate-800">{prod.name}</td>
                <td className="p-4"><span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600">{prod.sku}</span></td>
                <td className="p-4 font-semibold">{prod.stock} u.</td>
                <td className="p-4">{prod.price.toFixed(2)} €</td>
                <td className="p-4">
                  {prod.stock <= 5 ? (
                    <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-100">Stock Crítico</span>
                  ) : (
                    <span className="bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-100">Óptimo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}