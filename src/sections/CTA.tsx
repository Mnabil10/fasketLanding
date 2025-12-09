import { Download, Mail, MessageCircle, Phone } from 'lucide-react';
import type { Copy } from '../utils/types';

interface CTAProps {
  copy: Copy;
}

export function CTA({ copy }: CTAProps) {
  const { cta } = copy;

  return (
    <div className="container cta-responsive">
      <div className="cta-banner">
        <div className="cta-text">
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
        </div>
        <div className="cta-row">
          <a className="btn btn-primary" href={copy.contact.pwa} target="_blank" rel="noopener noreferrer">
            <Download size={18} />
            {cta.primary}
          </a>
          <a className="btn btn-ghost" href={copy.contact.playStore} target="_blank" rel="noopener noreferrer">
            <Download size={18} />
            {cta.secondary}
          </a>
          <a className="btn btn-ghost tertiary" href={copy.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} />
            {cta.tertiary}
          </a>
        </div>
        <div className="cta-contact chips">
          <span className="pill">
            <Phone size={14} className="rtl-flip" />{' '}
            <a href={`tel:${copy.contact.phone.replace(/\s+/g, '')}`}>{copy.contact.phone}</a>
          </span>
          <span className="pill">
            <Mail size={14} className="rtl-flip" />
            <a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a>
          </span>
        </div>
        <div className="cta-stats" aria-label={cta.statsLabel}>
          {cta.stats.map((stat) => (
            <div key={stat.label} className="cta-pill">
              <strong>{stat.value}</strong>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
        .cta-responsive .cta-banner {
          position: relative;
        }
        @media (max-width: 640px) {
          .cta-responsive .cta-banner {
            position: sticky;
            bottom: env(safe-area-inset-bottom, 0px);
            z-index: 10;
            padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          }
          .cta-responsive .cta-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .cta-responsive .cta-row .btn {
            width: 100%;
            justify-content: center;
          }
          .cta-responsive .cta-contact {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}
      </style>
    </div>
  );
}
