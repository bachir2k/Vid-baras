import { useState } from 'react';
import { Home, Warehouse, Building2, Sparkles, Store } from 'lucide-react';
import ServiceModal from './ServiceModal';

type ClientType = 'particulier' | 'professionnel';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Home;
  features: string[];
  clientTypes: ClientType[];
}

const services: Service[] = [
  {
    id: 'maison',
    title: 'Débarras de Maison',
    description: 'Service complet pour succession, déménagement ou vente immobilière. Nous vidons intégralement votre maison, de la cave au grenier.',
    image: '/generated-1767560516945-ui8qg.png',
    icon: Home,
    features: ['Toutes superficies', 'Tri sélectif inclus'],
    clientTypes: ['particulier'],
  },
  {
    id: 'appartement',
    title: 'Débarras d\'Appartement',
    description: 'Intervention en étage, accès difficile, avec ou sans ascenseur. Nous adaptons nos moyens logistiques à votre copropriété.',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Home,
    features: ['Protection des parties communes', 'Monte-meuble si nécessaire'],
    clientTypes: ['particulier'],
  },
  {
    id: 'cave',
    title: 'Caves & Greniers',
    description: 'Récupérez de l\'espace précieux. Nous trions et évacuons les encombrants accumulés au fil des années dans vos espaces de stockage.',
    image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Warehouse,
    features: ['Nettoyage après débarras', 'Destruction d\'archives'],
    clientTypes: ['particulier'],
  },
  {
    id: 'diogene',
    title: 'Syndrome de Diogène',
    description: 'Intervention spécialisée pour l\'accumulation compulsive. Nettoyage extrême, désinfection et remise en état de l\'habitation.',
    image: '/generated-1767557748280-em8pt.png',
    icon: Sparkles,
    features: ['Discrétion assurée', 'Protocole de désinfection'],
    clientTypes: ['particulier', 'professionnel'],
  },
  {
    id: 'bureaux',
    title: 'Bureaux & Locaux',
    description: 'Déménagement d\'entreprise, cessation d\'activité ou renouvellement de mobilier. Débarras rapide de vos espaces de travail.',
    image: 'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Building2,
    features: ['Recyclage matériel informatique', 'Certificat de destruction'],
    clientTypes: ['professionnel'],
  },
  {
    id: 'commerces',
    title: 'Commerces & Boutiques',
    description: 'Remise au propre de locaux commerciaux avant état des lieux ou travaux. Évacuation de rayonnages, PLV et stocks invendus.',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Store,
    features: ['Intervention heures creuses', 'Valorisation des déchets'],
    clientTypes: ['professionnel'],
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<ClientType>('particulier');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredServices = services.filter(service =>
    service.clientTypes.includes(activeTab)
  );

  const handleLearnMore = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 px-4 sm:px-10 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Découvrez nos services
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Solutions adaptées à vos besoins, que vous soyez particulier ou professionnel
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('particulier')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'particulier'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="h-5 w-5" />
              Particuliers
            </button>
            <button
              onClick={() => setActiveTab('professionnel')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'professionnel'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="h-5 w-5" />
              Professionnels
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <ServiceIcon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleLearnMore(service.id)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    En savoir plus
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceType={selectedService || ''}
        clientType={activeTab}
      />
    </section>
  );
}
