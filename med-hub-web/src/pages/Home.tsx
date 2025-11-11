import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import DashboardMedico from './DashboardMedico';
import AdminViewToggle from '../components/AdminViewToggle';

export default function Home() {
  const { user } = useAuth();

  // admin override (dev only)
  const [override, setOverride] = React.useState<string | null>(() => {
    try {
      return localStorage.getItem('admin_view_override');
    } catch {
      return null;
    }
  });

  React.useEffect(() => {
    const onChange = () => setOverride(localStorage.getItem('admin_view_override'));
    window.addEventListener('mh-admin-override-changed', onChange);
    return () => window.removeEventListener('mh-admin-override-changed', onChange);
  }, []);

  if (!user) return null;

  // If user is admin, allow override preview of medico/hospital
  if (user.role === 'admin') {
    if (override === 'medico') return <DashboardMedico />;
    if (override === 'hospital') return <Dashboard />;

    // default admin home
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Painel Admin</h1>
        <p className="mb-4">Você está no modo administrador. Use a ferramenta abaixo para alternar a visão (apenas em desenvolvimento).</p>
        <AdminViewToggle />
        <section className="mt-6">
          <p>Links rápidos:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <button className="text-blue-600" onClick={() => localStorage.setItem('admin_view_override', 'medico')}>Visualizar como Médico</button>
            </li>
            <li>
              <button className="text-blue-600" onClick={() => localStorage.setItem('admin_view_override', 'hospital')}>Visualizar como Hospital</button>
            </li>
          </ul>
        </section>
      </main>
    );
  }

  // Regular users: medico or hospital. Overrides do NOT apply.
  if (user.role === 'medico') return <DashboardMedico />;
  if (user.role === 'hospital') return <Dashboard />;

  return null;
}
