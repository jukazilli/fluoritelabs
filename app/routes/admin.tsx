import { UserButton } from "@clerk/react-router";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { requireAdmin } from "../features/auth/auth.server.ts";

export async function loader(args: LoaderFunctionArgs) {
  const session = await requireAdmin(args);
  return {
    adminUserId: session.userId,
  };
}

export default function AdminDashboard() {
  const { adminUserId } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-[#030304] text-[#f5f5f7]">
      <header className="border-b border-[#0e0e13] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#9494a8]">Fluorite Labs</span>
          <span className="text-[#5e5e72]">/</span>
          <span className="text-xs font-mono text-[#8a63f2]">Painel Admin</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-[#5e5e72] font-mono">{adminUserId}</span>
          <UserButton />
        </div>
      </header>

      <main className="p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-[#f5f5f7]">
            Painel Administrativo Autorizado
          </h1>
          <p className="text-sm text-[#9494a8] mt-1">
            Autenticado via Clerk e autorizado com sucesso pela aplicação (FND-006).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded border border-[#0e0e13] bg-[#070709] space-y-2">
            <h2 className="text-sm font-medium text-[#f5f5f7]">Leads & Microbriefing</h2>
            <p className="text-xs text-[#5e5e72]">
              Gerenciamento das respostas de potenciais clientes e status de encaminhamento.
            </p>
          </div>
          <div className="p-6 rounded border border-[#0e0e13] bg-[#070709] space-y-2">
            <h2 className="text-sm font-medium text-[#f5f5f7]">Fluor Journal</h2>
            <p className="text-xs text-[#5e5e72]">
              Editor de artigos em blocos (BlockNote) e gestão de publicações editoriais.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
