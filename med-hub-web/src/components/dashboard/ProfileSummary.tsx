import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProfileSummary() {
  const recentPatients = [
    { id: 1, name: 'João', datetime: '2025-10-12 09:30' },
    { id: 2, name: 'Maria', datetime: '2025-10-12 11:00' },
    { id: 3, name: 'Pedro', datetime: '2025-10-12 14:20' },
  ];

  const data = [
    { name: 'Mon', patients: 12 },
    { name: 'Tue', patients: 18 },
    { name: 'Wed', patients: 8 },
    { name: 'Thu', patients: 20 },
    { name: 'Fri', patients: 14 },
    { name: 'Sat', patients: 6 },
    { name: 'Sun', patients: 4 },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img src="/avatar.png" alt="Perfil" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <div className="text-lg font-semibold">Dr. Shabrina</div>
          <div className="text-sm text-gray-500">Cardiologia</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium">Últimos pacientes</div>
        <ul className="mt-2 space-y-2 text-sm">
          {recentPatients.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <div>{p.name}</div>
              <div className="text-xs text-gray-500">{p.datetime}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="patients" stroke="#16a34a" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
