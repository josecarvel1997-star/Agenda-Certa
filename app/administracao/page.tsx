import { redirect } from 'next/navigation';
import Link from 'next/link';
import Brand from '@/app/components/brand';
import { Activity, ArrowRight, Building2, CreditCard, Headset, UsersRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function PlatformAdminPage() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/entrar');
    if (user.app_metadata?.platform_admin !== true) redirect('/painel');
  }
  return <main className="platform-admin"><header className="platform-top"><Brand/><span className="admin-badge">ADMINISTRAÇÃO DA PLATAFORMA</span><Link className="admin-help" href="/">Sair para o site <ArrowRight size={14}/></Link></header><section className="platform-heading"><div><span className="eyebrow">GESTÃO DO SAAS</span><h1>Administração</h1><p>Empresas, planos e suporte do Agenda Certa em uma única área.</p></div><Link className="button" href="/administracao/planos"><CreditCard size={15}/> Gerenciar planos</Link></section><div className="platform-metrics">{[['Empresas cadastradas',Building2],['Assinaturas ativas',CreditCard],['Usuários',UsersRound],['Solicitações de suporte',Headset]].map(([label,Icon]) => <article className="platform-stat" key={String(label)}><span><Icon size={17}/></span><small>{String(label)}</small><b>—</b><em>Sem registros disponíveis</em></article>)}</div><section className="platform-table"><div><div><h2>Empresas cadastradas</h2><p>Visão administrativa sem acesso a dados pessoais dos clientes finais.</p></div><Link className="quiet-button" href="/administracao/empresas"><Building2 size={15}/> Ver empresas</Link></div><div className="platform-empty"><Building2 size={23}/><b>Nenhuma empresa cadastrada</b><span>As empresas e o status dos planos aparecerão quando forem registrados no sistema.</span></div></section><section className="platform-cards"><Link href="/administracao/planos"><CreditCard/><div><b>Planos</b><small>Gerencie nomes, limites e disponibilidade.</small></div><ArrowRight/></Link><Link href="/administracao/suporte"><Headset/><div><b>Suporte</b><small>Acompanhe solicitações administrativas.</small></div><ArrowRight/></Link><Link href="/administracao/saude"><Activity/><div><b>Saúde do sistema</b><small>Consulte erros operacionais relevantes.</small></div><ArrowRight/></Link></section><footer className="dash-footer">Agenda Certa <span>·</span> Administração segura da plataforma</footer></main>;
}
