import {
  BadgeDollarSign,
  Headphones,
  Leaf,
  LucideIcon,
  MapPin,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { Copy } from '../utils/types';

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  'badge-dollar-sign': BadgeDollarSign,
  leaf: Leaf,
  headphones: Headphones,
  sparkles: Sparkles,
  'map-pin': MapPin,
};

interface WhyFasketProps {
  copy: Copy;
}

export function WhyFasket({ copy }: WhyFasketProps) {
  const { why } = copy;

  return (
    <div className="container">
      <div className="section-head">
        <h2>{why.title}</h2>
        <p>{why.subtitle}</p>
      </div>
      <div className="why-grid">
        {why.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Sparkles;
          return (
            <div key={item.title} className="surface-card why-card fade-card">
              <div className="feature-icon">
                <Icon size={20} className="rtl-flip" aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
