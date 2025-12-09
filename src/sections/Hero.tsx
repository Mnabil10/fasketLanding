import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  MessageCircle,
  Smartphone,
} from 'lucide-react';
import type { Copy } from '../utils/types';

type DeviceType = 'android' | 'ios' | 'desktop';

interface HeroProps {
  copy: Copy;
}

export function Hero({ copy }: HeroProps) {
  const { hero } = copy;
  const [activeIndex, setActiveIndex] = useState(0);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isRtl = copy.lang === 'ar';

  useEffect(() => {
    setDeviceType(detectDevice());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % hero.screens.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [hero.screens.length, prefersReducedMotion, isPaused]);

  const ctas = useMemo(() => getCtas(deviceType, copy), [deviceType, copy]);

  const slide = (direction: 'prev' | 'next') => {
    setActiveIndex((prev) => {
      const total = hero.screens.length;
      if (direction === 'prev') {
        return prev === 0 ? total - 1 : prev - 1;
      }
      return (prev + 1) % total;
    });
  };

  return (
    <section id="hero" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <MapPin size={16} className="rtl-flip" />
            {hero.eyebrow}
          </span>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="badge">
            <MapPin size={14} className="rtl-flip" />
            {hero.location}
          </div>
          <div className="cta-row hero-actions">
            {ctas.primary && (
              <a
                className="btn btn-primary"
                href={ctas.primary.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                {ctas.primary.label}
              </a>
            )}
            {ctas.secondary &&
              (ctas.secondary.disabled ? (
                <button className="btn btn-ghost is-disabled" type="button" disabled aria-disabled="true">
                  <Smartphone size={18} />
                  {ctas.secondary.label}
                </button>
              ) : (
                <a className="btn btn-ghost" href={ctas.secondary.href} target="_blank" rel="noopener noreferrer">
                  <Smartphone size={18} />
                  {ctas.secondary.label}
                </a>
              ))}
            <a className="btn btn-ghost tertiary" href={copy.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
              {hero.cta.whatsapp}
            </a>
          </div>
          <div className="metrics" aria-label={hero.metricsLabel}>
            {hero.metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span className="muted">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-ambient ambient-1" aria-hidden="true" />
          <div className="hero-ambient ambient-2" aria-hidden="true" />
          <div className="glow" />
          <div className="phone-frame">
            <div className="phone-top">
              <span className="pill">{copy.navigation.brand}</span>
              <span className="pill soft">
                <MapPin size={14} className="rtl-flip" /> {copy.contact.city}
              </span>
            </div>
            <div
              className="screen-window"
              aria-label={hero.sliderLabel}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={() => setIsPaused(false)}
            >
              <div
                className="screen-track"
                style={{ transform: `translateX(${isRtl ? activeIndex * 100 : -activeIndex * 100}%)` }}
              >
                {hero.screens.map((screen, index) => {
                  const src = screen.src || `/images/app-screen-${index + 1}.webp`;
                  return (
                    <picture key={src} className="screen">
                      <source srcSet={src} type="image/webp" />
                      <img
                        src={src}
                        alt={screen.alt}
                        loading="eager"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.src = '/images/Home.webp';
                        }}
                      />
                    </picture>
                  );
                })}
              </div>
            </div>
            <div className="hero-slider-controls" aria-label={hero.sliderLabel}>
              <button type="button" onClick={() => slide('prev')} aria-label={hero.prevLabel}>
                <ChevronLeft size={18} className="rtl-flip" />
              </button>
              <div className="dots">
                {hero.screens.map((screen, index) => (
                  <button
                    key={screen.alt}
                    type="button"
                    className={index === activeIndex ? 'active' : ''}
                    aria-label={`${hero.sliderLabel} ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <button type="button" onClick={() => slide('next')} aria-label={hero.nextLabel}>
                <ChevronRight size={18} className="rtl-flip" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function detectDevice(): DeviceType {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || navigator.vendor || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  return 'desktop';
}

function getCtas(deviceType: DeviceType, copy: Copy) {
  const { hero } = copy;
  const pwa = copy.contact.pwa;
  const playStore = copy.contact.playStore;

  if (deviceType === 'android') {
    return {
      primary: { label: hero.cta.androidPrimary, href: playStore },
      secondary: { label: hero.cta.pwaShort, href: pwa },
    };
  }

  if (deviceType === 'ios') {
    return {
      primary: { label: hero.cta.pwaPrimary, href: pwa },
      secondary: { label: hero.cta.iosStore, href: '#', disabled: true },
    };
  }

  return {
    primary: { label: hero.cta.desktopPrimary, href: pwa },
    secondary: { label: hero.cta.androidPrimary, href: playStore },
  };
}
