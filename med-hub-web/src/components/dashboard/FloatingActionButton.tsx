import React from 'react';

export default function FloatingActionButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      aria-label="Criar novo plantão"
      onClick={onClick}
      className="fixed right-6 bottom-6 bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-700"
    >
      +
    </button>
  );
}
