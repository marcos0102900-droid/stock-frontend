import React from 'react';

export default function Dashboard({ products = [] }) {
  
  // 📊 CALCULADORA DE ESTADÍSTICAS REALES
  const stats = React.useMemo(() => {
    // 1. Total de productos distintos en el sistema
    const totalProducts = products.length;

    // 2. Valor financiero total (Suma de: stock * precio de cada artículo)
    const totalValue = products.reduce((acc, prod) => acc + (prod.stock * prod.price), 0);

    // 3. Cuántos artículos tienen un stock menor o igual a 5 unidades
    const lowStockCount = products.filter(prod => prod.stock <= 5).length;

    return { totalProducts, totalValue, lowStockCount };
  }, [products]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">📊 Panel General</h1>
        <p className="text-gray-500 text-sm">Estado actual de tu inventario calculado en tiempo real.</p>
      </div>

      {/* Tarjetas de Estadísticas Conectadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Productos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Productos</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">{stats.totalProducts}</div>
        </div>

        {/* Valor de Inventario */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Valor del Inventario</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">
            {stats.totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
        </div>

        {/* Alertas de Stock Bajo */}
        <div className={`p-6 rounded-xl shadow-sm border transition ${
          stats.lowStockCount > 0 
            ? 'bg-red-50/50 border-red-100 text-red-900' 
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
        <p className="text-sm text-gray-400">Aquí aparecerán las últimas entradas y salidas automáticamente cuando conectemos el servidor.</p>
      </div>
    </div>
  );
}