import { Link } from 'react-router-dom';
import { Trash2, Clock, Shield, Leaf, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import EstimationWizard from '../components/EstimationWizard';
import IleDeFranceMap from '../components/IleDeFranceMap';
import ServiceModal from '../components/ServiceModal';
import SEO from '../components/SEO';
import { useState } from 'react';
import { localBusinessData, breadcrumbList } from '../lib/structuredData';

const departments = [
  { id: 'paris', name: 'Paris', code: '75' },
  { id: 'hauts-de-seine', name: 'Hauts-de-Seine', code: '92' },
  { id: 'seine-saint-denis', name: 'Seine-Saint-Denis', code: '93' },
  { id: 'val-de-marne', name: 'Val-de-Marne', code: '94' },
  { id: 'seine-et-marne', name: 'Seine-et-Marne', code: '77' },
  { id: 'yvelines', name: 'Yvelines', code: '78' },
  { id: 'essonne', name: 'Essonne', code: '91' },
  { id: 'val-doise', name: "Val-d'Oise", code: '95' },
];

function InteractiveMap() {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>('paris');

  const handleDeptClick = (deptId: string) => {
    setSelectedDept(deptId);
  };

  return (
    <div className="relative">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Zone d'intervention
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Couverture complète de l'Île-de-France avec intervention en moins de 2h
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  8 Départements
                </h3>
                <p className="text-blue-200 text-sm">Île-de-France</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Disponibilité</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">&lt;2h</div>
                <div className="text-blue-200 text-sm">Intervention</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8 items-center">
            <div className="flex items-center justify-center">
              <IleDeFranceMap
                selectedDept={selectedDept}
                hoveredDept={hoveredDept}
                onDeptClick={handleDeptClick}
                onDeptHover={setHoveredDept}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {departments.map((dept) => {
                const isActive = hoveredDept === dept.id || selectedDept === dept.id;
                return (
                  <div
                    key={dept.id}
                    className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 transition-all duration-300 cursor-pointer border-2 ${
                      isActive
                        ? 'border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105'
                        : 'border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                    }`}
                    onMouseEnter={() => setHoveredDept(dept.id)}
                    onMouseLeave={() => setHoveredDept(null)}
                    onClick={() => handleDeptClick(dept.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}></div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-all duration-300 ${
                          isActive
                            ? 'bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                            : 'bg-white/10 text-blue-200'
                        }`}>
                          {dept.code}
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-primary shadow-[0_0_10px_rgba(59,130,246,1)]' : 'bg-white/20'
                        }`}></div>
                      </div>
                      <div className={`font-semibold text-sm transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-blue-100'
                      }`}>
                        {dept.name}
                      </div>
                      <div className={`text-xs mt-1 transition-colors duration-300 ${
                        isActive ? 'text-blue-200' : 'text-blue-300/60'
                      }`}>
                        Service actif
                      </div>
                    </div>

                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-0 -z-10 blur transition-opacity duration-300 ${
                      isActive ? 'opacity-30' : 'group-hover:opacity-20'
                    }`}></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-white font-semibold">Intervention rapide</div>
              </div>
              <div className="text-blue-200 text-sm">
                Nous arrivons en moins de 2 heures pour toute urgence
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div className="text-white font-semibold">Service garanti</div>
              </div>
              <div className="text-blue-200 text-sm">
                Équipe professionnelle et assurée dans tous les départements
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="text-white font-semibold">Couverture totale</div>
              </div>
              <div className="text-blue-200 text-sm">
                Paris et toute l'Île-de-France, aucune zone non couverte
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Cliquez sur un département pour le sélectionner • Survolez pour prévisualiser
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ type: string; clientType: 'particulier' | 'professionnel' }>({ type: '', clientType: 'particulier' });

  const openServiceModal = (serviceType: string) => {
    setSelectedService({ type: serviceType, clientType: 'particulier' });
    setModalOpen(true);
  };

  const features = [
    {
      icon: Clock,
      title: 'Intervention Rapide',
      description: 'Disponible 7j/7 pour répondre à vos besoins en urgence ou sur rendez-vous.',
    },
    {
      icon: Shield,
      title: 'Service Professionnel',
      description: 'Équipe qualifiée et assurée pour un travail soigné et sécurisé.',
    },
    {
      icon: Leaf,
      title: 'Écologique',
      description: 'Tri, recyclage et valorisation des objets récupérés dans le respect de l\'environnement.',
    },
    {
      icon: Trash2,
      title: 'Débarras Complet',
      description: 'Prise en charge totale du débarras de A à Z, sans stress pour vous.',
    },
  ];

  const services = [
    'Débarras de maison et appartement',
    'Débarras de cave et grenier',
    'Débarras après décès',
    'Débarras de bureau et local commercial',
    'Enlèvement d\'encombrants',
    'Nettoyage après débarras',
  ];

  const servicesWithImages = [
    {
      title: 'Débarras de maison & appartement',
      description: 'Prise en charge complète du débarras de votre habitation',
      image: '/generated-1767557632182-mwvsu.png',
      serviceType: 'maison',
    },
    {
      title: 'Débarras de cave & grenier',
      description: 'Vidage et nettoyage de vos espaces de stockage',
      image: '/generated-1767557748280-em8pt.png',
      serviceType: 'cave',
    },
    {
      title: 'Débarras de bureau',
      description: 'Solution professionnelle pour vos locaux commerciaux',
      image: '/generated-1767557897395-ipsph.png',
      serviceType: 'bureaux',
    },
    {
      title: 'Enlèvement d\'encombrants',
      description: 'Évacuation rapide de vos objets volumineux',
      image: 'https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg?auto=compress&cs=tinysrgb&w=800',
      serviceType: 'maison',
    },
  ];

  return (
    <div>
      <SEO
        title="Débarras Rapide et Professionnel en Île-de-France"
        description="Vidébarras : service de débarras professionnel en Île-de-France (Paris 75, 77, 78, 91, 92, 93, 94, 95). Débarras appartement, maison, cave, grenier, bureaux. Devis gratuit sous 24h, intervention rapide, tri écologique."
        keywords="débarras, débarras appartement, débarras maison, débarras cave, débarras grenier, débarras professionnel, débarras paris, débarras île-de-france, débarras 75, débarras 92, débarras 93, débarras 94, débarras rapide, entreprise débarras, débarras succession, nettoyage après débarras"
        canonical="https://videbarras.fr"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            localBusinessData,
            breadcrumbList([
              { name: 'Accueil', url: 'https://videbarras.fr' },
            ]),
          ],
        }}
      />
      <section className="relative min-h-[700px] flex items-center py-32 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-primary/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-primary/30">
                Votre Expert en Débarras
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Libérez votre espace, simplifiez votre vie
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
              Débarras professionnel en Île-de-France. Rapide, efficace et respectueux de l'environnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-blue-600 transition-colors rounded-lg shadow-xl"
              >
                Demander un devis gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-lg border-2 border-white/30"
              >
                Nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Obtenez votre estimation en 2 minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Répondez à quelques questions simples pour recevoir une estimation gratuite et sans engagement
            </p>
          </div>
          <EstimationWizard />
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-black mb-6">
              Pourquoi choisir Vidébarras ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise reconnue et un service sur mesure pour tous vos projets de débarras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200/50 hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Nos prestations de débarras
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nous intervenons pour tous types de débarras en Île-de-France, avec une solution adaptée à chaque situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {servicesWithImages.map((service, index) => (
              <div
                key={index}
                onClick={() => openServiceModal(service.serviceType)}
                className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={`Service de ${service.title} - Vidébarras Île-de-France`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>

                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/50 transition-all duration-500"></div>

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-3xl transition-all duration-500"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0 transition-all duration-500">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 group-hover:bg-white/15 group-hover:border-primary/40 transition-all duration-500">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      <span className="text-xs text-primary font-semibold">Disponible</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-blue-600 p-12 rounded-3xl text-white text-center">
            <h3 className="text-3xl font-bold mb-6">
              Devis gratuit en 24h
            </h3>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Contactez-nous dès aujourd'hui pour obtenir une estimation gratuite et sans engagement de votre projet de débarras
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Évaluation gratuite</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Tarifs transparents</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Intervention rapide</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-100 transition-colors rounded-lg"
              >
                Demander un devis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors rounded-lg border-2 border-white/30"
              >
                Tous nos services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <InteractiveMap />
        </div>
      </section>

      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceType={selectedService.type}
        clientType={selectedService.clientType}
      />
    </div>
  );
}
