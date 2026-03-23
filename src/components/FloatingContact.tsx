import { useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    email: 'contact@roiddebarras.fr',
    phone: '+33123456789',
    whatsapp: '+33123456789',
    tiktok: 'https://www.tiktok.com/@roiddebarras'
  };

  const whatsappMessage = encodeURIComponent('Bonjour, je souhaite un renseignement pour un débarras.');

  const contacts = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, '')}?text=${whatsappMessage}`,
      color: 'bg-green-500 hover:bg-green-600',
      delay: 'delay-75'
    },
    {
      name: 'Appeler',
      icon: Phone,
      href: `tel:${contactInfo.phone}`,
      color: 'bg-blue-500 hover:bg-blue-600',
      delay: 'delay-100'
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${contactInfo.email}`,
      color: 'bg-red-500 hover:bg-red-600',
      delay: 'delay-150'
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
      delay: 'delay-200'
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.href}
            target={contact.name === 'TikTok' ? '_blank' : undefined}
            rel={contact.name === 'TikTok' ? 'noopener noreferrer' : undefined}
            className={`
              ${contact.color} ${contact.delay}
              flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg
              transition-all duration-300 transform
              ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
              hover:scale-105 hover:shadow-xl
              group
            `}
          >
            <span className="text-sm font-semibold whitespace-nowrap hidden sm:block group-hover:block">
              {contact.name}
            </span>
            <div className="w-5 h-5 flex items-center justify-center">
              {typeof contact.icon === 'function' ? (
                <contact.icon />
              ) : (
                <contact.icon className="w-5 h-5" />
              )}
            </div>
          </a>
        ))}

        <button
          onClick={() => setIsOpen(!isOpen)}
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
