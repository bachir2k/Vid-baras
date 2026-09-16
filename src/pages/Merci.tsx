import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';
import { trackPhoneClick, trackWhatsappClick } from '../lib/analytics';

interface MerciState {
  name?: string;
  serviceType?: string;
  estimatedPrice?: string;
  phone?: string;
}

export default function Merci() {
  const location = useLocation();
  const state = (location.state as MerciState) || {};

  const whatsappMessage = encodeURIComponent('Bonjour, je viens de faire une demande de devis sur le site.');

  return (
    <>
      <SEO
        title="Demande reçue"
        description="Votre demande de devis de débarras a bien été envoyée. Notre équipe vous recontacte sous 24h."
        canonical="https://videbarras.fr/merci"
      />

      <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32">
        <div className="text-center bg-white dark:bg-[#1a2632] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Demande reçue !
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {state.name ? `Merci ${state.name}, votre` : 'Votre'} demande
            {state.serviceType ? ` de débarras (${state.serviceType})` : ''} a bien été enregistrée.
          </p>

          {state.estimatedPrice && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-900/40 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimation indicative</p>
              <p className="text-3xl font-bold text-blue-600">{state.estimatedPrice}</p>
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Un membre de notre équipe vous contactera dans les 24h
            {state.phone ? <> au <strong>{state.phone}</strong></> : ''} pour confirmer votre estimation et planifier l'intervention.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+33695257352"
              onClick={() => trackPhoneClick('merci_page')}
              className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
            >
              Appeler maintenant
            </a>
            <a
              href={`https://wa.me/33695257352?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('merci_page')}
              className="w-full sm:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
            >
              WhatsApp
            </a>
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
