import { useEffect, useMemo, useState } from 'react';
import ar from './locales/ar.json';
import en from './locales/en.json';
import type { Copy, Language } from './utils/types';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { SectionShell } from './components/SectionShell';
import { WhyFasket } from './sections/WhyFasket';
import { Steps } from './sections/Steps';
import { AppFeatures } from './sections/AppFeatures';
import { AppShowcase } from './sections/AppShowcase';
import { Products } from './sections/Products';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const copies: Record<Language, Copy> = {
  en,
  ar,
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ar';
    const saved = window.localStorage.getItem('fasket-lang');
    return (saved as Language) || 'ar';
  });

  const copy = useMemo(() => copies[language], [language]);

  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.classList.toggle('rtl', language === 'ar');
    window.localStorage.setItem('fasket-lang', language);
  }, [language]);

  useEffect(() => {
    document.title = copy.meta.title;
    updateMeta('description', copy.meta.description);
    updateMeta('keywords', copy.meta.keywords);
    updateMeta('og:title', copy.meta.ogTitle, true);
    updateMeta('og:description', copy.meta.ogDescription, true);
    updateMeta('og:image', copy.meta.ogImage, true);
    updateMeta('og:locale', language === 'ar' ? 'ar_EG' : 'en_US', true);
    updateMeta('og:locale:alternate', language === 'ar' ? 'en_US' : 'ar_EG', true);
    updateMeta('twitter:title', copy.meta.ogTitle);
    updateMeta('twitter:description', copy.meta.ogDescription);
    updateMeta('twitter:image', copy.meta.ogImage);
  }, [copy, language]);

  return (
    <div className="page">
      <Navbar copy={copy} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero copy={copy} />
        <SectionShell id="why">
          <WhyFasket copy={copy} />
        </SectionShell>
        <SectionShell id="steps">
          <Steps copy={copy} />
        </SectionShell>
        <SectionShell id="features">
          <AppFeatures copy={copy} />
        </SectionShell>
        <SectionShell id="screens">
          <AppShowcase copy={copy} />
        </SectionShell>
        <SectionShell id="products">
          <Products copy={copy} />
        </SectionShell>
        <SectionShell id="reviews">
          <Testimonials copy={copy} />
        </SectionShell>
        <SectionShell id="faq">
          <FAQ copy={copy} />
        </SectionShell>
        <SectionShell id="cta">
          <CTA copy={copy} />
        </SectionShell>
      </main>
      <Footer copy={copy} />
      <FloatingWhatsApp copy={copy} />
    </div>
  );
}

function updateMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    if (property) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
