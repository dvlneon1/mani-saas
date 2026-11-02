'use client';
import { useState, useEffect } from "react";
import { useAuth, getAgendamentos } from "@/firebase";

export default function Agendamentos() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getAgendamentos(user.uid).then(setAgendamentos).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8B5CF6]"></div>
        <p className="mt-4 text-[#6B7280]">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-[#6B7280] text-sm">Faça login para continuar</p>
      </div>
    );
  }

  const agendamentosFiltrados = statusFilter === "todos"
    ? agendamentos
    : agendamentos.filter((a) => a.status === statusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Agendamentos</h1>
          <p className="text-[#6B7280] text-sm">Gerencie todos os agendamentos</p>
        </div>
        <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
          + Novo agendamento
        </button>
      </div>

      <div className="flex gap-2">
        {["todos", "scheduled", "confirmed", "finalizado", "cancelado"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              statusFilter === s
                ? "bg-[#8B5CF6] text-white"
                : "bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-[#F3F4F6]"
            }`}
          >
            {s === "todos" ? "Todos" : s === "scheduled" ? "Agendados" : s === "confirmed" ? "Confirmados" : s === "finalizado" ? "Finalizados" : "Cancelados"}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Cliente</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Serviço</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Data/Hora</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Valor</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-[#6B7280] text-sm">Nenhum agendamento encontrado</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">Não há agendamentos para este período</p>
                  </div>
                </td>
              </tr>
            ) : (
              agendamentosFiltrados.map((a) => (
                <tr key={a.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{a.clienteName || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{a.service || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{new Date(a.dateTime?.seconds ? a.dateTime.toDate() : a.dateTime).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">R$ {(a.price || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        a.status === "scheduled"
                          ? "bg-[#F5F3FF] text-[#8B5CF6]"
                          : a.status === "confirmed"
                          ? "bg-[#D1FAE5] text-[#10B981]"
                          : a.status === "finalizado"
                          ? "bg-[#D1FAE5] text-[#10B981]"
                          : "bg-[#FEF2F2] text-[#EF4444]"
                      }`}
                    >
                      {a.status === "scheduled" ? "Agendado" : a.status === "confirmed" ? "Confirmado" : a.status === "finalizado" ? "Finalizado" : "Cancelado"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-[#8B5CF6] text-sm hover:underline">Editar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
