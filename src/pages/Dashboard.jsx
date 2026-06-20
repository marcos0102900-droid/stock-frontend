import React from 'react';

export default function Dashboard({ products = [] }) {
  // 📊 CALCULADORA DE ESTADÍSTICAS EN TIEMPO REAL
  // Calculamos los valores necesarios basándonos en el array de productos recibido
  const stats = {
    totalProducts: products.length,
    
    // Sumamos el valor total del inventario (Stock × Precio)
    totalValue: products.reduce((acc, prod) => acc + (prod.stock * prod.price), 0),
    
    // Filtramos y contamos los productos con stock crítico (<= 5 unidades)
    lowStockCount: products.filter(prod => prod.stock <= 5).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">📊 Panel General</h1>
        <p className="text-gray-500 text-sm">Resumen global del estado de tu inventario en tiempo real.</p>
      </div>

      {/* Grid de Tarjetas de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Tarjeta 1: Total de Productos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Productos Registrados</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">{stats.totalProducts}</div>
        </div>

        {/* Tarjeta 2: Valor del Inventario */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Valor del Inventario</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">
            {stats.totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        </div>

        {/* Tarjeta 3: Alertas de Stock Bajo */}
        <div className={`p-6 rounded-xl shadow-sm border transition ${
          stats.lowStockCount > 0
            ? 'bg-red-50/50 border-red-100'
            : 'bg-white border-gray-100'
        }`}>
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Alertas de Stock Bajo</div>
          <div className={`text-3xl font-bold mt-2 ${stats.lowStockCount > 0 ? 'text-red-600' : 'text-slate-700'}`}>
            {stats.lowStockCount}
          </div>
        </div>
      </div>

      {/* Contenedor de Actividad Reciente */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Últimos movimientos</h3>
        <p className="text-sm text-gray-400">Aquí aparecerán las últimas entradas y salidas automáticamente.</p>
      </div>
    </div>
  );
}