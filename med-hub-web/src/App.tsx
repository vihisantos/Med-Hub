import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/forgot-password'; // IMPORTA A PÁGINA

// aqui você pode importar outras páginas, ex: Signup, Dashboard

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ROTA ESQUECI A SENHA */}
        {/* Outras rotas: */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Rota padrão redireciona para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;