import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initDB } from './lib/db';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Scanner from './pages/Scanner';
import POS from './pages/POS';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Staff from './pages/Staff';

function App() {
  const { loadProducts, loadTransactions, loadStaff, loadAlerts, loadSettings } = useStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        await Promise.all([
          loadProducts(),
          loadTransactions(),
          loadStaff(),
          loadAlerts(),
          loadSettings(),
        ]);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initialize();
  }, [loadProducts, loadTransactions, loadStaff, loadAlerts, loadSettings]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="pos" element={<POS />} />
          <Route path="reports" element={<Reports />} />
          <Route path="staff" element={<Staff />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
