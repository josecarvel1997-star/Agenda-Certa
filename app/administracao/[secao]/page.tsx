import Link from 'next/link';
import Brand from '@/app/components/brand';
import { redirect } from 'next/navigation';
import { Activity, ArrowLeft, Building2, CreditCard, Headset } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

const content: Record<string, { title: string; description: string; columns: string[]; empty: string }> = {
  empresas: { title: 'Empresas', description: 'Consulte empresas cadastradas e o status de cada espaço Agenda Certa.', columns: ['Empresa', 'Plano', 'Status', 'Criada em'], empty: 'Nenhuma empresa cadastrada' },
  planos: { title: 'Planos e limites', description: 'Mantenha as opções comerciais e os limites do produto organizados.', columns: ['Plano', 'Recursos', 'Limites', 'Status'], empty: 'Nenhum plano configurado' },
  suporte: { title: 'Suporte administrativo', description: 'Acompanhe solicitações administrativas encaminhadas ao Agenda Certa.', columns: ['Solicitação', 'Empresa', 'Prioridade', 'Status', 'Atualizada em'], empty: 'Nenhuma solicitação em aberto' },
  saude: { title: 'Saúde do sistema', description: 'Consulte eventos operacionais relevantes para a equipe da plataforma.', columns: ['Evento', 'Severidade', 'Área', 'Identificado em', 'Status'], empty: 'Nenhum evento operacional' },
};
const icons = { empresas: Building2, planos: CreditCard, suporte: Headset, saude: Activity };

export default async function AdminSectionPage({ params }: { params: Promise<{ secao: string }> }) {
  const { secao } = await params;
  if (!content[secao]) redirect('/administracao');
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/entrar');
    if (user.app_metadata?.platform_admin !== true) redirect('/painel');
  }
  const page = content[secao];
  const Icon = icons[secao as keyof typeof icons];
  return <main className="platform-admin"><header className="platform-top"><Brand/><span className="admin-badge">ADMINISTRAÇÃO DA PLATAFORMA</span><Link className="admin-help" href="/administracao">Voltar ao resumo</Link></header><section className="platform-heading"><div><span className="eyebrow">ADMINISTRAÇÃO</span><h1>{page.title}</h1><p>{page.description}</p></div><Link className="quiet-button" href="/administracao"><ArrowLeft size={14}/> Resumo</Link></section><section className="platform-table"><div><div><h2>{page.title}</h2><p>O acesso a esta área é restrito aos administradores da plataforma.</p></div>{secao === 'planos' && <button className="button"><CreditCard size={14}/> Novo plano</button>}</div><div className="admin-data-table"><div>{page.columns.map((column) => <b key={column}>{column}</b>)}</div><section className="platform-empty"><Icon size={23}/><b>{page.empty}</b><span>Os registros aparecerão nesta área quando forem cadastrados.</span></section></div></section><footer className="dash-footer">Agenda Certa <span>·</span> Administração segura da plataforma</footer></main>;
}
