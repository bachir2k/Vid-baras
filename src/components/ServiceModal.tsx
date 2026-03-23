import { X, Home, Building2, Users, Sparkles, Warehouse } from 'lucide-react';
import { useEffect } from 'react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  clientType: 'particulier' | 'professionnel';
}

const serviceDetails = {
  'appartement': {
    title: 'Comment se déroule un débarras d\'appartement ?',
    icon: Home,
    steps: [
      { number: 1, title: 'Prise de contact et évaluation', description: 'Nous écoutons vos besoins et évaluons la portée du projet' },
      { number: 2, title: 'Visite ou estimation à distance', description: 'Visite sur place ou envoi de photos pour une estimation précise' },
      { number: 3, title: 'Tri des objets', description: 'Séparation des objets à recycler, donner ou jeter' },
      { number: 4, title: 'Débarras et évacuation', description: 'Vidage complet et évacuation de tous les encombrants' },
      { number: 5, title: 'Nettoyage si nécessaire', description: 'Nettoyage après débarras pour un lieu propre' },
      { number: 6, title: 'Remise du lieu propre', description: 'Inspection finale et remise des clés' },
    ],
    specifics: [
      'Gestion des étages et ascenseurs',
      'Respect des parties communes',
      'Intervention rapide et discrète',
      'Protection des sols et murs',
    ],
  },
  'cave': {
    title: 'Comment se déroule un débarras de cave ?',
    icon: Warehouse,
    steps: [
      { number: 1, title: 'Évaluation de l\'accès', description: 'Analyse des contraintes d\'accès et de circulation' },
      { number: 2, title: 'Estimation sur place', description: 'Visite de la cave pour évaluer le volume et les difficultés' },
      { number: 3, title: 'Organisation du tri', description: 'Tri méthodique des encombrants accumulés' },
      { number: 4, title: 'Évacuation sécurisée', description: 'Transport sécurisé vers nos véhicules' },
      { number: 5, title: 'Nettoyage complet', description: 'Balayage et nettoyage de la cave' },
      { number: 6, title: 'Remise en état', description: 'Cave propre et prête à l\'utilisation' },
    ],
    specifics: [
      'Accès difficile pris en compte',
      'Évacuation sécurisée',
      'Tri des encombrants spécifiques',
      'Gestion de l\'humidité et des moisissures',
    ],
  },
  'bureaux': {
    title: 'Comment se déroule un débarras de bureaux / locaux professionnels ?',
    icon: Building2,
    steps: [
      { number: 1, title: 'Audit des besoins', description: 'Analyse complète de vos besoins professionnels' },
      { number: 2, title: 'Planification détaillée', description: 'Organisation du calendrier et des équipes' },
      { number: 3, title: 'Tri et confidentialité', description: 'Gestion confidentielle des documents et archives' },
      { number: 4, title: 'Débarras du mobilier', description: 'Évacuation du mobilier de bureau et équipements' },
      { number: 5, title: 'Nettoyage professionnel', description: 'Nettoyage complet des locaux' },
      { number: 6, title: 'Restitution des lieux', description: 'État des lieux et remise des clés' },
    ],
    specifics: [
      'Respect des horaires d\'activité',
      'Confidentialité des documents',
      'Gestion du mobilier professionnel',
      'Certificat de destruction fourni',
    ],
  },
  'nettoyage': {
    title: 'Comment se déroule un nettoyage après débarras ?',
    icon: Sparkles,
    steps: [
      { number: 1, title: 'Évaluation de l\'état', description: 'Inspection complète des lieux après débarras' },
      { number: 2, title: 'Définition du périmètre', description: 'Identification des zones à nettoyer en priorité' },
      { number: 3, title: 'Nettoyage en profondeur', description: 'Nettoyage complet de toutes les surfaces' },
      { number: 4, title: 'Désinfection si nécessaire', description: 'Traitement désinfectant des zones sensibles' },
      { number: 5, title: 'Contrôle qualité', description: 'Vérification de la propreté de chaque pièce' },
      { number: 6, title: 'Remise en état parfaite', description: 'Lieu prêt pour vente ou location' },
    ],
    specifics: [
      'Nettoyage après débarras inclus',
      'Désinfection professionnelle',
      'Remise en état avant vente ou location',
      'Produits écologiques utilisés',
    ],
  },
  'maison': {
    title: 'Comment se déroule un débarras de maison ?',
    icon: Home,
    steps: [
      { number: 1, title: 'Visite complète', description: 'Inspection de toutes les pièces et dépendances' },
      { number: 2, title: 'Estimation détaillée', description: 'Devis précis incluant tous les espaces' },
      { number: 3, title: 'Tri pièce par pièce', description: 'Organisation méthodique du tri par espace' },
      { number: 4, title: 'Vidage intégral', description: 'Débarras de la cave au grenier' },
      { number: 5, title: 'Nettoyage général', description: 'Nettoyage complet de la maison' },
      { number: 6, title: 'Maison prête', description: 'Maison vidée et propre, clés en main' },
    ],
    specifics: [
      'Toutes superficies acceptées',
      'Tri sélectif inclus',
      'Gestion de la cave au grenier',
      'Service succession disponible',
    ],
  },
  'grenier': {
    title: 'Comment se déroule un débarras de grenier ?',
    icon: Warehouse,
    steps: [
      { number: 1, title: 'Inspection de l\'accès', description: 'Vérification de la sécurité et de l\'accessibilité' },
      { number: 2, title: 'Évaluation du volume', description: 'Estimation des objets et encombrants présents' },
      { number: 3, title: 'Tri minutieux', description: 'Séparation objets de valeur, recyclables et déchets' },
      { number: 4, title: 'Descente sécurisée', description: 'Évacuation prudente par escalier ou fenêtre' },
      { number: 5, title: 'Nettoyage et balayage', description: 'Nettoyage complet du grenier' },
      { number: 6, title: 'Grenier prêt', description: 'Espace récupéré et utilisable' },
    ],
    specifics: [
      'Accès par échelle ou escalier étroit géré',
      'Sécurité renforcée',
      'Destruction d\'archives anciennes',
      'Valorisation des objets anciens',
    ],
  },
  'commerces': {
    title: 'Comment se déroule un débarras de commerces & boutiques ?',
    icon: Building2,
    steps: [
      { number: 1, title: 'Analyse du projet', description: 'Compréhension des besoins commerciaux' },
      { number: 2, title: 'Planning sur mesure', description: 'Intervention adaptée aux horaires creuses' },
      { number: 3, title: 'Tri du stock', description: 'Gestion des marchandises et du mobilier' },
      { number: 4, title: 'Évacuation rapide', description: 'Vidage complet du local commercial' },
      { number: 5, title: 'Nettoyage professionnel', description: 'Remise aux normes du local' },
      { number: 6, title: 'Local prêt à louer', description: 'Restitution clé en main au propriétaire' },
    ],
    specifics: [
      'Intervention heures creuses',
      'Valorisation des déchets commerciaux',
      'Gestion rayonnages, PLV et stocks',
      'Respect des délais impératifs',
    ],
  },
  'diogene': {
    title: 'Comment se déroule une intervention Syndrome de Diogène ?',
    icon: Sparkles,
    steps: [
      { number: 1, title: 'Contact bienveillant', description: 'Approche respectueuse et discrète de la situation' },
      { number: 2, title: 'Évaluation sensible', description: 'Analyse du niveau d\'accumulation' },
      { number: 3, title: 'Tri en présence', description: 'Accompagnement empathique dans le tri' },
      { number: 4, title: 'Débarras progressif', description: 'Évacuation adaptée au rythme de la personne' },
      { number: 5, title: 'Nettoyage extrême', description: 'Désinfection et nettoyage en profondeur' },
      { number: 6, title: 'Remise en état complète', description: 'Habitation saine et vivable' },
    ],
    specifics: [
      'Discrétion assurée',
      'Protocole de désinfection spécifique',
      'Équipe formée et sensibilisée',
      'Accompagnement social possible',
    ],
  },
};

