export const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Vidébarras',
  image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1200',
  '@id': 'https://videbarras.fr',
  url: 'https://videbarras.fr',
  telephone: '+33769181264',
  email: 'contact@videbarras.fr',
  priceRange: '€€',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France',
    postalCode: '75000',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.8566,
    longitude: 2.3522,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Paris',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Hauts-de-Seine',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Seine-Saint-Denis',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Val-de-Marne',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Seine-et-Marne',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Yvelines',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Essonne',
    },
    {
      '@type': 'AdministrativeArea',
      name: "Val-d'Oise",
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.tiktok.com/@roiddebarras',
  ],
};

export const serviceData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Débarras',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Vidébarras',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  areaServed: {
    '@type': 'State',
    name: 'Île-de-France',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de débarras',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Débarras appartement',
          description: 'Débarras complet d\'appartement en Île-de-France',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Débarras maison',
          description: 'Débarras de maison de la cave au grenier',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Débarras cave et grenier',
          description: 'Débarras et nettoyage de cave et grenier',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Débarras professionnel',
          description: 'Débarras de bureaux et locaux commerciaux',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Syndrome de Diogène',
          description: 'Intervention spécialisée pour accumulation compulsive',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Nettoyage après débarras',
          description: 'Nettoyage complet et désinfection après débarras',
        },
      },
    ],
  },
};

export const breadcrumbList = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqData = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
