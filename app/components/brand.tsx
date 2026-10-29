import Link from 'next/link';
import type { MouseEventHandler } from 'react';
import { CalendarDays } from 'lucide-react';

type BrandProps = {
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  compact?: boolean;
  subtitle?: string;
};

export default function Brand({ href = '/', className = '', onClick, compact = false, subtitle }: BrandProps) {
  return (
    <Link href={href} onClick={onClick} className={`brand-lockup${compact ? ' brand-compact' : ''}${className ? ` ${className}` : ''}`} aria-label="Agenda Certa">
      <span className="brand-symbol" aria-hidden="true"><CalendarDays size={18} strokeWidth={2.2}/></span>
      <span className="brand-wordmark">Agenda <b>Certa</b>{subtitle && <small>{subtitle}</small>}</span>
    </Link>
  );
}
