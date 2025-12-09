import { Quote, Star } from 'lucide-react';
import type { Copy } from '../utils/types';

interface TestimonialsProps {
  copy: Copy;
}

export function Testimonials({ copy }: TestimonialsProps) {
  const { testimonials } = copy;

  return (
    <div className="container">
      <div className="section-head">
        <h2>{testimonials.title}</h2>
        <p>{testimonials.subtitle}</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.items.map((item) => (
          <article key={item.name} className="surface-card testimonial-card fade-card" aria-label={copy.aria.testimonial}>
            <div className="testimonial-top">
              <div className="avatar" aria-hidden="true">
                {item.name.charAt(0)}
              </div>
              <div className="stars" aria-label={`${item.rating} ${copy.aria.ratingStars}`}>
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={18} stroke="var(--fasket-primary)" fill="var(--fasket-primary)" />
                ))}
              </div>
            </div>
            <p>{item.quote}</p>
            <div className="testimonial-footer">
              <strong>{item.name}</strong>
              <div className="muted">{item.role}</div>
            </div>
            <Quote size={22} className="quote-mark rtl-flip" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}
