import { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface SectionShellProps extends PropsWithChildren {
  id: string;
  className?: string;
}

export function SectionShell({ id, className, children }: SectionShellProps) {
  const supportsIO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
  const [isVisible, setIsVisible] = useState(() => !supportsIO);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!supportsIO) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const fallback = window.setTimeout(() => setIsVisible(true), 1500);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            window.clearTimeout(fallback);
          }
        });
      },
      { rootMargin: '180px 0px' },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [supportsIO]);

  const composedClass = className ? `section-shell ${className}` : 'section-shell';

  return (
    <section id={id} ref={ref} className={composedClass} data-visible={isVisible}>
      {children}
    </section>
  );
}
