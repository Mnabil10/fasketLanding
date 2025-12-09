import { CreditCard, ListChecks, PackageCheck, Search } from 'lucide-react';
import type { Copy } from '../utils/types';

const icons = [Search, ListChecks, CreditCard, PackageCheck];

interface StepsProps {
  copy: Copy;
}

export function Steps({ copy }: StepsProps) {
  const { steps } = copy;

  return (
    <div className="container">
      <div className="section-head">
        <h2>{steps.title}</h2>
        <p>{steps.subtitle}</p>
      </div>
      <ol className="steps-grid" role="list">
        {steps.items.map((item, index) => {
          const Icon = icons[index] ?? Search;
          return (
            <li key={item.title} className="surface-card step-card fade-card">
              <div className="step-header">
                <span className="step-badge">{index + 1}</span>
                <div className="feature-icon">
                  <Icon size={20} className="rtl-flip" aria-hidden="true" />
                </div>
              </div>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
