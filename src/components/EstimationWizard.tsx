import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EstimationData {
  serviceType: string;
  serviceDetails: Record<string, string>;
  timeline: string;
  postalCode: string;
  city: string;
  name: string;
  phone: string;
  email: string;
}

export default function EstimationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const [data, setData] = useState<EstimationData>({
    serviceType: '',
    serviceDetails: {},
    timeline: '',
    postalCode: '',
    city: '',
    name: '',
    phone: '',
    email: '',
  });

  const totalSteps = 6;

  const updateData = (field: keyof EstimationData | string, value: string) => {
    if (field.startsWith('detail_')) {
      setData(prev => ({
        ...prev,
        serviceDetails: { ...prev.serviceDetails, [field.replace('detail_', '')]: value }
      }));
    } else {
      setData(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateEstimate = (): string => {
    const { serviceType, serviceDetails } = data;

    let basePrice = 0;
    let label = '';

    switch (serviceType) {
      case 'Cave':
        if (serviceDetails.size === 'Petite (<5 m²)') basePrice = 150;
        else if (serviceDetails.size === 'Moyenne (5-10 m²)') basePrice = 250;
        else basePrice = 400;

        if (serviceDetails.access === 'Accès difficile') basePrice += 100;
        if (serviceDetails.heavyItems === 'Oui') basePrice += 150;
        label = `${basePrice}€ - ${basePrice + 150}€`;
        break;

      case 'Appartement':
        if (serviceDetails.size === 'Studio / T1') basePrice = 300;
        else if (serviceDetails.size === 'T2 / T3') basePrice = 500;
        else basePrice = 800;

        const floor = parseInt(serviceDetails.floor || '0');
        if (floor > 3 && serviceDetails.elevator === 'Non') basePrice += 200;

        if (serviceDetails.clutter === 'Entièrement meublé') basePrice += 300;
        else if (serviceDetails.clutter === 'Partiellement meublé') basePrice += 150;

        label = `${basePrice}€ - ${basePrice + 300}€`;
        break;

      case 'Maison':
        const floors = parseInt(serviceDetails.floors || '1');
        basePrice = 600 + (floors - 1) * 300;

        const surface = parseInt(serviceDetails.surface || '0');
        if (surface > 150) basePrice += 400;
        else if (surface > 100) basePrice += 200;

        if (serviceDetails.outbuildings === 'Oui') basePrice += 300;

        label = `${basePrice}€ - ${basePrice + 500}€`;
        break;

      case 'Grenier':
        if (serviceDetails.access === 'Trappe') basePrice = 200;
        else basePrice = 150;

        if (serviceDetails.volume === 'Important (>10 m³)') basePrice += 250;
        else if (serviceDetails.volume === 'Moyen (5-10 m³)') basePrice += 150;
        else basePrice += 80;

        label = `${basePrice}€ - ${basePrice + 150}€`;
        break;

      case 'Local commercial':
        const commercialSurface = parseInt(serviceDetails.surface || '0');
        if (commercialSurface > 200) basePrice = 1500;
        else if (commercialSurface > 100) basePrice = 1000;
        else basePrice = 600;

        if (serviceDetails.wasteVolume === 'Important') basePrice += 500;
        else if (serviceDetails.wasteVolume === 'Moyen') basePrice += 250;

        label = `${basePrice}€ - ${basePrice + 700}€`;
        break;
    }

    if (data.timeline === 'Urgent (24-48h)') {
      basePrice = Math.round(basePrice * 1.3);
      label = `${basePrice}€ - ${basePrice + 300}€`;
    }

    return label;
  };

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      const estimate = calculateEstimate();
      setEstimatedPrice(estimate);
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('estimations').insert({
        service_type: data.serviceType,
        service_details: data.serviceDetails,
        timeline: data.timeline,
        postal_code: data.postalCode,
        city: data.city,
        name: data.name,
        phone: data.phone,
        email: data.email,
        estimated_price: estimatedPrice,
        status: 'new'
      });

      if (error) throw error;

      // Envoi de l'e-mail de récapitulatif via une Edge Function Supabase
      const { error: functionError } = await supabase.functions.invoke('send-estimation-email', {
        body: {
          email: data.email,
          name: data.name,
          service_type: data.serviceType,
          estimated_price: estimatedPrice
        }
      });

      if (functionError) {
        console.error('Erreur lors de l\'envoi de l\'email:', functionError);
        const errorMsg = functionError instanceof Error ? functionError.message : JSON.stringify(functionError);
        alert('Demande reçue, mais erreur d\'envoi d\'email. \n\nCause possible : domaine Resend non vérifié ou erreur de configuration. \n\nDétails techniques : ' + errorMsg);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting estimation:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderServiceQuestions = () => {
    switch (data.serviceType) {
      case 'Cave':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Taille de la cave
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Petite (<5 m²)', 'Moyenne (5-10 m²)', 'Grande (>10 m²)'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_size', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.size === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Accessibilité
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Accès facile', 'Accès difficile'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_access', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.access === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Y a-t-il des objets lourds ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Oui', 'Non'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_heavyItems', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      data.serviceDetails.heavyItems === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Appartement':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Taille de l'appartement
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Studio / T1', 'T2 / T3', 'T4 et +'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_size', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.size === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Étage
              </label>
              <input
                type="number"
                value={data.serviceDetails.floor || ''}
                onChange={(e) => updateData('detail_floor', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                placeholder="Ex: 3"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Y a-t-il un ascenseur ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Oui', 'Non'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_elevator', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      data.serviceDetails.elevator === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Niveau d'encombrement
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Peu encombré', 'Partiellement meublé', 'Entièrement meublé'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_clutter', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.clutter === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Maison':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Nombre d'étages
              </label>
              <input
                type="number"
                value={data.serviceDetails.floors || ''}
                onChange={(e) => updateData('detail_floors', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                placeholder="Ex: 2"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Surface approximative (m²)
              </label>
              <input
                type="number"
                value={data.serviceDetails.surface || ''}
                onChange={(e) => updateData('detail_surface', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                placeholder="Ex: 120"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Y a-t-il des dépendances ? (garage, cave, grenier)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Oui', 'Non'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_outbuildings', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      data.serviceDetails.outbuildings === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Grenier':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Type d'accès
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Trappe', 'Escalier'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_access', option)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      data.serviceDetails.access === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Volume à débarrasser
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Faible (<5 m³)', 'Moyen (5-10 m³)', 'Important (>10 m³)'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_volume', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.volume === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Local commercial':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Surface du local (m²)
              </label>
              <input
                type="number"
                value={data.serviceDetails.surface || ''}
                onChange={(e) => updateData('detail_surface', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                placeholder="Ex: 150"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Type d'activité
              </label>
              <input
                type="text"
                value={data.serviceDetails.activityType || ''}
                onChange={(e) => updateData('detail_activityType', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                placeholder="Ex: Restaurant, Bureau, Commerce"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Volume de déchets
              </label>
              <div className="grid grid-cols-1 gap-3">
                {['Faible', 'Moyen', 'Important'].map(option => (
                  <button
                    key={option}
                    onClick={() => updateData('detail_wasteVolume', option)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      data.serviceDetails.wasteVolume === option
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.serviceType !== '';
      case 2:
        if (data.serviceType === 'Cave') {
          return data.serviceDetails.size && data.serviceDetails.access && data.serviceDetails.heavyItems;
        }
        if (data.serviceType === 'Appartement') {
          return data.serviceDetails.size && data.serviceDetails.floor && data.serviceDetails.elevator && data.serviceDetails.clutter;
        }
        if (data.serviceType === 'Maison') {
          return data.serviceDetails.floors && data.serviceDetails.surface && data.serviceDetails.outbuildings;
        }
        if (data.serviceType === 'Grenier') {
          return data.serviceDetails.access && data.serviceDetails.volume;
        }
        if (data.serviceType === 'Local commercial') {
          return data.serviceDetails.surface && data.serviceDetails.activityType && data.serviceDetails.wasteVolume;
        }
        return false;
      case 3:
        return data.timeline !== '';
      case 4:
        return data.postalCode !== '' && data.city !== '';
      case 5:
        return data.name !== '' && data.phone !== '' && data.email !== '';
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Estimation envoyée !
          </h2>
          <p className="text-gray-600 mb-6">
            Merci {data.name} pour votre demande. Nous avons bien reçu votre estimation pour un débarras de type "{data.serviceType}".
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Estimation indicative</p>
            <p className="text-3xl font-bold text-blue-600">{estimatedPrice}</p>
          </div>
          <p className="text-gray-600 mb-8">
            Un membre de notre équipe vous contactera dans les 24h au <strong>{data.phone}</strong> pour confirmer cette estimation et planifier votre intervention.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Faire une nouvelle estimation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Estimation gratuite</h2>
          <span className="text-sm text-gray-500">Étape {currentStep}/{totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quel type de débarras souhaitez-vous ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Cave', 'Appartement', 'Maison', 'Grenier', 'Local commercial'].map(service => (
                <button
                  key={service}
                  onClick={() => updateData('serviceType', service)}
                  className={`p-6 rounded-xl border-2 transition-all text-left font-semibold ${
                    data.serviceType === service
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quelques détails sur votre {data.serviceType}
            </h3>
            {renderServiceQuestions()}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quel est votre délai souhaité ?
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {['Urgent (24-48h)', 'Cette semaine', 'Flexible'].map(option => (
                <button
                  key={option}
                  onClick={() => updateData('timeline', option)}
                  className={`p-6 rounded-xl border-2 transition-all text-left font-semibold ${
                    data.timeline === option
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Où se situe le bien ?
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Code postal
                </label>
                <input
                  type="text"
                  value={data.postalCode}
                  onChange={(e) => updateData('postalCode', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Ex: 75001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => updateData('city', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Ex: Paris"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Vos coordonnées
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => updateData('name', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData('phone', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData('email', e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Récapitulatif de votre demande
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Type de service</p>
                <p className="font-semibold text-gray-900">{data.serviceType}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Délai</p>
                <p className="font-semibold text-gray-900">{data.timeline}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Localisation</p>
                <p className="font-semibold text-gray-900">{data.postalCode} {data.city}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-semibold text-gray-900">{data.name}</p>
                <p className="text-sm text-gray-600">{data.phone} • {data.email}</p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Estimation indicative</p>
                <p className="text-3xl font-bold text-blue-600">{estimatedPrice}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Cette estimation est donnée à titre indicatif et pourra être ajustée après visite.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 gap-4">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>
        )}

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ml-auto ${
              isStepValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Recevoir mon estimation gratuite'}
            {!isSubmitting && <Check className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
