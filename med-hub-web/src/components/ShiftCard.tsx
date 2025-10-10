import React from "react";

type ShiftStatus = "open" | "assigned" | "cancelled" | "completed";

interface Shift {
  id: string;
  specialty: string;
  start_time: string;
  status: ShiftStatus;
}

interface ShiftCardProps {
  shift: Shift;
  onAccept?: (id: string) => void;
}

const statusStyles: Record<ShiftStatus, string> = {
  open: "bg-blue-100 border-blue-400 text-primary",
  assigned: "bg-green-100 border-green-400 text-success",
  cancelled: "bg-gray-200 border-gray-400 text-gray-600",
  completed: "bg-gray-100 border-gray-300 text-gray-700",
};

export default function ShiftCard({ shift, onAccept }: ShiftCardProps) {
  const style = statusStyles[shift.status] || statusStyles.open;

  return (
    <article
      role="listitem"
      aria-label={`Plantão de ${shift.specialty} em ${new Date(
        shift.start_time
      ).toLocaleString()}`}
      className={`border-l-4 p-4 rounded-2xl shadow-md mb-4 flex flex-col justify-between ${style}`}
    >
      <div className="mb-2 font-semibold text-lg font-heading">
        {shift.specialty}
      </div>
      <time dateTime={shift.start_time} className="text-sm font-body mb-2">
        {new Date(shift.start_time).toLocaleString()}
      </time>
      <div className="flex items-center justify-between">
        <span className="uppercase tracking-wide font-bold text-xs">
          {shift.status}
        </span>
        {shift.status === "open" && onAccept && (
          <button
            onClick={() => onAccept(shift.id)}
            className="bg-success text-white px-4 py-2 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            aria-label={`Aceitar plantão de ${shift.specialty}`}
          >
            Aceitar
          </button>
        )}
      </div>
    </article>
  );
}