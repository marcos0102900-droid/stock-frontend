import React, { useState } from 'react';
import { useAuth, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ImportCSV from './pages/ImportCSV';

function AppContent() {
  const { token } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (!token) return <Login />;

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'products' && <Products />}
      {activePage === 'import' && <ImportCSV />}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}