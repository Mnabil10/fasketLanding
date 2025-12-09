import { Download, Facebook, Instagram, Link as LinkIcon, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import type { Copy } from '../utils/types';

interface FooterProps {
  copy: Copy;
}

export function Footer({ copy }: FooterProps) {
  const { footer, navigation, contact } = copy;

  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <span className="brand-mark">
              <img src="/images/fasket-logo.webp" alt={navigation.brand} />
            </span>
            <span>{navigation.brand}</span>
          </div>
          <p>{footer.tagline}</p>
          <div className="chips">
            <span className="pill">
              <MapPin size={14} className="rtl-flip" /> {footer.address}
            </span>
            <span className="pill">
              <Phone size={14} className="rtl-flip" />{' '}
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </span>
            <span className="pill">
              <Mail size={14} className="rtl-flip" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </span>
          </div>
        </div>
        <div>
          <h3>{footer.linksTitle}</h3>
          <div className="chips">
            {footer.links.map((link) => (
              <a key={link.target} href={`#${link.target}`} className="pill">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>{footer.appLinksTitle}</h3>
          <div className="chips">
            <a className="pill" href={contact.pwa} target="_blank" rel="noopener noreferrer">
              <LinkIcon size={14} className="rtl-flip" /> {footer.openWeb}
            </a>
            <a className="pill" href={contact.playStore} target="_blank" rel="noopener noreferrer">
              <Download size={14} /> {footer.downloadAndroid}
            </a>
            <a className="pill" href={contact.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} /> {navigation.whatsapp}
            </a>
          </div>
        </div>
        <div>
          <h3>{footer.newsletter}</h3>
          <form
            className="newsletter"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {copy.aria.newsletter}
            </label>
            <input id="newsletter-email" type="email" name="email" placeholder={footer.newsletterPlaceholder} />
            <button type="submit" className="btn btn-primary" aria-label={copy.aria.newsletter}>
              <Mail size={16} />
            </button>
          </form>
          <div className="social-row" aria-label={footer.socialTitle}>
            <a href="https://facebook.com" className="pill" target="_blank" rel="noopener noreferrer">
              <Facebook size={16} />
            </a>
            <a href="https://instagram.com" className="pill" target="_blank" rel="noopener noreferrer">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>{footer.copyright}</small>
      </div>
    </footer>
  );
}
