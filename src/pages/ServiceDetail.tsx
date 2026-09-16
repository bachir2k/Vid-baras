import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import { usePageReveal } from '../hooks/usePageReveal';
import { serviceDetails, clientTypeInfo } from '../lib/serviceDetails';
import { breadcrumbList } from '../lib/structuredData';
import { trackPhoneClick } from '../lib/analytics';

export default function ServiceDetailPage() {
  const { serviceKey } = useParams<{ serviceKey: string }>();
  const [clientType, setClientType] = useState<'particulier' | 'professionnel'>('particulier');

  const revealRoot = usePageReveal([
    { selector: '.js-reveal-hero', mode: 'load', translateY: 20, staggerMs: 100 },
    { selector: '.js-reveal-step', container: '.js-steps-section', staggerMs: 80 },
    { selector: '.js-reveal-specific', container: '.js-specifics-section', staggerMs: 70 },
    { selector: '.js-reveal-related', container: '.js-related-section', staggerMs: 90 },
  ]);

  const service = serviceKey ? serviceDetails[serviceKey] : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = service.icon;
  const client = clientTypeInfo[clientType];
  const ClientIcon = client.icon;

  const otherServices = Object.values(serviceDetails).filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div ref={revealRoot}>
      <SEO
        title={`${service.shortTitle} - Vidébarras Île-de-France`}
        description={`${service.tagline} Découvrez notre procédé en 6 étapes pour un ${service.shortTitle.toLowerCase()} rapide, discret et écologique en Île-de-France.`}
        canonical={`https://videbarras.fr/services/${service.slug}`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbList([
              { name: 'Accueil', url: 'https://videbarras.fr' },
              { name: 'Services', url: 'https://videbarras.fr/services' },
              { name: service.shortTitle, url: `https://videbarras.fr/services/${service.slug}` },
            ]),
          ],
        }}
      />

      <section
        className="relative h-screen w-full flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.55), rgba(15,23,42,0.75)), url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/services"
            className="js-reveal-hero inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous nos services
          </Link>

          <div className="js-reveal-hero inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-6">
            <ServiceIcon className="h-8 w-8 text-white" />
          </div>

          <h1 className="js-reveal-hero text-4xl md:text-6xl font-black text-white leading-tight mb-6 max-w-3xl">
            {service.shortTitle}
          </h1>
          <p className="js-reveal-hero text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-10">
            {service.tagline}
          </p>

          <div className="js-reveal-hero flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-primary hover:bg-blue-600 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+33695257352"
              onClick={() => trackPhoneClick('service_detail_hero')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border-2 border-white/30 transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              06 95 25 73 52
            </a>
          </div>
        </div>

        <ScrollDownIndicator />
      </section>

      <section className="js-steps-section py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold tracking-wider uppercase mb-3 block">
              Notre procédé
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {service.title}
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
            <div className="space-y-6">
              {service.steps.map((step) => (
                <div key={step.number} className="js-reveal-step relative flex gap-6 items-start">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="js-specifics-section py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold tracking-wider uppercase mb-3 block">
              Ce qui fait la différence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Spécificités de ce service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {service.specifics.map((specific) => (
              <div
                key={specific}
                className="js-reveal-specific flex items-center gap-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-5 border border-green-100 dark:border-green-900/30"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-slate-800 dark:text-slate-200">{specific}</span>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-sm border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setClientType('particulier')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    clientType === 'particulier'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Particulier
                </button>
                <button
                  onClick={() => setClientType('professionnel')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    clientType === 'professionnel'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Professionnel
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ClientIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{client.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {client.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {otherServices.length > 0 && (
        <section className="js-related-section py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Découvrez aussi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  to={`/services/${other.slug}`}
                  className="js-reveal-related group relative rounded-2xl overflow-hidden h-56 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${other.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all">
                      {other.shortTitle}
                      <ArrowRight className="h-4 w-4" />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary dark:bg-primary/90 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à passer à l'action ?</h2>
          <p className="text-white/90 text-lg mb-8">
            Recevez votre estimation gratuite pour votre {service.shortTitle.toLowerCase()} en moins de 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-slate-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-colors"
            >
              Devis Gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg transition-colors"
            >
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
