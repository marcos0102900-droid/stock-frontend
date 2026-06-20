import React, { useState } from 'react';

export default function Import() {
  const [dragActive, setDragActive] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileUploaded(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">📥 Importar Datos</h1>
        <p className="text-gray-500 text-sm">Actualiza tu inventario de forma masiva subiendo un archivo Excel o CSV.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Instrucciones de formato</h3>
        <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-600 mb-6 space-y-2">
          <p>• Asegúrate de que las columnas tengan los encabezados exactos: <strong>Nombre, SKU, Cantidad, Precio</strong>.</p>
          <p>• El formato del archivo debe ser únicamente <strong>.csv, .xlsx o .xls</strong>.</p>
        </div>

        {/* Zona Dropzone */}
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition relative ${
            dragActive ? "border-blue-500 bg-blue-50/40" : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <input 
            type="file" 
            id="file-upload" 
            multiple={false} 
            accept=".csv, .xlsx, .xls"
            onChange={handleFileChange}
            className="hidden" 
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center space-y-3">
            <span className="text-3xl">📄</span>
            <span className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Selecciona un archivo
            </span>
            <span className="text-xs text-gray-400">o arrástralo y suéltalo aquí</span>
          </label>
        </div>

        {/* Estado del archivo cargado */}
        {fileUploaded && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-between text-sm text-emerald-800">
            <span><strong>Archivo cargado:</strong> {fileUploaded}</span>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1 px-3 rounded text-xs transition">
              Procesar filas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}