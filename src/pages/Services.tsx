import { Link } from 'react-router-dom';
import FloatingContact from '../components/FloatingContact';
import ServicesSection from '../components/ServicesSection';
import SEO from '../components/SEO';
import { serviceData, breadcrumbList } from '../lib/structuredData';

export default function Services() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <SEO
        title="Nos Services de Débarras en Île-de-France"
        description="Découvrez tous nos services de débarras : appartement, maison, cave, grenier, bureaux, locaux professionnels, syndrome de Diogène. Service clé en main, rapide et écologique en Île-de-France (75, 92, 93, 94, 77, 78, 91, 95)."
        keywords="débarras appartement paris, débarras maison ile de france, débarras cave 92, débarras grenier 93, débarras bureau 94, débarras professionnel, débarras commercial, syndrome diogène, nettoyage après débarras, vider appartement paris"
        canonical="https://videbarras.fr/services"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            serviceData,
            breadcrumbList([
              { name: 'Accueil', url: 'https://videbarras.fr' },
              { name: 'Services', url: 'https://videbarras.fr/services' },
            ]),
          ],
        }}
      />
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <main className="flex flex-col grow">
        <div className="px-4 py-8 sm:px-10 md:py-12 bg-background-light dark:bg-background-dark">
          <div className="mx-auto max-w-[1200px]">
            <div
              className="relative overflow-hidden rounded-2xl bg-slate-900 text-white min-h-[480px] flex flex-col items-center justify-center p-8 text-center"
              role="img"
              aria-label="Équipe professionnelle de déménagement souriante"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpDFSDopBdXE8LqGBMVzeXtdW0djllFOLybTW0c-4nv9eHc4XcUOWx0glZpsc0afrG50H4Eq6A_zF35zuUxH7ybW_2NxHNzH6A-ju_ylvEFeSSvJz1_omBXrYkbpMr8SgTj-ZndHS6jDTM4rrRxC47lTnn7sEmke96RfQ80-tlIYxAzfCpEbx0Zo0Uw0PpfFb6dpg5wOoUXL14IiY2HTDwjQb9Gn2jUgUjGBmmoIkxbKEtd-AVS-ghcsUr5xOSrjDI1Q8hCai3khSh")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="max-w-[720px] flex flex-col gap-6 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  <span className="text-primary">Videbarras</span> Team
                </h1>
                <p className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed">
                  Que vous soyez particulier ou professionnel, nous intervenons rapidement pour vider, trier et nettoyer vos espaces encombrés. Service clé en main et éco-responsable.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-base transition-colors shadow-lg"
                  >
                    Demander un devis
                  </Link>
                  <Link
                    to="/realisations"
                    className="h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold text-base border border-white/30 transition-colors flex items-center justify-center"
                  >
                    Voir nos réalisations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 md:py-16 px-4 sm:px-10">
          <div className="mx-auto max-w-[960px] text-center">
            <h2 className="text-primary text-sm font-bold tracking-wider uppercase mb-3">Notre Mission</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              "Libérer de l'espace pour libérer l'esprit"
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Fondée avec l'idée que le débarras ne devrait pas être une corvée stressante,
              <span className="font-bold text-slate-900 dark:text-white"> Vidébarras</span> transforme le chaos en clarté.
              Nous ne faisons pas que jeter ; nous trions, valorisons et recyclons pour donner une seconde vie à vos objets
              tout en vous offrant un service impeccable en Île-de-France.
            </p>
          </div>
        </section>

        <ServicesSection />

        <section className="py-12 md:py-16 px-4 sm:px-10 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-900">
          <div className="mx-auto max-w-[960px]">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Besoin d'un débarras ? Contactez-nous
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Choisissez votre moyen de contact préféré et obtenez une réponse rapide
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="https://wa.me/+33695257352?text=Bonjour%2C%20je%20souhaite%20un%20renseignement%20pour%20un%20d%C3%A9barras."
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">WhatsApp</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Message instantané</p>
                  </div>
                </div>
              </a>

              <a
                href="tel:+33695257352"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Appeler</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Réponse immédiate</p>
                  </div>
                </div>
              </a>

              <a
                href="mailto:Contact@vidédarras.fr"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-red-500"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Devis détaillé</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.tiktok.com/@videbarras"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-gray-900 dark:hover:border-gray-700"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-gray-900 dark:text-gray-100" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">TikTok</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Nos réalisations</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Disponibles du lundi au samedi • Réponse sous 2h en moyenne
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-10">
            <div className="flex flex-col gap-10">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Nos Valeurs Fondamentales</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
                  Ce qui nous guide au quotidien pour vous offrir le meilleur service possible.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 p-6 hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined">eco</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Respect de l'environnement</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Nous recyclons ou donnons <span className="font-semibold text-primary">80% des objets collectés</span> à des associations locales pour minimiser l'impact écologique.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 p-6 hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Professionnalisme</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Une intervention rapide sous 24-48h en Île-de-France, réalisée par des équipes formées, assurées et respectueuses des lieux.
                    </p>
                  </div>
                </div>
                <div className="group flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 p-6 hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Satisfaction Client</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Des devis clairs, sans frais cachés, et un service avec le sourire. Votre tranquillité d'esprit est notre priorité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-10 bg-background-light dark:bg-background-dark">
          <div className="mx-auto max-w-[960px]">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Notre Histoire</h2>
            <div className="relative pl-4 sm:pl-0">
              <div className="grid grid-cols-[40px_1fr] gap-x-6">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-primary z-10">
                    <span className="material-symbols-outlined text-xl">lightbulb</span>
                  </div>
                  <div className="w-0.5 bg-slate-300 dark:bg-slate-700 h-full min-h-[60px]"></div>
                </div>
                <div className="pb-8 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Création de l'entreprise</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">2015</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Lancement du projet avec un seul camion et une volonté de modernisation du secteur.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-primary z-10">
                    <span className="material-symbols-outlined text-xl">local_shipping</span>
                  </div>
                  <div className="w-0.5 bg-slate-300 dark:bg-slate-700 h-full min-h-[60px]"></div>
                </div>
                <div className="pb-8 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Flotte Écologique</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">2017</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Acquisition des premiers véhicules utilitaires hybrides et mise en place de partenariats de recyclage.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-primary z-10">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div className="w-0.5 bg-slate-300 dark:bg-slate-700 h-full min-h-[60px]"></div>
                </div>
                <div className="pb-8 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Extension Île-de-France</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">2019</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Couverture de tous les départements (75, 92, 93, 94, 91, 95, 78, 77) avec des équipes locales.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-primary z-10">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">1000ème Client Satisfait</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">2023</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Une étape majeure qui confirme notre position de leader local du débarras responsable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 px-4 sm:px-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover  bg-center"
              role="img"
              aria-label="Texture nature verte abstraite"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJlgJeEn_7xceGHf6xHOMYKtMn6jMKLVuYzFuu1x4UoAnokpRqIWez46A-8qeVBdeBryK4wr6tQvmYdq-GInnip9TibH7wlblxv8lSQlohJ3_VzYi5cMmZXeYawtVMGk-xoAa3r6TAcS4bI0wj28--wYw5721tnh3DSxdM0BpCHoFmubYNJhEpfgM_Sov1mqTAB-ydK4H-LBV1GabiEqXQ9uHdmqH6IUesXr92qPnc3BB5iw7Y9mLBfbHLnwMgFk-HruujZdpKIFTI')",
                opacity: 0.1
              }}
            >
            </div>
            <div className="absolute inset-0 bg-green-50/80 dark:bg-green-950/80 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px] flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-bold">
                <span className="material-symbols-outlined text-sm">recycling</span>
                Engagement Écologique
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Nous trions pour vous, pour la planète.</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                Chaque intervention est l'occasion de réduire les déchets. Le bois, le métal, le papier et les équipements électroniques sont systématiquement acheminés vers des centres de tri agréés en Île-de-France.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span>Partenariats avec Emmaüs et la Croix-Rouge</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span>Traçabilité des déchets (BSD)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span>Zéro dépôt sauvage garanti</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 h-64 md:h-80 w-full relative rounded-xl overflow-hidden shadow-xl">
              <div
                className="w-full h-full bg-cover  bg-center"
                role="img"
                aria-label="Centre de tri et recyclage moderne"
                style={{
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKtrnUSlzvqqQa0xZUEfyZw8VB4euZH-cC063OuPl924F3bXUL4x_lE7zqcUfaPI9iwinsY6kcW53dVudwfRxo9ccqSLsEvGmxKxbJ0h7EJLl-L8BHYjpdKaBW8oeu-CjKv8lEp86dBqVDv-QTXWWTU2QmE6L5ASa0kyZuKb2t87GkwktWIg1ASEH1nS5nMmdG7Ir4ZvFAonKuqbBW35S92SLThkxXSPaGogPf1RSjujzIoDssecsi1xFz6XSxfGuBpYM1OEeKieX1')"
                }}
              >
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-10 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-[1200px] text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">L'équipe qui déplace des montagnes</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
              Derrière chaque carton soulevé se cache une personne dévouée. Découvrez les visages de Vidébarras.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="size-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg">
                  <div
                    className="w-full h-full bg-cover  bg-center"
                    role="img"
                    aria-label="Portrait de Thomas fondateur"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8P5ACm3fwM2A7EwXzypX2_W252zND_IylhEYVjtWCZad7d7YSZ8kxOYL0Y-icItB-CnfPVjv8BLdcUFbpHTAjmsXI41WnpUuT08x8QJCKxeXMXhtcCKXTnM-UOZyxG4u6rTa78exynkG4AuU8fI2MVd6LZjrZeumppFQ25otrxGmHaT49TAegbHEPrC95TcaxfA3hsjTYABnAIFyjPC9_Lk5Moj4bT4kmiMDCXKBSQnKIxVB1eEYsz5iGm88NDGZsUIhFk46-uEXD')"
                    }}
                  >
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Thomas</h3>
                  <p className="text-primary font-medium text-sm">Fondateur &amp; Gérant</p>
                  <p className="text-slate-500 text-sm mt-2">"Mon but : que vous retrouviez le sourire en retrouvant de l'espace."</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="size-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg">
                  <div
                    className="w-full h-full bg-cover  bg-center"
                    role="img"
                    aria-label="Portrait de Sarah logistique"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC82uWcSOcSe7CQtyZ3_DahXqjJ9aaUXTyw5TjWdbCYXFnjqRrldaR0Ak8jnfkJGlhpxR2AP2qosrKrQdCjuuXDGcswt4LmUPVSHtNccm7YrSIzO56BnwnP2S_cTLmqw4kJEa3Aiu0MxPChvReDN5eBQpE9wQeOo3r0ZyBJ3Cknd6C9klGonkaZHDx1z1M1LMRrwLK9uF4ouLZ12jApuhMllJmfP7qKvb2ZH8wh51oEfZJ6CzzWJ66z-K5yscZwFa0vEnw7cIHjDxiu')"
                    }}
                  >
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sarah</h3>
                  <p className="text-primary font-medium text-sm">Responsable Logistique</p>
                  <p className="text-slate-500 text-sm mt-2">"L'organisation, c'est la clé d'un débarras sans stress."</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="size-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg">
                  <div
                    className="w-full h-full bg-cover  bg-center"
                    role="img"
                    aria-label="Portrait de Karim chef d'équipe"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJeTR_pUTyjPS4cp0kg3kLKg5rlcoLCvogVNiWGLaYtx0PKi_K0dJ2Epaku3EHnYVbWNNz6cNDhRDNQEQUURdVEMPu4YxHPbA0G72fZoBjyE1v49qHq5QLeib6GAYd-sOmyGke6XNkUdnOpuKeLAIDNlPjdYpHzZwEGbVqT1N2CZxxAzp06hwMXbchhBSjmpgH8NqYPX_AsEngFk22JoU4ms0-bKkfaFytGUhTnSVomv58PUDBekJpOcmUYPyM1OUQ_bbW_Ib9FA3a')"
                    }}
                  >
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Karim</h3>
                  <p className="text-primary font-medium text-sm">Chef d'Équipe</p>
                  <p className="text-slate-500 text-sm mt-2">"Aucun meuble n'est trop lourd quand on a la bonne technique."</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="size-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg">
                  <div
                    className="w-full h-full bg-cover  bg-center"
                    role="img"
                    aria-label="Portrait de Julie service client"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcHhHIF8UuVg3upsuMSEOdHIBv5u5oLqTmRjnY0eQyfvyFHdnHUKw8agHANNlGFHHzscrHpA_NYnw_9etR8JFtKiDX_d2riwd-TI5PBVzzsOQ-nSNQbgPf8mlCdNrv1ugJwAYTWhDmlYCGWHWqolWcAhjCsXkTVyVEgUX7JZRudc_NejpC6z_hxFgL6u2nt-f8qNKyMMvelwwLTecl1uaWpbd0XHYNdWu_Q6QfrHJyoBcxTYuX1PSurDtd1huB8MM8LQfB4RhXAlT4')"
                    }}
                  >
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Julie</h3>
                  <p className="text-primary font-medium text-sm">Service Client</p>
                  <p className="text-slate-500 text-sm mt-2">"À votre écoute pour trouver la solution la plus adaptée."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary dark:bg-primary/90 text-white py-12 px-4 sm:px-10">
          <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Prêt à faire de la place ?</h2>
              <p className="text-white/90 text-lg">Recevez votre estimation gratuite en moins de 24h.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="flex items-center justify-center bg-white text-primary hover:bg-slate-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors min-w-[180px]"
              >
                Devis Gratuit
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors min-w-[180px]"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingContact />
    </div>
  );
}
