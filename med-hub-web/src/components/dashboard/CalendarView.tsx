import React, { useState } from 'react';

// Componente simples de calendário mock; para uso real substitua por FullCalendar ou similar
export default function CalendarView() {
  const [monthOffset, setMonthOffset] = useState(0);

  const goPrev = () => setMonthOffset((m) => m - 1);
  const goNext = () => setMonthOffset((m) => m + 1);

  // Mock de eventos
  const events = [
    { id: 1, date: '2025-10-12', title: 'Consulta - João', type: 'consultation' },
    { id: 2, date: '2025-10-14', title: 'Cirurgia - Maria', type: 'surgery' },
    { id: 3, date: '2025-10-18', title: 'Vacina - Pedro', type: 'vaccine' },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button aria-label="Previous month" onClick={goPrev} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            ◀
          </button>
          <div className="text-sm font-medium">October 2025</div>
          <button aria-label="Next month" onClick={goNext} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            ▶
          </button>
        </div>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span> Consultation</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-300 rounded-full inline-block"></span> Surgery</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-300 rounded-full inline-block"></span> Vaccine</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="p-2 min-h-[64px] border rounded-md bg-gray-50 dark:bg-gray-900">
            <div className="text-right text-xs text-gray-400">{i + 1}</div>
            <div className="mt-1 flex flex-col gap-1">
              {events
                .filter((e) => (parseInt(e.date.split('-')[2]) === i + 1))
                .map((ev) => (
                  <div key={ev.id} className="text-[11px] px-1 py-0.5 rounded-md bg-green-100 text-green-800">{ev.title}</div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
