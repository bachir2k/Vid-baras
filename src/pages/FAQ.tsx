import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';
import { faqData, breadcrumbList } from '../lib/structuredData';

const faqs = [
  {
    question: 'Quel est le tarif pour un débarras d\'appartement à Paris ?',
    answer: 'Le tarif d\'un débarras d\'appartement varie selon la surface, le volume d\'objets et l\'accessibilité. En moyenne, comptez entre 300€ et 1500€ pour un appartement standard. Nous proposons un devis gratuit et sans engagement après visite ou sur photos.',
    category: 'Tarifs',
  },
  {
    question: 'Intervenez-vous dans toute l\'Île-de-France ?',
    answer: 'Oui, nous intervenons dans tous les départements d\'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Seine-et-Marne (77), Yvelines (78), Essonne (91) et Val-d\'Oise (95). Notre équipe peut se déplacer partout en moins de 2 heures.',
    category: 'Zone d\'intervention',
  },
  {
    question: 'Combien de temps dure un débarras ?',
    answer: 'La durée dépend du volume à évacuer. Un studio peut être vidé en 2-3 heures, un appartement T3-T4 en une journée, et une maison complète en 1 à 2 jours. Nous nous adaptons à vos contraintes de planning.',
    category: 'Délais',
  },
  {
    question: 'Proposez-vous un service de nettoyage après débarras ?',
    answer: 'Oui, nous proposons un service de nettoyage complet après le débarras. Cela inclut le balayage, le lavage des sols, le dépoussiérage et la désinfection si nécessaire. C\'est idéal pour une remise en location ou une vente immobilière.',
    category: 'Services',
  },
  {
    question: 'Que faites-vous des objets récupérés ?',
    answer: 'Nous trions systématiquement tous les objets. Les meubles et objets en bon état sont donnés à des associations (Emmaüs, Croix-Rouge). Les matériaux recyclables (bois, métal, papier) sont acheminés vers des centres de tri agréés. Nous garantissons zéro dépôt sauvage.',
    category: 'Écologie',
  },
  {
    question: 'Dois-je être présent pendant le débarras ?',
    answer: 'Non, votre présence n\'est pas obligatoire. Après avoir validé ensemble ce qui doit être conservé ou jeté, notre équipe peut intervenir en toute autonomie. Vous pouvez nous confier les clés en toute confiance.',
    category: 'Organisation',
  },
  {
    question: 'Débarrassez-vous les caves et greniers ?',
    answer: 'Oui, nous intervenons dans les caves, greniers, garages et tous espaces de stockage. Même avec un accès difficile (escaliers étroits, absence d\'ascenseur), nous adaptons nos moyens pour évacuer tous les encombrants.',
    category: 'Services',
  },
  {
    question: 'Comment obtenir un devis gratuit ?',
    answer: 'Contactez-nous par téléphone au 07 69 18 12 64, par email à contact@videbarras.fr ou via notre formulaire en ligne. Nous pouvons établir un devis sur photos ou organiser une visite gratuite sur place. Vous recevrez votre estimation sous 24 heures.',
    category: 'Devis',
  },
  {
    question: 'Acceptez-vous les paiements en plusieurs fois ?',
    answer: 'Oui, pour les prestations importantes, nous pouvons proposer un paiement en 2 ou 3 fois sans frais. Nous acceptons les paiements par chèque, virement bancaire ou espèces.',
    category: 'Paiement',
  },
  {
    question: 'Gérez-vous les débarras après décès ?',
    answer: 'Oui, nous intervenons avec empathie et discrétion dans les situations de succession ou après décès. Notre équipe prend le temps nécessaire pour trier avec vous les objets à conserver, à donner ou à jeter, dans le respect de la mémoire du défunt.',
    category: 'Services',
  },
  {
    question: 'Êtes-vous assurés pour intervenir dans mon logement ?',
    answer: 'Oui, notre entreprise dispose d\'une assurance responsabilité civile professionnelle qui couvre tous nos déplacements et interventions. Nous garantissons la protection de votre bien et des parties communes.',
    category: 'Assurance',
  },
  {
    question: 'Intervenez-vous le week-end ?',
    answer: 'Oui, nous travaillons 7 jours sur 7, du lundi au dimanche. Nous nous adaptons à vos disponibilités et pouvons intervenir en soirée pour les professionnels qui ne peuvent pas fermer en journée.',
    category: 'Horaires',
  },
  {
    question: 'Quel délai pour une intervention d\'urgence ?',
    answer: 'En cas d\'urgence (départ précipité, vente rapide, état des lieux imminent), nous pouvons intervenir sous 24 à 48 heures selon nos disponibilités. Contactez-nous au plus vite pour organiser une intervention express.',
    category: 'Urgence',
  },
  {
    question: 'Prenez-vous en charge le débarras de bureaux et locaux professionnels ?',
    answer: 'Oui, nous proposons un service dédié aux professionnels : débarras de bureaux, locaux commerciaux, entrepôts. Nous pouvons intervenir hors horaires d\'ouverture et garantir la confidentialité des documents (destruction certifiée).',
    category: 'Professionnels',
  },
  {
    question: 'Comment se passe un débarras en copropriété ?',
    answer: 'Nous respectons scrupuleusement les règles de la copropriété : protection des parties communes, utilisation d\'un monte-meuble si nécessaire, réservation d\'ascenseur, nettoyage après passage. Nous pouvons également fournir une attestation d\'assurance au syndic si demandée.',
    category: 'Copropriété',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div>
      <SEO
        title="Questions Fréquentes sur le Débarras"
        description="Toutes les réponses à vos questions sur nos services de débarras en Île-de-France : tarifs, délais, zones d'intervention, démarches. Devis gratuit et conseils d'experts."
        keywords="faq débarras, questions débarras, tarif débarras paris, combien coûte un débarras, débarras ile de france prix, durée débarras, zone intervention débarras"
        canonical="https://videbarras.fr/faq"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            faqData(faqs),
            breadcrumbList([
              { name: 'Accueil', url: 'https://videbarras.fr' },
              { name: 'FAQ', url: 'https://videbarras.fr/faq' },
            ]),
          ],
        }}
      />

      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Toutes les réponses à vos questions sur nos services de débarras en Île-de-France
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-gray-600 text-lg">
              Vous ne trouvez pas la réponse à votre question ?{' '}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Contactez-nous
              </Link>
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-primary">
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter((faq) => faq.category === category)
                  .map((faq, index) => {
                    const globalIndex = faqs.indexOf(faq);
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={globalIndex}
                        className="bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                        >
                          <h3 className="font-bold text-slate-900 text-lg leading-tight">
                            {faq.question}
                          </h3>
                          <ChevronDown
                            className={`h-6 w-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contactez-nous pour obtenir une estimation gratuite et sans engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary hover:bg-gray-100 transition-colors rounded-lg shadow-xl"
            >
              Demander un devis gratuit
            </Link>
            <a
              href="tel:+33769181264"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors rounded-lg border-2 border-white/30"
            >
              07 69 18 12 64
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
