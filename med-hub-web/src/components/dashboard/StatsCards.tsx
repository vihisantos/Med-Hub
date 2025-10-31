import React from 'react';

function StatCard({ title, value, icon, color }: { title: string; value: number | string; icon?: React.ReactNode; color?: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color || 'bg-green-600'}`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default function StatsCards() {
  const stats = [
    { title: 'Patients', value: 124, color: 'bg-green-600', icon: '👥' },
    { title: 'Consultations', value: 38, color: 'bg-blue-500', icon: '🩺' },
    { title: 'Vaccines', value: 72, color: 'bg-yellow-500', icon: '💉' },
    { title: 'Surgeries', value: 5, color: 'bg-red-500', icon: '⚕️' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.title} title={s.title} value={s.value} color={s.color} icon={<span>{s.icon}</span>} />
      ))}
    </div>
  );
}
