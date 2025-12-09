import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Globe2, Menu, PhoneCall, X } from 'lucide-react';
import type { Copy, Language } from '../utils/types';

interface NavbarProps {
  copy: Copy;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Navbar({ copy, language, onLanguageChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={clsx('nav', { open: menuOpen })} role="banner">
      {menuOpen && <button className="nav-backdrop" aria-label={copy.aria.primaryNav} onClick={() => setMenuOpen(false)} />}
      <div className="nav-inner">
        <a className="brand" href="#hero" aria-label={copy.navigation.brand}>
          <span className="brand-mark">
            <img src="/images/fasket-logo.webp" alt={copy.navigation.brand} />
          </span>
          <span>{copy.navigation.brand}</span>
        </a>

        <div className="nav-right">
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>

          <div id="primary-nav" className={clsx('nav-drawer', { open: menuOpen })} data-open={menuOpen}>
            <nav aria-label={copy.aria.primaryNav} className="nav-links">
              {copy.navigation.links.map((link) => (
                <a key={link.id} href={`#${link.id}`} onClick={handleLinkClick}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <div className="lang-toggle" aria-label={copy.aria.languageSwitcher}>
                {(['ar', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setMenuOpen(false);
                    }}
                    aria-pressed={language === lang}
                    className={clsx({ active: language === lang })}
                    type="button"
                  >
                    <Globe2 size={16} className="rtl-flip" aria-hidden="true" />
                    {copy.language[lang]}
                  </button>
                ))}
              </div>
              <a className="pill" href={copy.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
                <PhoneCall size={16} />
                {copy.navigation.whatsapp}
              </a>
              <a className="btn btn-primary" href={copy.contact.pwa} target="_blank" rel="noopener noreferrer">
                {copy.navigation.download}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
