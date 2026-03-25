import SEO from '../components/SEO';
import { breadcrumbList } from '../lib/structuredData';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact & Devis Gratuit"
        description="Contactez Vidébarras pour un devis gratuit de débarras en Île-de-France. Téléphone : 07 69 18 12 64. Réponse rapide sous 24h, intervention dans toute l'Île-de-France (75, 92, 93, 94, 77, 78, 91, 95)."
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

      <div className="bg-background-light dark:bg-background-dark text-[#0d141b] dark:text-white">
        <div className="flex flex-col min-h-screen relative overflow-x-hidden font-display">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2632] px-6 lg:px-10 py-4 sticky top-0 z-50">
            <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">cleaning_services</span>
              </div>
              <h2 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Vidébarras</h2>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6">
                <a className="text-[#0d141b] dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Accueil</a>
                <a className="text-[#0d141b] dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Services</a>
                <a className="text-[#0d141b] dark:text-gray-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="#">Tarifs</a>
                <a className="text-primary text-sm font-bold leading-normal" href="#">Contact</a>
              </div>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  06 95 25 73 52
                </span>
              </button>
            </div>
            <div className="lg:hidden text-[#0d141b] dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </div>
          </header>

          <main className="flex-grow flex flex-col">
            <section className="bg-white dark:bg-[#1a2632] py-12 lg:py-16 px-4 sm:px-8 flex justify-center border-b border-gray-100 dark:border-gray-800">
              <div className="max-w-[960px] w-full flex flex-col items-center text-center gap-4">
                <h1 className="text-[#0d141b] dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] max-w-3xl">
                  Contactez Vidébarras
                </h1>
                <p className="text-[#4c739a] dark:text-gray-400 text-lg lg:text-xl font-normal leading-normal max-w-2xl">
                  Une réponse rapide et un devis 100% gratuit pour tous vos besoins de débarras en Île-de-France.
                </p>
              </div>
            </section>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 xl:col-span-8">
                  <div className="bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                    <div className="mb-8">
                      <h2 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight mb-2">Demande de devis gratuit</h2>
                      <p className="text-[#4c739a] dark:text-gray-400">Remplissez le formulaire ci-dessous pour recevoir une estimation précise.</p>
                    </div>
                    <form className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2">
                          <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Nom complet <span className="text-red-500">*</span></span>
                          <input className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400" placeholder="Jean Dupont" required type="text"/>
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Numéro de téléphone <span className="text-red-500">*</span></span>
                          <input className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400" placeholder="06 12 34 56 78" required type="tel"/>
                        </label>
                      </div>
                      <label className="flex flex-col gap-2">
                        <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Email <span className="text-red-500">*</span></span>
                        <input className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400" placeholder="jean.dupont@email.com" required type="email"/>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2">
                          <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Type de local</span>
                          <div className="relative">
                            <select className="form-select w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none appearance-none cursor-pointer">
                              <option>Appartement</option>
                              <option>Maison</option>
                              <option>Cave / Grenier</option>
                              <option>Bureaux / Locaux pro</option>
                              <option>Autre</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
                          </div>
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Surface approximative (m²)</span>
                          <input className="form-input w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400" placeholder="Ex: 50" type="number"/>
                        </label>
                      </div>
                      <label className="flex flex-col gap-2">
                        <span className="text-[#0d141b] dark:text-gray-200 text-sm font-medium">Message ou détails supplémentaires</span>
                        <textarea className="form-textarea w-full rounded-lg border border-[#cfdbe7] dark:border-gray-600 bg-slate-50 dark:bg-gray-800 dark:text-white px-4 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder:text-gray-400 min-h-[120px] resize-y" placeholder="Décrivez votre besoin (accès difficile, objets lourds, ascenseur, etc.)..."></textarea>
                      </label>
                      <div className="pt-4">
                        <button className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98]" type="button">
                          <span className="material-symbols-outlined">send</span>
                          Envoyer ma demande
                        </button>
                        <p className="text-xs text-gray-400 mt-3 text-center md:text-left">* Vos données personnelles sont confidentielles et ne seront jamais partagées.</p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                  <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border border-primary/10">
                    <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-6">Nos coordonnées</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-primary shrink-0">
                          <span className="material-symbols-outlined">phone_in_talk</span>
                        </div>
                        <div>
                          <p className="text-sm text-[#4c739a] dark:text-gray-400 font-medium mb-1">Téléphone</p>
                          <a className="text-lg font-bold text-[#0d141b] dark:text-white hover:text-primary transition-colors" href="tel:+33695257352">06 95 25 73 52</a>
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

                  <div className="grid grid-cols-1 gap-3">
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

                  <div className="rounded-2xl overflow-hidden shadow-sm h-64 relative group border border-gray-200 dark:border-gray-700">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <img
                      alt="Carte de la zone d'intervention en Île-de-France avec un rayon d'action coloré"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFtC_UQpfcr_yDhCHCsvBse7BscoRg_GOhhtRAvmHhyyClwhJ80_Os0Kdx4MrYaRMtsCe4-mEbEHTsaLqZ-fOus1M_39OH05cPzfkqhZR2SMJPzK-NwYXYUg-l1yiudRIMDqYlpIQlAQAJjLqE0KVPDWOkIJzPPSmiztAH8Q5C6jio1pjcGkBsKTGSM6WBkk8sxT63qaJPELwkNpa-KmgS_NG_H54deKgM7NteLTI4a6K4LaZ5Ma4tcu9V3BPWkJJsnFGFSiDDgXRv"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                      <p className="text-xs font-bold text-center text-[#0d141b] dark:text-white flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-sm text-red-500">location_on</span>
                        Zone d'intervention : Paris &amp; IDF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-white dark:bg-[#1a2632] border-t border-gray-200 dark:border-gray-800 py-10 px-4 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl">cleaning_services</span>
                </div>
                <span className="text-[#0d141b] dark:text-white font-bold text-lg">Vidébarras</span>
              </div>
              <div className="flex gap-6 text-sm font-medium text-[#4c739a] dark:text-gray-400">
                <a className="hover:text-primary transition-colors" href="#">Mentions légales</a>
                <a className="hover:text-primary transition-colors" href="#">Politique de confidentialité</a>
                <a className="hover:text-primary transition-colors" href="#">CGV</a>
              </div>
              <div className="flex gap-4">
                <a className="text-[#4c739a] dark:text-gray-400 hover:text-primary transition-colors" href="#">
                  <span className="hidden">Facebook</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </a>
                <a className="text-[#4c739a] dark:text-gray-400 hover:text-primary transition-colors" href="#">
                  <span className="hidden">Instagram</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">© 2024 Vidébarras. Tous droits réservés.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
