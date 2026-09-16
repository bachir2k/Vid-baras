import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { trackPhoneClick, trackWhatsappClick } from '../lib/analytics';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const contactInfo = {
    email: 'contact@vidébarras.fr',
    phone: '+33695257352',
    whatsapp: '+33695257352',
    tiktok: 'https://www.tiktok.com/@roiddebarras'
  };

  const whatsappMessage = encodeURIComponent('Bonjour, je souhaite un renseignement pour un débarras.');

  const contacts = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}?text=${whatsappMessage}`,
      onClick: () => trackWhatsappClick('floating_contact'),
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Appeler',
      icon: Phone,
      href: `tel:${contactInfo.phone}`,
      onClick: () => trackPhoneClick('floating_contact'),
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${contactInfo.email}`,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      href: contactInfo.tiktok,
      color: 'bg-gray-900 hover:bg-black',
    }
  ];

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('.js-contact-item');
    if (!items || items.length === 0) return;

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        item.style.opacity = isOpen ? '1' : '0';
      });
      return;
    }

    if (isOpen) {
      animate(items, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.6, 1],
        duration: 400,
        ease: 'outBack',
        delay: stagger(60),
      });
    } else {
      animate(items, {
        opacity: [1, 0],
        translateY: [0, 18],
        scale: [1, 0.6],
        duration: 220,
        ease: 'inQuad',
        delay: stagger(40, { from: 'last' }),
      });
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (buttonRef.current && !prefersReducedMotion()) {
      animate(buttonRef.current, {
        scale: [1, 0.85, 1.1, 1],
        duration: 450,
        ease: 'outElastic(1, .6)',
      });
    }
  };

  const handleIconEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion()) return;
    const icon = e.currentTarget.querySelector('.js-contact-icon');
    if (icon) {
      animate(icon, { scale: [1, 1.3], rotate: [0, -14], duration: 300, ease: 'outBack' });
    }
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion()) return;
    const icon = e.currentTarget.querySelector('.js-contact-icon');
    if (icon) {
      animate(icon, { scale: 1, rotate: 0, duration: 300, ease: 'outQuad' });
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <div ref={listRef} className="flex flex-col items-end gap-3">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              onClick={contact.onClick}
              onMouseEnter={handleIconEnter}
              onMouseLeave={handleIconLeave}
              target={contact.name === 'TikTok' ? '_blank' : undefined}
              rel={contact.name === 'TikTok' ? 'noopener noreferrer' : undefined}
              className={`
                js-contact-item
                ${contact.color}
                flex items-center gap-0 sm:hover:gap-3 px-4 py-3 rounded-full text-white shadow-lg
                transition-all duration-300 ease-out transform
                hover:shadow-xl hover:scale-105
                ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
                group
              `}
              style={{ opacity: 0 }}
            >
              <span className="hidden sm:inline-block text-sm font-semibold whitespace-nowrap overflow-hidden max-w-0 opacity-0 sm:group-hover:max-w-xs sm:group-hover:opacity-100 transition-all duration-300 ease-out">
                {contact.name}
              </span>
              <div className="js-contact-icon w-5 h-5 flex items-center justify-center">
                {typeof contact.icon === 'function' ? (
                  <contact.icon />
                ) : (
                  <contact.icon className="w-5 h-5" />
                )}
              </div>
            </a>
          ))}
        </div>

        <button
          ref={buttonRef}
          onClick={handleToggle}
          className={`
            bg-primary hover:bg-primary/90 text-white
            w-14 h-14 rounded-full shadow-2xl
            flex items-center justify-center
            transition-all duration-300 transform hover:scale-110
            ${isOpen ? 'rotate-90' : 'rotate-0'}
          `}
          aria-label="Ouvrir le menu de contact"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
