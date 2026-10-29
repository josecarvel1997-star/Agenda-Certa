import type { Metadata } from 'next';
import './styles.css';
import './workspace.css';
export const metadata: Metadata = { title: 'Agenda Certa | Gestão para negócios de beleza', description: 'Agendamentos, clientes, equipe e gestão para barbearias, salões, unhas e estética.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
