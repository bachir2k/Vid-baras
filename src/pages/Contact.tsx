import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import IleDeFranceMap from '../components/IleDeFranceMap';
import Dropdown from '../components/Dropdown';
import { breadcrumbList } from '../lib/structuredData';
import { supabase } from '../lib/supabase';
import {
  contactFormSchema,
  getFieldErrors,
  formatFrenchPhoneAsYouType,
  type ContactFormData,
} from '../lib/validation';
import { usePageReveal } from '../hooks/usePageReveal';
import { trackPhoneClick } from '../lib/analytics';

const initialFormData: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  propertyType: 'Appartement',
  surface: '',
  message: '',
};

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const revealRoot = usePageReveal([
    { selector: '.js-reveal-hero', mode: 'load', translateY: 22, staggerMs: 110 },
    { selector: '.js-reveal-form', container: '.js-reveal-form' },
    { selector: '.js-reveal-sidebar', container: '.js-sidebar', staggerMs: 120 },
  ]);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    const fieldSchema = contactFormSchema.shape[field];
    const result = fieldSchema.safeParse(formData[field]);
    setErrors(prev => {
      const next = { ...prev };
      if (result.success) {
        delete next[field];
      } else {
        next[field] = result.error.issues[0]?.message ?? 'Valeur invalide';
      }
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fieldErrors = getFieldErrors(contactFormSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('estimations').insert({
        service_type: formData.propertyType || 'Autre',
        service_details: {
          surface: formData.surface || null,
          message: formData.message || null,
          source: 'page_contact',
        },
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        status: 'new',
      });

      if (error) throw error;

      // Notification par email (fonction Edge dédiée au formulaire de contact).
      // Non bloquant : la demande est déjà enregistrée ci-dessus même si l'email échoue.
      const { error: mailError } = await supabase.functions.invoke('devis-mail', {
        body: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          property_type: formData.propertyType,
          surface: formData.surface || null,
          message: formData.message || null,
        },
      });

      if (mailError) {
        console.error('Erreur lors de l\'envoi de l\'email de notification (devis-mail):', mailError);
      }

      navigate('/merci', {
        state: {
          name: formData.name,
          phone: formData.phone,
        },
      });
    } catch (err) {
      console.error('Erreur lors de l\'envoi du formulaire de contact:', err);
      setSubmitError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous appeler directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact & Devis Gratuit"
        description="Contactez Vidébarras pour un devis gratuit de débarras en Île-de-France. Téléphone : 06 95 25 73 52. Réponse rapide sous 24h, intervention dans toute l'Île-de-France (75, 92, 93, 94, 77, 78, 91, 95)."
        keywords="devis débarras gratuit, contact débarras paris, estimation débarras ile de france, prix débarras, tarif débarras appartement, devis débarras maison, téléphone débarras"
        canonical="https://videbarras.fr/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbList([
              { name: 'Accueil', url: 'https://videbarras.fr' },
              { name: 'Contact', url: 'https://videbarras.fr/contact' },
            ]),
          ],
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        body {
          font-family: 'Inter', 'Noto Sans', sans-serif;
        }

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div ref={revealRoot} className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white">
        <div className="flex flex-col min-h-screen relative overflow-x-hidden font-display">
          <main className="flex-grow flex flex-col">
            <section
              className="relative h-screen w-full flex items-center justify-center text-center px-4 sm:px-8 overflow-hidden"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-[960px] w-full flex flex-col items-center gap-4">
                <span className="js-reveal-hero inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                  <span className="material-symbols-outlined !text-[18px] text-green-400">check_circle</span>
                  Disponible 7j/7 &middot; Intervention en moins de 2h
                </span>
                <h1 className="js-reveal-hero text-white text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em] max-w-3xl">
                  Contactez Vidébarras
                </h1>
                <p className="js-reveal-hero text-white/85 text-lg lg:text-xl font-normal leading-normal max-w-2xl">
                  Une réponse rapide et un devis 100% gratuit pour tous vos besoins de débarras en Île-de-France.
                </p>

                <div className="js-reveal-hero flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <a
                    href="tel:+33695257352"
                    onClick={() => trackPhoneClick('contact_hero')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-primary hover:bg-blue-600 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="material-symbols-outlined">call</span>
                    06 95 25 73 52
                  </a>
                  <a
                    href="#formulaire-devis"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl border-2 border-white/30 transition-all duration-300"
                  >
                    Remplir le formulaire
                    <span className="material-symbols-outlined">arrow_downward</span>
                  </a>
                </div>

                <div className="js-reveal-hero flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 !text-[20px]">currency_exchange</span>
                    Devis 100% gratuit
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 !text-[20px]">schedule</span>
                    Réponse sous 24h
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 !text-[20px]">map</span>
                    Toute l'Île-de-France
                  </div>
                </div>
              </div>

              <ScrollDownIndicator />
            </section>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 xl:col-span-8">
                  <div id="formulaire-devis" className="js-reveal-form bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8 scroll-mt-24">
                    <div className="mb-8">
                      <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight mb-2">Demande de devis gratuit</h2>
                      <p className="text-[#4c739a] dark:text-gray-400">Remplissez le formulaire ci-dessous pour recevoir une estimation précise.</p>
                    </div>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
                          {submitError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3">
                              {submitError}
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <label className="flex flex-col gap-2">
                              <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Nom complet <span className="text-red-500">*</span></span>
                              <input
                                className={`form-input w-full rounded-lg border bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:ring-1 transition-colors outline-none placeholder:text-gray-400 ${
                                  errors.name
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                                    : 'border-[#cfdbe7] dark:border-gray-600 focus:border-primary focus:ring-primary'
                                }`}
                                placeholder="Jean Dupont"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                onBlur={() => handleBlur('name')}
                              />
                              {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
                            </label>
                            <label className="flex flex-col gap-2">
                              <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Numéro de téléphone <span className="text-red-500">*</span></span>
                              <input
                                className={`form-input w-full rounded-lg border bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:ring-1 transition-colors outline-none placeholder:text-gray-400 ${
                                  errors.phone
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                                    : 'border-[#cfdbe7] dark:border-gray-600 focus:border-primary focus:ring-primary'
                                }`}
                                placeholder="06 12 34 56 78"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', formatFrenchPhoneAsYouType(e.target.value))}
                                onBlur={() => handleBlur('phone')}
                              />
                              {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
                            </label>
                          </div>
                          <label className="flex flex-col gap-2">
                            <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Email <span className="text-red-500">*</span></span>
                            <input
                              className={`form-input w-full rounded-lg border bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:ring-1 transition-colors outline-none placeholder:text-gray-400 ${
                                errors.email
                                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                                  : 'border-[#cfdbe7] dark:border-gray-600 focus:border-primary focus:ring-primary'
                              }`}
                              placeholder="jean.dupont@email.com"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              onBlur={() => handleBlur('email')}
                            />
                            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Dropdown
                              label="Type de local"
                              options={['Appartement', 'Maison', 'Cave / Grenier', 'Bureaux / Locaux pro', 'Autre']}
                              value={formData.propertyType || 'Appartement'}
                              onChange={(val) => handleChange('propertyType', val)}
                            />
                            <label className="flex flex-col gap-2">
                              <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Surface approximative (m²)</span>
                              <input
                                className={`form-input w-full rounded-lg border bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:ring-1 transition-colors outline-none placeholder:text-gray-400 ${
                                  errors.surface
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                                    : 'border-[#cfdbe7] dark:border-gray-600 focus:border-primary focus:ring-primary'
                                }`}
                                placeholder="Ex: 50"
                                type="number"
                                value={formData.surface}
                                onChange={(e) => handleChange('surface', e.target.value)}
                                onBlur={() => handleBlur('surface')}
                              />
                              {errors.surface && <p className="text-red-600 text-xs">{errors.surface}</p>}
                            </label>
                          </div>
                          <label className="flex flex-col gap-2">
                            <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Message ou détails supplémentaires</span>
                            <textarea
                              className="form-textarea w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400 min-h-[120px] resize-y"
                              placeholder="Décrivez votre besoin (accès difficile, objets lourds, ascenseur, etc.)..."
                              value={formData.message}
                              onChange={(e) => handleChange('message', e.target.value)}
                            ></textarea>
                          </label>
                          <div className="pt-4">
                            <button
                              className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <span className="material-symbols-outlined">send</span>
                              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            </button>
                          <p className="text-xs text-gray-400 mt-3 text-center md:text-left">* Vos données personnelles sont confidentielles et ne seront jamais partagées.</p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="js-sidebar lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                  <div className="js-reveal-sidebar bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10">
                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-6">Nos coordonnées</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-primary shrink-0">
                          <span className="material-symbols-outlined">phone_in_talk</span>
                        </div>
                        <div>
                          <p className="text-sm text-[#4c739a] dark:text-gray-400 font-medium mb-1">Téléphone</p>
                          <a className="text-lg font-bold text-[#0d141b] dark:text-white hover:text-primary transition-colors" href="tel:+33695257352" onClick={() => trackPhoneClick('contact_info_card')}>06 95 25 73 52</a>
                          <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Disponible 7j/7
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-primary shrink-0">
                          <span className="material-symbols-outlined">mail</span>
                        </div>
                        <div>
                          <p className="text-sm text-[#4c739a] dark:text-gray-400 font-medium mb-1">Email</p>
                          <a className="text-lg font-bold text-[#0d141b] dark:text-white hover:text-primary transition-colors break-all" href="mailto:contact@vidébarras.fr">contact@vidébarras.fr</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-primary shrink-0">
                          <span className="material-symbols-outlined">map</span>
                        </div>
                        <div>
                          <p className="text-sm text-[#4c739a] dark:text-gray-400 font-medium mb-1">Zone d'intervention</p>
                          <p className="text-base font-bold text-[#0d141b] dark:text-white">Toute l'Île-de-France</p>
                          <p className="text-sm text-[#4c739a] dark:text-gray-400">Paris, Hauts-de-Seine, Yvelines...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="js-reveal-sidebar grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-4 rounded-xl border border-[#cfdbe7] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 shadow-sm">
                      <div className="text-primary bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
                        <span className="material-symbols-outlined">currency_exchange</span>
                      </div>
                      <div>
                        <h4 className="text-[#0d141b] dark:text-white text-sm font-bold">Devis 100% Gratuit</h4>
                        <p className="text-[#4c739a] dark:text-gray-400 text-xs">Aucun frais caché</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-[#cfdbe7] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 shadow-sm">
                      <div className="text-primary bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div>
                        <h4 className="text-[#0d141b] dark:text-white text-sm font-bold">Réponse sous 24h</h4>
                        <p className="text-[#4c739a] dark:text-gray-400 text-xs">Réactivité garantie</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-[#cfdbe7] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-4 shadow-sm">
                      <div className="text-primary bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
                        <span className="material-symbols-outlined">local_shipping</span>
                      </div>
                      <div>
                        <h4 className="text-[#0d141b] dark:text-white text-sm font-bold">Intervention Rapide</h4>
                        <p className="text-[#4c739a] dark:text-gray-400 text-xs">Véhicules adaptés</p>
                      </div>
                    </div>
                  </div>

                  <div className="js-reveal-sidebar rounded-2xl overflow-hidden shadow-sm relative border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                    <div className="relative">
                      <IleDeFranceMap
                        selectedDept={null}
                        hoveredDept={hoveredDept}
                        onDeptClick={() => {}}
                        onDeptHover={setHoveredDept}
                      />
                      <div className="mt-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                        <p className="text-xs font-bold text-center text-white flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                          8 départements couverts &middot; Paris &amp; toute l'Île-de-France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}