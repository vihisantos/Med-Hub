import React from 'react';

export default function HeaderBar({ userName = 'Dr. Shabrina', viewMode = 'personal', onToggleView }: { userName?: string; viewMode?: 'personal' | 'hospital'; onToggleView?: (v: 'personal' | 'hospital') => void }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-transparent sticky top-0 z-30 ml-20 lg:ml-64">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <span className="text-sm text-gray-500">Overview</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle visão pessoal / hospital */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
          <button
            aria-label="Visão pessoal"
            onClick={() => onToggleView && onToggleView('personal')}
            className={`px-3 py-1 rounded-full text-sm ${viewMode === 'personal' ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Minha visão
          </button>
          <button
            aria-label="Visão hospital"
            onClick={() => onToggleView && onToggleView('hospital')}
            className={`px-3 py-1 rounded-full text-sm ${viewMode === 'hospital' ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Visão hospital
          </button>
        </div>

        <button aria-label="Notifications" className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 text-xs bg-red-500 text-white rounded-full px-1">3</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-gray-500">Hospital Manager</div>
          </div>

          <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        </div>
      </div>
    </header>
  );
}
