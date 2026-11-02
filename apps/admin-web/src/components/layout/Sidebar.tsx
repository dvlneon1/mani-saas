'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/firebase";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "𓂃" },
  { name: "Profissionais", href: "/profissionais", icon: "𑇈" },
  { name: "Clientes", href: "/clientes", icon: "𑇈" },
  { name: "Agendamentos", href: "/agendamentos", icon: "𓅓" },
  { name: "Financeiro", href: "/financeiro", icon: "𒊹" },
  { name: "Configurações", href: "/configuracoes", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col h-screen hidden md:block">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
          M
        </div>
        <h1 className="font-bold text-[#111827] text-lg">Mani Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#F5F3FF] text-[#8B5CF6]"
                  : "text-[#6B7280] hover:bg-[#F3F4F6]"
              }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E5E7EB]">
        <button
          onClick={() => signOut()}
          className="w-full py-2 px-4 bg-[#EF4444] text-white rounded-md text-sm font-medium hover:bg-[#DC2626] transition-colors"
        >
          Sair
        </button>
        {user?.email && (
          <p className="text-xs text-[#6B7280] mt-2 text-center">{user.email}</p>
        )}
      </div>
    </aside>
  );
}
