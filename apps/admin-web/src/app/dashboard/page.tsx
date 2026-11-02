'use client';
import { useState, useEffect } from "react";
import { useAuth, getProfissionais, getClientes, getAgendamentos } from "@/firebase";

export default function Dashboard() {
  const { user } = useAuth();
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getProfissionais().then(setProfissionais),
      getClientes(user?.uid).then(setClientes),
      getAgendamentos(user.uid).then(setAgendamentos),
    ]).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8B5CF6]"></div>
        <p className="mt-4 text-[#6B7280]">Carregando...</p>
      </div>
    );
  }

  const totalReceita = agendamentos
    .filter((a) => a.status === "finalizado")
    .reduce((s, a) => s + (a.price || 0), 0);
  const agendamentosHoje = agendamentos.filter(
    (a) => new Date(a.dateTime?.seconds ? a.dateTime.toDate() : a.dateTime).toDateString() === new Date().toDateString()
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-[#6B7280] text-sm">Bem-vindo de volta, {user?.displayName || user?.email?.split("@")[0]}</p>
        </div>
        <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
          Novo agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Profissionais</p>
          <p className="text-2xl font-bold text-[#111827]">{profissionais.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Clientes</p>
          <p className="text-2xl font-bold text-[#111827]">{clientes.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Agendamentos</p>
          <p className="text-2xl font-bold text-[#111827]">{agendamentos.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Receita Total</p>
          <p className="text-2xl font-bold text-[#111827]">R$ {totalReceita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-4">Próximos Agendamentos</h2>
          {agendamentosHoje.length === 0 ? (
            <p className="text-[#6B7280] text-sm text-center py-8">Nenhum agendamento para hoje</p>
          ) : (
            <div className="space-y-3">
              {agendamentosHoje.slice(0, 5).map((a) => (
                <div key={a.id} className="p-3 border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] text-sm font-bold">
                      {a.service?.charAt(0) || "S"}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#111827] text-sm">{a.clienteName || "Cliente"}</p>
                      <p className="text-xs text-[#6B7280]">{a.service || "Serviço"} - R$ {a.price || "0,00"}</p>
                    </div>
                    <span className="text-xs bg-[#F5F3FF] text-[#8B5CF6] px-2 py-1 rounded font-medium">
                      {a.status === "scheduled" ? "Agendado" : "Confirmado"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-4">Resumo Financeiro</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm">Receita Total</span>
              <span className="font-medium text-[#111827]">R$ {totalReceita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm">Agendamentos Totais</span>
              <span className="font-medium text-[#111827]">{agendamentos.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm">Agendamentos Hoje</span>
              <span className="font-medium text-[#111827]">{agendamentosHoje.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
