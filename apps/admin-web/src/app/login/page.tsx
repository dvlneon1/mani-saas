'use client';
import { useState } from "react";
import { useAuth } from "@/firebase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, senha);
    } catch (err: any) {
      alert(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <h2 className="text-2xl font-bold text-[#111827] mt-4">Mani Admin</h2>
          <p className="text-[#6B7280] text-sm">Entrar no painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6B7280]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6B7280]">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#8B5CF6] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#8B5CF6] text-white rounded-md text-sm font-medium hover:bg-[#7C3AED] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#6B7280]">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="text-[#8B5CF6] font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
