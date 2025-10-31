import React from 'react';
import { Link } from 'react-router-dom';

// Ícones simples como SVG in-line; em projeto real troque por biblioteca (Lucide/Phosphor)
const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-5 h-5 inline-block">{children}</span>
);

export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-gray-900 h-screen shadow-md fixed left-0 top-0 z-40">
      <div className="h-full flex flex-col items-center lg:items-start p-4 gap-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="rounded-md bg-green-600 p-2 text-white">MH</div>
          <div className="hidden lg:block text-xl font-semibold">Med Hub</div>
        </Link>

        <nav className="flex flex-col gap-2 mt-6 w-full">
          <NavItem to="/dashboard" label="Home">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M3 9.5L12 3l9 6.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10v8a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1v-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Icon>
          </NavItem>

          <NavItem to="/agenda" label="Agenda/Plantões">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4" />
              </svg>
            </Icon>
          </NavItem>

          <NavItem to="/messages" label="Mensagens">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </Icon>
          </NavItem>

          <NavItem to="/team" label="Equipe">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              </svg>
            </Icon>
          </NavItem>

          <NavItem to="/settings" label="Configurações">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 2.27 17.7l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H4a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 0 1 6.3 2.27l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 9.89 2H14a2 2 0 0 1 4 0v.09c.21.12.41.26.6.41" />
              </svg>
            </Icon>
          </NavItem>

          <NavItem to="/logout" label="Logout">
            <Icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M17 16l4-4-4-4" />
                <path d="M7 8v8" />
                <path d="M14 12H3" />
              </svg>
            </Icon>
          </NavItem>
        </nav>

        <div className="mt-auto w-full text-center text-xs text-gray-400 hidden lg:block">v1.0</div>
      </div>
    </aside>
  );
}

function NavItem({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 w-full" aria-label={label}>
      <div className="text-green-700">{children}</div>
      <span className="hidden lg:inline text-sm">{label}</span>
    </Link>
  );
}
