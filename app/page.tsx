import Link from 'next/link';
import {
  ArrowRight, BadgeCheck, CalendarDays, ChartNoAxesCombined, Clock3,
  Scissors, Sparkles, UsersRound,
} from 'lucide-react';
import Brand from './components/brand';

const appointments = [
  { time: '09:00', name: 'Mariana Costa', service: 'Corte + escova', status: 'Confirmado', tone: 'copper' },
  { time: '10:30', name: 'Ana Paula', service: 'Trança nagô', status: 'Confirmado', tone: 'lavender' },
  { time: '11:00', name: 'Fernanda Alves', service: 'Manicure em gel', status: 'Em atendimento', tone: 'green' },
];

export default function Home() {
  return <main className="landing landing-premium">
    <nav className="topbar">
      <Brand/>
      <div><Link className="nav-link" href="/entrar">Entrar</Link><Link className="button button-small" href="/cadastro">Criar meu espaço <ArrowRight size={15}/></Link></div>
    </nav>

    <section className="hero hero-wide hero-premium">
      <div className="hero-copy">
        <div className="eyebrow hero-kicker"><span className="status-dot"/> GESTÃO PARA QUEM VIVE DE BELEZA</div>
        <h1>Sua agenda cheia.<br/><em>Seu negócio no controle.</em></h1>
        <p>Organize seus horários, conquiste clientes e acompanhe seu negócio em um só lugar.</p>
        <div className="hero-benefits hero-benefits-strong"><span>Menos confusão.</span><span>Mais organização.</span><span>Mais oportunidades de crescer.</span></div>
        <div className="hero-actions"><Link className="button hero-main-cta" href="/painel">Conhecer o Agenda Certa <ArrowRight size={16}/></Link><Link className="hero-secondary-cta" href="#demonstracao">Ver demonstração</Link></div>
        <div className="hero-note"><BadgeCheck size={16}/> Pensado para a rotina real dos negócios de beleza.</div>
      </div>

      <div className="device-mockup device-mockup-premium" aria-label="Demonstração do Agenda Certa em um notebook">
        <div className="device-screen"><div className="device-camera"/>
          <div className="product-preview">
            <header className="product-preview-top"><Brand compact/><span className="demo-tag"><i/> DADOS DE DEMONSTRAÇÃO</span></header>
            <div className="product-preview-heading"><div><small>QUINTA-FEIRA · 29 OUT</small><b>Seu espaço hoje</b></div><button aria-label="Calendário demonstrativo"><CalendarDays size={16}/></button></div>
            <div className="product-preview-stats"><div><small>ATENDIMENTOS</small><b>13</b><span>na agenda de hoje</span></div><div><small>RECEITA DO PERÍODO</small><b>R$ 1.240</b><span>valor fictício</span></div></div>
            <div className="product-preview-calendar"><div className="preview-calendar-title"><b>Agenda da equipe</b><span>OUTUBRO · EXEMPLO</span></div><div className="preview-calendar-days"><span>SEG <b>26</b></span><span>TER <b>27</b></span><span>QUA <b>28</b></span><span className="active">QUI <b>29</b></span><span>SEX <b>30</b></span><span>SÁB <b>31</b></span></div></div>
            <div className="product-preview-appointments"><div className="preview-list-heading"><b>Próximos atendimentos</b><span>Todos os horários são fictícios</span></div>{appointments.map((appointment) => <div className="product-appointment" key={appointment.time}><time>{appointment.time}</time><i className={`preview-dot ${appointment.tone}`}/><span className="product-appointment-person"><b>{appointment.name}</b><small>{appointment.service}</small></span><em>{appointment.status}</em></div>)}</div>
          </div>
        </div>
        <div className="device-base"><span/></div>
        <div className="floating-booking"><span><CalendarDays size={14}/> EXEMPLO DE AGENDAMENTO</span><b>10:30 <i/> Trança nagô</b><small>Ana Paula · Profissional demonstrativa</small></div>
        <div className="device-caption"><span>AGENDA CERTA</span><b>Agenda, clientes e gestão no mesmo lugar.</b></div>
      </div>
    </section>

    <section className="landing-audience landing-audience-premium"><span>FEITO PARA PROFISSIONAIS DE BELEZA</span><div><b>Barbearias</b><i/><b>Salões</b><i/><b>Trancistas</b><i/><b>Nail designers e manicures</b><i/><b>Lash designers</b><i/><b>Estética</b></div></section>

    <section className="landing-solutions" id="como-ajuda">
      <div className="landing-section-heading"><span className="eyebrow"><Sparkles size={14}/> MAIS CLAREZA NA SUA ROTINA</span><h2>O cuidado com seus clientes.<br/><em>A organização do seu negócio.</em></h2><p>As informações importantes do espaço, reunidas em uma experiência simples de acompanhar.</p></div>
      <div className="feature-row feature-row-premium">
        <article><span className="solution-icon"><CalendarDays/></span><small>01 · AGENDA</small><h3>Saiba quem vem e quando</h3><p>Visualize horários, serviços e profissionais em um só calendário demonstrativo.</p></article>
        <article><span className="solution-icon"><UsersRound/></span><small>02 · CLIENTES</small><h3>Tenha o histórico por perto</h3><p>Consulte preferências e atendimentos para cuidar de cada relacionamento.</p></article>
        <article><span className="solution-icon"><Scissors/></span><small>03 · EQUIPE</small><h3>Serviços e equipe alinhados</h3><p>Veja os serviços oferecidos e quem faz parte do seu espaço.</p></article>
        <article><span className="solution-icon"><ChartNoAxesCombined/></span><small>04 · VISÃO DO NEGÓCIO</small><h3>Acompanhe os números</h3><p>Visualize indicadores de exemplo para entender como a gestão pode ser apresentada.</p></article>
      </div>
    </section>

    <section className="landing-demo-cta landing-demo-cta-premium" id="demonstracao"><div><span className="eyebrow">AGENDA CERTA · DEMONSTRAÇÃO</span><h2>Um jeito mais organizado de cuidar do seu negócio.</h2><p>Explore as telas com dados fictícios. As ações desta demonstração não alteram uma operação real.</p></div><Link className="button" href="/painel">Conhecer o sistema <ArrowRight size={16}/></Link></section>
    <footer>Um produto <b>Elevo Digital</b> · Agenda Certa · <Link href="/anuncios">Materiais de divulgação</Link></footer>
  </main>;
}
