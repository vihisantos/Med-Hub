import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import HeaderBar from '../components/dashboard/HeaderBar';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import StatsCards from '../components/dashboard/StatsCards';
import CalendarView from '../components/dashboard/CalendarView';
import ProfileSummary from '../components/dashboard/ProfileSummary';
import NotificationsDropdown from '../components/dashboard/NotificationsDropdown';
import FloatingActionButton from '../components/dashboard/FloatingActionButton';

export default function Dashboard() {
  // viewMode controla se o usuário está vendo a visão pessoal ou a visão do hospital
  const [viewMode, setViewMode] = React.useState<'personal' | 'hospital'>('personal');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="ml-20 lg:ml-64 min-h-screen">
        <HeaderBar userName="Vitor" viewMode={viewMode} onToggleView={(v) => setViewMode(v)} />

        <main className="p-6 space-y-6">
          <WelcomeCard userName={viewMode === 'personal' ? 'Dr. Shabrina' : 'Hospital View'} />

          {/* Stats podem variar conforme visão */}
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView />
            </div>
            <div>
              <ProfileSummary />
            </div>
          </div>
        </main>

        <FloatingActionButton onClick={() => alert('Criar novo plantão')} />
      </div>
    </div>
  );
}
