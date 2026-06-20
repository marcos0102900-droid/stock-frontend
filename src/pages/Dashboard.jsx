import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos iniciales del inventario
    setTimeout(() => {
      setStats({
        totalProducts: 124,
        totalValue: 45230,
        lowStockCount: 8
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">📊 Panel General</h1>
        <p className="text-gray-500 text-sm">Estado actual de tu inventario en tiempo real.</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Productos</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">{stats.totalProducts}</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Valor del Inventario</div>
          <div className="text-3xl font-bold text-slate-700 mt-2">{stats.totalValue.toLocaleString('es-ES')} €</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 bg-red-50/30 border-red-100">
          <div className="text-sm font-medium text-red-500 uppercase tracking-wider">Alertas de Stock Bajo</div>
          <div className="text-3xl font-bold text-red-600 mt-2">{stats.lowStockCount}</div>
        </div>
      </div>

      {/* Contenedor de Actividad Reciente (Boceto visual) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Últimos movimientos</h3>
        <p className="text-sm text-gray-400">Aquí aparecerán las últimas entradas y salidas automáticamente.</p>
      </div>
    </div>
  );
}