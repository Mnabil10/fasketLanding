import type { Copy } from '../utils/types';

interface ProductsProps {
  copy: Copy;
}

export function Products({ copy }: ProductsProps) {
  return (
    <div className="container products">
      <div className="section-head">
        <h2>{copy.products.title}</h2>
        <p>{copy.products.subtitle}</p>
      </div>
      <div className="product-grid">
        {copy.products.items.map((item) => (
          <div key={item.title} className="surface-card product-card fade-card">
            <div className="product-thumb" aria-hidden="true">
              <span className="floating-dot dot-1" />
              <span className="floating-dot dot-2" />
              <span className="floating-dot dot-3" />
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="product-copy">
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
