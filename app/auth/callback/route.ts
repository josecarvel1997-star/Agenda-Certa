import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code) { const supabase = await createClient(); const { error } = await supabase.auth.exchangeCodeForSession(code); if (!error) { const next = request.nextUrl.searchParams.get('next'); return NextResponse.redirect(new URL(next === '/redefinir-senha' ? next : '/painel', request.url)); } }
  return NextResponse.redirect(new URL('/entrar?erro=Link+de+confirmacao+invalido+ou+expirado.', request.url));
}
