import HeroVideo from '../components/HeroVideo';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="À propos de nous - Expert du Débarras"
        description="Découvrez l'histoire, la méthode (en 3 étapes) et les engagements écologiques de Vidébarras, votre partenaire de confiance en Île-de-France."
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-100 overflow-x-hidden">
        <HeroVideo
          videoUrl="https://videos.pexels.com/video-files/5752729/5752729-hd_1920_1080_25fps.mp4"
          fallbackImage="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1920"
          title="Débarras rapide et professionnel"
          subtitle="Appartements • Maisons • Caves • Locaux"
          ctaText="Obtenir un devis gratuit"
          ctaLink="/contact"
        />

        <div className="w-full bg-background-light dark:bg-background-dark py-12 border-b border-[#e7edf3] dark:border-gray-700">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-2 dark:text-white">Comment ça marche ?</h3>
              <p className="text-slate-500 dark:text-slate-400">Une intervention simple en 3 étapes</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-primary !text-[32px]">assignment</span>
                </div>
                <h4 className="text-lg font-bold mb-2 dark:text-white">1. Devis Gratuit</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Contactez-nous pour une estimation rapide sur photo ou visite sur place.</p>
              </div>
              <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-slate-200 dark:bg-slate-700 z-0"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-primary !text-[32px]">local_shipping</span>
                </div>
                <h4 className="text-lg font-bold mb-2 dark:text-white">2. Intervention</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Notre équipe intervient à la date convenue avec tout le matériel nécessaire.</p>
              </div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-primary !text-[32px]">cleaning_services</span>
                </div>
                <h4 className="text-lg font-bold mb-2 dark:text-white">3. Nettoyage &amp; Recyclage</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 px-4">Nous laissons les lieux propres et assurons le recyclage en déchetterie agréée.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-[#1a2632] py-16 sm:py-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#0d141b] dark:text-white">Découvrez nos services</h2>
              <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex gap-1">
                <button className="flex-1 py-2.5 px-4 rounded-lg bg-white dark:bg-slate-700 text-primary font-bold shadow-sm transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined !text-[20px]">home</span>
                  Particuliers
                </button>
                <button className="flex-1 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium transition-all text-sm sm:text-base flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined !text-[20px]">business_center</span>
                  Professionnels
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">house</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de débarras de maison complète"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA86BhA8znoObB4nKnwOc6Q2EZMMbeQFyTz6jC_OIDhVM6BH4kRAD1w9j-GYWS2m5IjO5_41q-n2zKHn9__r5xprOEL6QT6HsvkfVNmqaofJT3PXesEPmqM6sLyKe2TzE1CHNhHFH5gJ98FuhfqrhB40Q_d0eaB6LjKdBo9XcgzD_188ssFkC73M1uWquzxdmYbr8xMeiyPw19XswYv3ygIQZsMxxgG1WJ-qDGVN2yHqmI-Y2EG9tA6gNWWtTTpjToM0r5Sf4v0K5ss")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Débarras de Maison</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Service complet pour succession, déménagement ou vente immobilière. Nous vidons intégralement votre maison, de la cave au grenier.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Toutes superficies</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Tri sélectif inclus</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">apartment</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de débarras pour appartement"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmvu7gshTyUsaWXE0zx3i7vGqqjQjYzK7Icss3Gi53Db6CcY4EClLMaFNfjsfWSqlWE0UXM6PROjWzGQFGkRL7p6MYpCuIaZ1RU27IBS_s0iyhnaSIk9wHGrq3gZgdKECkc54jVHvmzxmFFXLbN3W71aLuFQu_rEQGrJNlXIC2fKf6zUCziduPJx5UDPn8AYCQXOs8akt5hCUWG41VDiZvUcwv4I-U81D-ZIBIWSxspBMAsDVaz9e9pmrNJpboa41c7vC6kphxIdQY")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Débarras d'Appartement</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Intervention en étage, accès difficile, avec ou sans ascenseur. Nous adaptons nos moyens logistiques à votre copropriété.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Protection des parties communes</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Monte-meuble si nécessaire</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">warehouse</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de débarras pour caves et greniers"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBsQj8Ge0pqi045Nb7LATXRDANRTdNVqTLMwDbfkVptJdfobnGGdqRuENheIL7S6PfdhWeLhFCk6KFVD-pg9fo8jpUDGPOdZ2L2A6HBVk-zGjVFTW4CrvM6yX0qeG-bbOooJaPXfhip5VUt62OoEuUvCX-VYTPgZ4R3_T2M9TVp8TIBzHUYCea2hBVUSBPy0WZ9q44urFmCcVH31it3PR3-EXALqv7Ay3TNy40s1vxuML-G2kYiswiujVIY2X1bIIUr3LbAMJA0NAP")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Caves &amp; Greniers</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Récupérez de l'espace précieux. Nous trions et évacuons les encombrants accumulés au fil des années dans vos espaces de stockage.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Nettoyage après débarras</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Destruction d'archives</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">warning</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de débarras extrême Syndrome de Diogène"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCceA446-qBqgoZNmN6o8TvF4rQLgatA-FVCRB9aFzgFND8hsrknvpgqB58jnhXRcDnaDPDyzH3G4VTGWsPsqi5p7WucKtQk3pVB3auqreDJ7KDZBrd6RrbVfIA3J1cVVUKZ99-DlFNuD0OrTRD1dHENNy6jjpEkfXWlq0Ce52lsLXCw_PKx7jRcUCYA5qQQovN5a4vGv6wuhyws4BLzpIaMl6uVsEPGiuH7-7hbPVdQNXjC99GN18mJ321vfHbJcirrFTsWPtXOQbo")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Syndrome de Diogène</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Intervention spécialisée pour l'accumulation compulsive. Nettoyage extrême, désinfection et remise en état de l'habitation.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Discrétion assurée</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Protocole de désinfection</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">desk</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de débarras de locaux professionnels et bureaux"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_-XSNdoR2Zm4Qdvb48bsenCgT173u_MK2AJrbfucUUm-0V0utiZgnh5m_ktZOBZdPo5Jp63PUAVrbUT0metpfhPw4NMq22HgGNEgfh28f39rCO_mYiD58lYXAe86h6bmoXpvgABX0Gw4PJsjz1Yb2CfYNOCqRiqNZ67l1PC_iTEKjMijJOv31SPbIZn6ALtJxc2FurP_M_JDK4iz2V_LVDHE2BlMa8eCjTWJO76r5vlXzYgaBF8f0r3jklMCylLGj7DG2gRjgCehL")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Bureaux &amp; Locaux</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Déménagement d'entreprise, cessation d'activité ou renouvellement de mobilier. Débarras rapide de vos espaces de travail.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Recyclage matériel informatique</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Certificat de destruction</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="group flex flex-col bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full z-10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-primary">storefront</span>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    role="img"
                    aria-label="Service de nettoyage de commerces et boutiques"
                    style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlJ-0fRMt6lIa2EvlJKbq79gaRjEhWqc-50sEWsiRyWzrjCR2QmqY96Hw_Nhzw0lfLCRLjMOKkPKHjPBB7nNtlS46gYCiPoPU0EayQXiQmxkirdTyeg8G9KDZWoXNDMyLpK4a9bW_Um-XFME1FY8XXM-6B2fF8eXdaoIyV6dewAqF4mIcfz_4ieIJBovAZ_5ebIMaJvFtof-PiaGYqwPYkqZUWPLPgC6ThTLVBu_ZgAEWEmOioqgJTvdy34bsC91BNAEsgL4JmFB0F")'}}
                  ></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Commerces &amp; Boutiques</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-1">
                    Remise au propre de locaux commerciaux avant état des lieux ou travaux. Évacuation de rayonnages, PLV et stocks invendus.
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 mb-6">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span>Intervention heures creuses</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Valorisation des déchets</li>
                  </ul>
                  <a className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href="#">
                    En savoir plus <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-background-light dark:bg-background-dark py-12">
          <div className="max-w-[960px] mx-auto px-4 sm:px-10 text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Ils nous font confiance en Île-de-France</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 text-xl font-black text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined !text-[32px]">real_estate_agent</span> IMMO+
              </div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined !text-[32px]">apartment</span> SYNDIC
              </div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined !text-[32px]">gavel</span> NOTAIRES
              </div>
              <div className="flex items-center gap-2 text-xl font-black text-slate-400 dark:text-slate-500">
                <span className="material-symbols-outlined !text-[32px]">corporate_fare</span> PARIS-BUR
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <div className="max-w-[960px] mx-auto px-4 sm:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left text-white">
              <h2 className="text-3xl font-black mb-2 tracking-tight">Besoin d'un débarras urgent ?</h2>
              <p className="text-blue-100 text-lg">Recevez votre devis gratuit en moins de 24h.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary hover:bg-slate-100 font-bold h-12 px-8 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 min-w-[200px]">
                <span className="material-symbols-outlined">call</span>
                06 95 25 73 52
              </button>
              <button className="bg-blue-800/40 hover:bg-blue-800/60 text-white font-bold h-12 px-8 rounded-lg border border-white/20 backdrop-blur-sm transition-colors flex items-center justify-center gap-2 min-w-[200px]">
                Demander un devis
              </button>
            </div>
          </div>
        </div>

        <footer className="bg-white dark:bg-[#1a2632] border-t border-[#e7edf3] dark:border-gray-700 pt-16 pb-8">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#0d141b] dark:text-white mb-2">
                  <span className="material-symbols-outlined text-primary !text-[28px]">recycling</span>
                  <h3 className="text-lg font-bold">Roi du Débarras</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Expert du débarras en Île-de-France. Nous valorisons vos biens et recyclons de manière responsable.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-[#0d141b] dark:text-white mb-4">Services</h4>
                <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <li><a className="hover:text-primary transition-colors" href="#">Maisons &amp; Appartements</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Bureaux &amp; Locaux</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Caves &amp; Greniers</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Syndrome de Diogène</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#0d141b] dark:text-white mb-4">Zone d'intervention</h4>
                <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <li>Paris (75)</li>
                  <li>Hauts-de-Seine (92)</li>
                  <li>Seine-Saint-Denis (93)</li>
                  <li>Val-de-Marne (94)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#0d141b] dark:text-white mb-4">Contact</h4>
                <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">mail</span> contact@vidébarras.fr
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">phone</span> 06 95 25 73 52
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[18px]">schedule</span> Lun - Sam: 8h - 20h
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-400">© 2023 Roi du Débarras. Tous droits réservés.</p>
              <div className="flex gap-4 text-xs text-slate-400">
                <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#">Mentions Légales</a>
                <a className="hover:text-slate-600 dark:hover:text-slate-300" href="#">Politique de Confidentialité</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
