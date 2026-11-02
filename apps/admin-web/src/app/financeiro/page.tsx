'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Financeiro() {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const q = query(
      collection(db, "financeiro"),
      where("profissionalId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    getDocs(q).then((snapshot) => {
      setTransacoes(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    }).finally(() => setLoading(false));
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

  const totalReceitas = transacoes.filter((t) => t.tipo === "income").reduce((s, t) => s + (t.valor || 0), 0);
  const totalDespesas = transacoes.filter((t) => t.tipo === "expense").reduce((s, t) => s + (t.valor || 0), 0);
  const lucro = totalReceitas - totalDespesas;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Financeiro</h1>
          <p className="text-[#6B7280] text-sm">Controle de receitas e despesas</p>
        </div>
        <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
          + Novo lançamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Receitas Totais</p>
          <p className="text-2xl font-bold text-[#111827]">R$ {totalReceitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Despesas Totais</p>
          <p className="text-2xl font-bold text-[#111827]">R$ {totalDespesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
          <p className="text-[#6B7280] text-sm font-medium">Lucro Líquido</p>
          <p className="text-2xl font-bold text-[#111827]">R$ {lucro.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Descrição</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Tipo</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Valor</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Método</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#6B7280] uppercase">Data</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-[#6B7280] text-sm">Nenhuma transação encontrada</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">Comece registrando suas primeiras receitas e despesas</p>
                  </div>
                </td>
              </tr>
            ) : (
              transacoes.map((t) => (
                <tr key={t.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{t.descricao}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        t.tipo === "income" ? "bg-[#D1FAE5] text-[#10B981]" : "bg-[#FEF2F2] text-[#EF4444]"
                      }`}
                    >
                      {t.tipo === "income" ? "Receita" : "Despesa"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {t.tipo === "income" ? "+" : "-"} R$ {(t.valor || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{t.metodo}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        t.status === "completed" ? "bg-[#D1FAE5] text-[#10B981]" : "bg-[#FEF2F2] text-[#EF4444]"
                      }`}
                    >
                      {t.status === "completed" ? "Concluído" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{t.createdAt?.toDate?.()?.toLocaleDateString("pt-BR") || t.data}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
