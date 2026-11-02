'use client';
import { useState, useEffect } from "react";
import { useAuth, getClientes } from "@/firebase";

export default function Clientes() {
  const { user } = useAuth();
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getClientes(user.uid).then(setClientes).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8B5CF6]"></div>
        <p className="mt-4 text-[#6B7280]">Carregando...</p>
      </div>
    );
  }

  const clientesFiltrados = clientes.filter((c) =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Clientes</h1>
          <p className="text-[#6B7280] text-sm">Gerencie sua base de clientes</p>
        </div>
        <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
          + Novo cliente
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Nome</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Telefone</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Serviço Favorito</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Total Agendamentos</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">LTV</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Última Visita</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-[#6B7280] text-sm">Nenhuma cliente cadastrada</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">Cadastre sua primeira cliente para começar</p>
                  </div>
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((c) => (
                <tr key={c.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{c.phone || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{c.favoriteService || "-"}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{c.appointmentCount || 0}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">R$ {(c.ltv || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{c.lastVisit || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
