import React, { useEffect, useState, useCallback } from "react";
import ShiftCard from "../components/ShiftCard";
import api from "../services/api";

interface Shift {
  id: string;
  specialty: string;
  start_time: string;
  status: "open" | "assigned" | "cancelled" | "completed";
}

export default function DashboardMedico() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShifts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/shifts");
      setShifts(res.data);
    } catch (error) {
      console.error("Erro ao carregar plantões", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const acceptShift = async (shiftId: string) => {
    try {
      await api.post(`/shifts/${shiftId}/accept`);
      setShifts((prev) =>
        prev.map((s) => (s.id === shiftId ? { ...s, status: "assigned" } : s))
      );
    } catch (error) {
      alert("Erro ao aceitar plantão, tente novamente");
    }
  };

  return (
    <main
      className="p-6 max-w-6xl mx-auto min-h-screen bg-neutral-50 font-body"
      aria-label="Painel do Médico - Lista de Plantões"
    >
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-heading font-semibold text-primary">
          Meus Plantões
        </h1>
        <button
          className="bg-primary text-white px-5 py-2 rounded-2xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Ver perfil"
        >
          Perfil
        </button>
      </header>

      {loading ? (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600"
        >
          Carregando plantões...
        </p>
      ) : (
        <section
          role="list"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {shifts.length ? (
            shifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} onAccept={acceptShift} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Nenhum plantão disponível no momento.
            </p>
          )}
        </section>
      )}
    </main>
  );
}