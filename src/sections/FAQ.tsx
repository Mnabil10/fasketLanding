import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { Copy } from '../utils/types';

interface FAQProps {
  copy: Copy;
}

export function FAQ({ copy }: FAQProps) {
  const { faq } = copy;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container">
      <div className="section-head">
        <HelpCircle size={28} className="rtl-flip" aria-hidden="true" />
        <h2>{faq.title}</h2>
        <p>{faq.subtitle}</p>
      </div>
      <div className="faq-list">
        {faq.items.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <div key={item.q} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`faq-chevron ${isOpen ? 'open' : ''} rtl-flip`}
                  aria-hidden="true"
                />
              </button>
              <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
