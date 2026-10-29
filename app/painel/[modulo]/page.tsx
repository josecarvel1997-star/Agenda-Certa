import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PanelModule from './panel-module';

export default async function ModulePage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params;
  if (!['agenda','fila','atendimentos','clientes','recuperacao','servicos','equipe','financeiro','estoque','fidelizacao','relatorios','alertas','metas','notificacoes','configuracoes','comissoes'].includes(modulo)) redirect('/painel');
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return <PanelModule moduleKey={modulo} shopName="Minha barbearia" role="owner" userName="Equipe" />;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/entrar');
  const { data: memberships } = await supabase.from('barbershop_members').select('barbershop_id, role, barbershops(id,name,onboarding_step)').eq('user_id', user.id).limit(1);
  const membership = memberships?.[0];
  const shop = Array.isArray(membership?.barbershops) ? membership.barbershops[0] : membership?.barbershops;
  if (!membership || !shop) redirect('/painel');
  if (shop.onboarding_step !== 'complete') redirect('/painel');
  const role = membership.role;
  const allowed: Record<string, string[]> = {
    owner: ['agenda','fila','atendimentos','clientes','recuperacao','servicos','equipe','financeiro','estoque','fidelizacao','relatorios','alertas','metas','notificacoes','configuracoes','comissoes'],
    manager: ['agenda','fila','atendimentos','clientes','recuperacao','servicos','estoque','fidelizacao','alertas','notificacoes'],
    barber: ['agenda','atendimentos','clientes','comissoes'],
    receptionist: ['agenda','fila','atendimentos','clientes','recuperacao','notificacoes'],
  };
  if (!allowed[role]?.includes(modulo)) redirect(role === 'barber' ? '/painel/agenda' : '/painel');
  return <PanelModule moduleKey={modulo} shopName={shop.name} role={role} userName={String(user.user_metadata?.full_name ?? user.email ?? 'Usuário')} />;
}
