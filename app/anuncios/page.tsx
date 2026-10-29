import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdOptions from './ad-options';
import Brand from '@/app/components/brand';

export const metadata: Metadata = { title: 'Criativos Agenda Certa | Materiais de divulgação' };

export default function AdsPage() {
  return <main className="ad-studio">
    <header className="ad-studio-head">
      <Brand/>
      <Link href="/" className="ad-back"><ArrowLeft size={15}/> Voltar ao site</Link>
    </header>
    <section className="ad-intro">
      <span className="eyebrow">MATERIAIS DE DIVULGAÇÃO</span>
      <h1>Escolha seu criativo</h1>
      <p>Três opções para apresentar a Agenda Certa. Selecione o formato e capture a arte na tela.</p>
    </section>
    <AdOptions/>
  </main>;
}
