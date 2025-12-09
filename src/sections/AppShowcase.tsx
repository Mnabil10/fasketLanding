import type { Copy } from '../utils/types';

interface AppShowcaseProps {
  copy: Copy;
}

export function AppShowcase({ copy }: AppShowcaseProps) {
  const screens = copy.hero.screens;

  return (
    <div className="container app-showcase">
      <div className="section-head">
        <h2>{copy.appShowcase.title}</h2>
        <p>{copy.appShowcase.subtitle}</p>
      </div>
      <div className="screen-strip" aria-label={copy.appShowcase.title}>
        {screens.map((screen, index) => (
          <figure key={screen.alt + index} className="surface-card screen-card fade-card">
            <picture>
              <source srcSet={screen.src} type="image/webp" />
              <img src={screen.src} alt={screen.alt} loading="lazy" />
            </picture>
            <figcaption className="muted">{screen.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
