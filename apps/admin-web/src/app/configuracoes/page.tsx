'use client';
import { useState } from "react";
import { useAuth } from "@/firebase";

export default function Configuracoes() {
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Configurações</h1>
          <p className="text-[#6B7280] text-sm">Gerencie as configurações da sua conta</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
        <h2 className="font-semibold text-[#111827] mb-6">Dados da Conta</h2>
        <div className="max-w-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#6B7280]">Nome</label>
              <input
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none"
                value={nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#6B7280]">Email</label>
              <input
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                type="email"
                placeholder="seu@email.com"
              />
            </div>
            <button className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED]">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
        <h2 className="font-semibold text-[#111827] mb-6">Segurança</h2>
        <div className="max-w-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#6B7280]">Senha Atual</label>
              <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#6B7280]">Nova Senha</label>
              <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#6B7280]">Confirmar Nova Senha</label>
              <input type="password" className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none" placeholder="••••••••" />
            </div>
            <button className="px-4 py-2 bg-[#EF4444] text-white rounded-md text-sm font-medium hover:bg-[#DC2626]">
              Alterar Senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
