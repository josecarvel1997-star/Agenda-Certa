'use client';

import { useState } from 'react';
import { ArrowRight, CalendarDays, Check, Printer, Scissors, Sparkles, UsersRound } from 'lucide-react';

const options = [
  { tag: 'GESTÃO PARA NEGÓCIOS DE BELEZA', title: <>Sua rotina.<br/>Mais organizada.</>, body: 'Conheça o Agenda Certa: agenda, clientes, equipe e finanças em um só lugar.', action: 'Conheça o Agenda Certa', style: 'ad-copper', icon: 'scissors', foot: 'Para barbearias, salões, unhas e estética.' },
  { tag: 'UM NOVO COMEÇO', title: <>Dê forma à<br/>próxima fase.</>, body: 'Organize horários, serviços e equipe com um começo simples e claro.', action: 'Comece pelo Agenda Certa', style: 'ad-sand', icon: 'calendar', foot: 'Feito para negócios de beleza e cuidados pessoais.' },
  { tag: 'FEITO PARA QUEM FAZ', title: <>Mais foco em<br/>cada atendimento.</>, body: 'Tire a gestão do improviso e acompanhe os detalhes do seu espaço.', action: 'Comece agora', style: 'ad-dark', icon: 'team', foot: 'Agenda Certa · Gestão para negócios de beleza' },
];
const formats = [{ label: 'Feed 4:5', value: 'portrait' }, { label: 'Quadrado 1:1', value: 'square' }, { label: 'Story 9:16', value: 'story' }] as const;
type Format = typeof formats[number]['value'];

function ArtIcon({ name }: { name: string }) { if (name === 'calendar') return <CalendarDays size={23}/>; if (name === 'team') return <UsersRound size={23}/>; return <Scissors size={25}/>; }

export default function AdOptions() {
  const [selected, setSelected] = useState(0), [format, setFormat] = useState<Format>('portrait');
  const item = options[selected];
  return <>
    <div className="ad-controls">
      <div className="ad-option-tabs" role="tablist" aria-label="Opções de criativo">
        {options.map((option, index) => <button key={option.tag} role="tab" aria-selected={selected === index} className={selected === index ? 'active' : ''} onClick={() => setSelected(index)}>Opção {index + 1}</button>)}
      </div>
      <div className="ad-formats" aria-label="Formato do anúncio">
        {formats.map(item => <button key={item.value} className={format === item.value ? 'active' : ''} onClick={() => setFormat(item.value)}>{item.label}</button>)}
        <button className="ad-print" onClick={() => window.print()}><Printer size={14}/> Imprimir / salvar</button>
      </div>
    </div>
    <div className="ad-preview-wrap">
      <article className={`ad-art ${item.style} format-${format}`} aria-label={`Criativo ${selected + 1}: ${item.tag}`}>
        <div className="ad-art-glow"/>
        <header className="ad-art-brand"><span className="ad-art-mark"><CalendarDays size={17}/></span><span className="ad-art-wordmark">Agenda <b>Certa</b></span></header>
        <div className="ad-art-content">
          <span className="ad-art-tag"><Sparkles size={12}/>{item.tag}</span>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <div className="ad-art-pills"><span><Check size={13}/> Horários</span><span><Check size={13}/> Serviços</span><span><Check size={13}/> Equipe</span></div>
          <div className="ad-art-cta">{item.action}<ArrowRight size={16}/></div>
        </div>
        <div className="ad-art-illustration"><div className="ad-circle ad-circle-one"/><div className="ad-circle ad-circle-two"/><div className="ad-icon-card"><ArtIcon name={item.icon}/></div><div className="ad-mini-card"><span/><span/><span/></div></div>
        <footer className="ad-art-footer">{item.foot}<span>ELEVO DIGITAL</span></footer>
      </article>
      <p className="ad-size-hint">Prévia em {format === 'portrait' ? '4:5 · Feed' : format === 'square' ? '1:1 · Quadrado' : '9:16 · Story'}</p>
    </div>
    <div className="ad-option-summary"><strong>Opção {selected + 1} de 3</strong><span>{item.tag}</span></div>
  </>;
}
