import React from 'react';

export default function NotificationsDropdown() {
  const notifications = [
    { id: 1, text: 'New shift assigned', time: '2h' },
    { id: 2, text: 'Patient feedback received', time: '1d' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 w-80">
      <div className="text-sm font-semibold px-2">Notifications</div>
      <ul className="mt-2 divide-y">
        {notifications.map((n) => (
          <li key={n.id} className="px-2 py-2 text-sm flex items-center justify-between">
            <div>{n.text}</div>
            <div className="text-xs text-gray-400">{n.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
