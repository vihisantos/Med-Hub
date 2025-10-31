import React from 'react';

export default function WelcomeCard({ userName = 'Dr. Shabrina' }: { userName?: string }) {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 flex items-center justify-between gap-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {userName}</h2>
        <p className="text-sm text-gray-600 mt-2">Keep caring — small acts, big impact. Let's check today's schedule.</p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm">+ Add Patient</button>
      </div>
      {/* Ilustração SVG simples à direita; substituir por componente real se disponível */}
      <div aria-hidden>
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="140" height="80" rx="12" fill="#DFF6EA" />
          <circle cx="60" cy="50" r="18" fill="#83B993" />
          <rect x="90" y="30" width="40" height="40" rx="8" fill="#A7E4C8" />
        </svg>
      </div>
    </section>
  );
}