const clientTypeInfo = {
  particulier: {
    title: 'Côté Particulier',
    icon: Users,
    benefits: [
      'Accompagnement personnalisé',
      'Aucune démarche compliquée',
      'Intervention clé en main',
      'Devis simple et transparent',
    ],
  },
  professionnel: {
    title: 'Côté Professionnel',
    icon: Building2,
    benefits: [
      'Processus structuré',
      'Respect des normes et délais',
      'Facturation et documents fournis',
      'Intervention planifiée',
    ],
  },
};

export default function ServiceModal({ isOpen, onClose, serviceType, clientType }: ServiceModalProps) {
  const service = serviceDetails[serviceType as keyof typeof serviceDetails];
  const clientInfo = clientTypeInfo[clientType];
  const ServiceIcon = service?.icon || Home;
  const ClientIcon = clientInfo?.icon || Users;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 z-10 bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-4 pr-12">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <ServiceIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
              <p className="text-white/90 text-sm mt-1">Procédé détaillé et transparent</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">1-6</span>
              </div>
              Étapes du procédé
            </h3>
            <div className="space-y-3">
              {service.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              Spécificités de ce service
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.specifics.map((specific, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{specific}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ClientIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{clientInfo.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {clientInfo.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/contact"
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Demander une estimation gratuite
            </a>
            <button
              onClick={onClose}
              className="sm:flex-shrink-0 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-4 px-8 rounded-xl transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
