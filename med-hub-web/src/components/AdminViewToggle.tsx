import React from 'react';

type Override = 'none' | 'medico' | 'hospital';

const STORAGE_KEY = 'admin_view_override';

export default function AdminViewToggle() {
  const [override, setOverride] = React.useState<Override>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY) as Override | null;
      return v ?? 'none';
    } catch {
      return 'none';
    }
  });

  const setAndStore = (v: Override) => {
    setOverride(v);
    try {
      if (v === 'none') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, v);
    } catch {}
    // small feedback
    window.dispatchEvent(new Event('mh-admin-override-changed'));
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm max-w-md">
      <h3 className="font-semibold mb-2">Admin — modo de desenvolvimento</h3>
      <p className="text-sm text-gray-600 mb-3">Forçar visão para testar como Médico/Hospital (apenas para DEV).</p>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${override === 'none' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setAndStore('none')}
        >
          padrão
        </button>
        <button
          className={`px-3 py-1 rounded ${override === 'medico' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setAndStore('medico')}
        >
          Médico
        </button>
        <button
          className={`px-3 py-1 rounded ${override === 'hospital' ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setAndStore('hospital')}
        >
          Hospital
        </button>
      </div>
    </div>
  );
}
