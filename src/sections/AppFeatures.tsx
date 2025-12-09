import { Bell, Clock, Gift, LucideIcon, ShieldCheck, Smartphone, Tag } from 'lucide-react';
import type { Copy } from '../utils/types';

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  bell: Bell,
  tag: Tag,
  gift: Gift,
  clock: Clock,
  'shield-check': ShieldCheck,
};

interface AppFeaturesProps {
  copy: Copy;
}

export function AppFeatures({ copy }: AppFeaturesProps) {
  const { appFeatures } = copy;

  return (
    <div className="container">
      <div className="section-head">
        <h2>{appFeatures.title}</h2>
        <p>{appFeatures.subtitle}</p>
      </div>
      <div className="app-grid">
        {appFeatures.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Smartphone;
          return (
            <div key={item.title} className="surface-card app-card fade-card">
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
