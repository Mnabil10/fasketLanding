import { MessageCircle } from 'lucide-react';
import type { Copy } from '../utils/types';

interface FloatingWhatsAppProps {
  copy: Copy;
}

export function FloatingWhatsApp({ copy }: FloatingWhatsAppProps) {
  return (
    <a
      className="floating-wa"
      href={copy.contact.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsapp.label}
    >
      <MessageCircle size={20} />
      <span>{copy.whatsapp.label}</span>
    </a>
  );
}
