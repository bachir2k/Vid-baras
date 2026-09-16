import { Home, Building2, Users, Sparkles, Warehouse } from 'lucide-react';

export interface ServiceStep {
  number: number;
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: typeof Home;
  image: string;
  steps: ServiceStep[];
  specifics: string[];
}

/**
 * Source unique des données par service — utilisée à la fois par la modale
 * rapide (ServiceModal) et par la page de détail dédiée (ServiceDetailPage),
 * pour éviter toute divergence entre les deux.
 */
export const serviceDetails: Record<string, ServiceDetail> = {
  appartement: {
    slug: 'appartement',
    title: "Comment se déroule un débarras d'appartement ?",
    shortTitle: "Débarras d'Appartement",
    tagline: 'Intervention en étage, accès difficile, avec ou sans ascenseur.',
    icon: Home,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmvu7gshTyUsaWXE0zx3i7vGqqjQjYzK7Icss3Gi53Db6CcY4EClLMaFNfjsfWSqlWE0UXM6PROjWzGQFGkRL7p6MYpCuIaZ1RU27IBS_s0iyhnaSIk9wHGrq3gZgdKECkc54jVHvmzxmFFXLbN3W71aLuFQu_rEQGrJNlXIC2fKf6zUCziduPJx5UDPn8AYCQXOs8akt5hCUWG41VDiZvUcwv4I-U81D-ZIBIWSxspBMAsDVaz9e9pmrNJpboa41c7vC6kphxIdQY',
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
  cave: {
    slug: 'cave',
    title: 'Comment se déroule un débarras de cave ?',
    shortTitle: 'Caves & Greniers',
    tagline: "Récupérez de l'espace précieux dans vos espaces de stockage.",
    icon: Warehouse,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsQj8Ge0pqi045Nb7LATXRDANRTdNVqTLMwDbfkVptJdfobnGGdqRuENheIL7S6PfdhWeLhFCk6KFVD-pg9fo8jpUDGPOdZ2L2A6HBVk-zGjVFTW4CrvM6yX0qeG-bbOooJaPXfhip5VUt62OoEuUvCX-VYTPgZ4R3_T2M9TVp8TIBzHUYCea2hBVUSBPy0WZ9q44urFmCcVH31it3PR3-EXALqv7Ay3TNy40s1vxuML-G2kYiswiujVIY2X1bIIUr3LbAMJA0NAP',
    steps: [
      { number: 1, title: "Évaluation de l'accès", description: "Analyse des contraintes d'accès et de circulation" },
      { number: 2, title: 'Estimation sur place', description: 'Visite de la cave pour évaluer le volume et les difficultés' },
      { number: 3, title: 'Organisation du tri', description: 'Tri méthodique des encombrants accumulés' },
      { number: 4, title: 'Évacuation sécurisée', description: 'Transport sécurisé vers nos véhicules' },
      { number: 5, title: 'Nettoyage complet', description: 'Balayage et nettoyage de la cave' },
      { number: 6, title: 'Remise en état', description: "Cave propre et prête à l'utilisation" },
    ],
    specifics: [
      'Accès difficile pris en compte',
      'Évacuation sécurisée',
      'Tri des encombrants spécifiques',
      "Gestion de l'humidité et des moisissures",
    ],
  },
  bureaux: {
    slug: 'bureaux',
    title: 'Comment se déroule un débarras de bureaux / locaux professionnels ?',
    shortTitle: 'Bureaux & Locaux',
    tagline: "Déménagement d'entreprise, cessation d'activité, renouvellement de mobilier.",
    icon: Building2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_-XSNdoR2Zm4Qdvb48bsenCgT173u_MK2AJrbfucUUm-0V0utiZgnh5m_ktZOBZdPo5Jp63PUAVrbUT0metpfhPw4NMq22HgGNEgfh28f39rCO_mYiD58lYXAe86h6bmoXpvgABX0Gw4PJsjz1Yb2CfYNOCqRiqNZ67l1PC_iTEKjMijJOv31SPbIZn6ALtJxc2FurP_M_JDK4iz2V_LVDHE2BlMa8eCjTWJO76r5vlXzYgaBF8f0r3jklMCylLGj7DG2gRjgCehL',
    steps: [
      { number: 1, title: 'Audit des besoins', description: 'Analyse complète de vos besoins professionnels' },
      { number: 2, title: 'Planification détaillée', description: 'Organisation du calendrier et des équipes' },
      { number: 3, title: 'Tri et confidentialité', description: 'Gestion confidentielle des documents et archives' },
      { number: 4, title: 'Débarras du mobilier', description: 'Évacuation du mobilier de bureau et équipements' },
      { number: 5, title: 'Nettoyage professionnel', description: 'Nettoyage complet des locaux' },
      { number: 6, title: 'Restitution des lieux', description: 'État des lieux et remise des clés' },
    ],
    specifics: [
      "Respect des horaires d'activité",
      'Confidentialité des documents',
      'Gestion du mobilier professionnel',
      'Certificat de destruction fourni',
    ],
  },
  nettoyage: {
    slug: 'nettoyage',
    title: 'Comment se déroule un nettoyage après débarras ?',
    shortTitle: 'Nettoyage après débarras',
    tagline: 'Remise en état complète avant vente ou location.',
    icon: Sparkles,
    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1920',
    steps: [
      { number: 1, title: "Évaluation de l'état", description: 'Inspection complète des lieux après débarras' },
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
  maison: {
    slug: 'maison',
    title: 'Comment se déroule un débarras de maison ?',
    shortTitle: 'Débarras de Maison',
    tagline: 'Service complet pour succession, déménagement ou vente immobilière.',
    icon: Home,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA86BhA8znoObB4nKnwOc6Q2EZMMbeQFyTz6jC_OIDhVM6BH4kRAD1w9j-GYWS2m5IjO5_41q-n2zKHn9__r5xprOEL6QT6HsvkfVNmqaofJT3PXesEPmqM6sLyKe2TzE1CHNhHFH5gJ98FuhfqrhB40Q_d0eaB6LjKdBo9XcgzD_188ssFkC73M1uWquzxdmYbr8xMeiyPw19XswYv3ygIQZsMxxgG1WJ-qDGVN2yHqmI-Y2EG9tA6gNWWtTTpjToM0r5Sf4v0K5ss',
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
  grenier: {
    slug: 'grenier',
    title: 'Comment se déroule un débarras de grenier ?',
    shortTitle: 'Débarras de Grenier',
    tagline: "Récupérez de l'espace, en toute sécurité.",
    icon: Warehouse,
    image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1920',
    steps: [
      { number: 1, title: "Inspection de l'accès", description: "Vérification de la sécurité et de l'accessibilité" },
      { number: 2, title: 'Évaluation du volume', description: 'Estimation des objets et encombrants présents' },
      { number: 3, title: 'Tri minutieux', description: 'Séparation objets de valeur, recyclables et déchets' },
      { number: 4, title: 'Descente sécurisée', description: 'Évacuation prudente par escalier ou fenêtre' },
      { number: 5, title: 'Nettoyage et balayage', description: 'Nettoyage complet du grenier' },
      { number: 6, title: 'Grenier prêt', description: 'Espace récupéré et utilisable' },
    ],
    specifics: [
      'Accès par échelle ou escalier étroit géré',
      'Sécurité renforcée',
      "Destruction d'archives anciennes",
      'Valorisation des objets anciens',
    ],
  },
  commerces: {
    slug: 'commerces',
    title: 'Comment se déroule un débarras de commerces & boutiques ?',
    shortTitle: 'Commerces & Boutiques',
    tagline: 'Remise au propre avant état des lieux ou travaux.',
    icon: Building2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlJ-0fRMt6lIa2EvlJKbq79gaRjEhWqc-50sEWsiRyWzrjCR2QmqY96Hw_Nhzw0lfLCRLjMOKkPKHjPBB7nNtlS46gYCiPoPU0EayQXiQmxkirdTyeg8G9KDZWoXNDMyLpK4a9bW_Um-XFME1FY8XXM-6B2fF8eXdaoIyV6dewAqF4mIcfz_4ieIJBovAZ_5ebIMaJvFtof-PiaGYqwPYkqZUWPLPgC6ThTLVBu_ZgAEWEmOioqgJTvdy34bsC91BNAEsgL4JmFB0F',
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
  diogene: {
    slug: 'diogene',
    title: 'Comment se déroule une intervention Syndrome de Diogène ?',
    shortTitle: 'Syndrome de Diogène',
    tagline: "Intervention spécialisée, discrète et respectueuse pour l'accumulation compulsive.",
    icon: Sparkles,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCceA446-qBqgoZNmN6o8TvF4rQLgatA-FVCRB9aFzgFND8hsrknvpgqB58jnhXRcDnaDPDyzH3G4VTGWsPsqi5p7WucKtQk3pVB3auqreDJ7KDZBrd6RrbVfIA3J1cVVUKZ99-DlFNuD0OrTRD1dHENNy6jjpEkfXWlq0Ce52lsLXCw_PKx7jRcUCYA5qQQovN5a4vGv6wuhyws4BLzpIaMl6uVsEPGiuH7-7hbPVdQNXjC99GN18mJ321vfHbJcirrFTsWPtXOQbo',
    steps: [
      { number: 1, title: 'Contact bienveillant', description: 'Approche respectueuse et discrète de la situation' },
      { number: 2, title: 'Évaluation sensible', description: "Analyse du niveau d'accumulation" },
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

export interface ClientTypeInfo {
  title: string;
  icon: typeof Users;
  benefits: string[];
}

export const clientTypeInfo: Record<'particulier' | 'professionnel', ClientTypeInfo> = {
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
