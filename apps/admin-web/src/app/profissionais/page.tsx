'use client';
import { useState, useEffect } from "react";
import { useAuth, getProfissionais } from "@/firebase";

export default function Profissionais() {
  const { user } = useAuth();
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getProfissionais().then(setProfissionais).finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#8B5CF6]"></div>
        <p className="mt-4 text-[#6B7280]">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Profissionais</h1>
          <p className="text-[#6B7280] text-sm">Gerencie as profissionais da sua rede</p>
        </div>
        <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
          + Novo profissional
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Nome</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Email</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Data Cadastro</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Ações</th>
            </tr>
          </thead>
          <tbody>
            {profissionais.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-[#6B7280] text-sm">Nenhum profissional cadastrado</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">Cadastre seu primeiro profissional para começar</p>
                  </div>
                </td>
              </tr>
            ) : (
              profissionais.map((p) => (
                <tr key={p.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{p.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-xs bg-[#D1FAE5] text-[#10B981] px-2 py-1 rounded font-medium">Ativo</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{p.createdAt?.toDate?.()?.toLocaleDateString("pt-BR") || "-"}</td>
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
