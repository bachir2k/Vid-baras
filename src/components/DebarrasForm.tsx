import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface FormData {
  type: string;
  size: string;
  floor: string;
  elevator: string;
  volume: string;
  items: string[];
  postalCode: string;
  city: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
}

export default function DebarrasForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    type: '',
    size: '',
    floor: '',
    elevator: '',
    volume: '',
    items: [],
    postalCode: '',
    city: '',
    urgency: '',
    name: '',
    phone: '',
    email: '',
  });

  const totalSteps = 8;

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleItem = (item: string) => {
    const items = formData.items.includes(item)
      ? formData.items.filter(i => i !== item)
      : [...formData.items, item];
    updateField('items', items);
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.type !== '';
      case 2: return formData.size !== '';
      case 3: return formData.floor !== '' && formData.elevator !== '';
      case 4: return formData.volume !== '';
      case 5: return true;
      case 6: return formData.postalCode !== '' && formData.city !== '';
      case 7: return formData.urgency !== '';
      case 8: return formData.name !== '' && formData.phone !== '' && formData.email !== '';
      default: return false;
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Merci ! Votre demande a été envoyée. Nous vous recontacterons sous 24h.');
  };

  const getSummary = () => {
    return `Débarras d'un ${formData.type} ${formData.size}, ${formData.floor} ${formData.elevator === 'non' ? 'sans ascenseur' : 'avec ascenseur'}, ${formData.volume}, situé à ${formData.postalCode} ${formData.city}. Intervention souhaitée : ${formData.urgency}.`;
  };

  const OptionButton = ({ label, value, field, selected }: { label: string; value: string; field: keyof FormData; selected: boolean }) => (
    <button
      type="button"
      onClick={() => updateField(field, value)}
      className={`p-4 rounded-xl border-2 transition-all font-medium ${
        selected
          ? 'border-primary bg-primary text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
      }`}
    >
      {label}
    </button>
  );

  const CheckboxButton = ({ label, value, checked }: { label: string; value: string; checked: boolean }) => (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={`p-4 rounded-xl border-2 transition-all font-medium flex items-center gap-2 ${
        checked
          ? 'border-primary bg-blue-50 text-primary'
          : 'border-gray-200 bg-white text-gray-700 hover:border-primary'
      }`}
    >
      {checked && <CheckCircle2 className="h-5 w-5" />}
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-black">Estimation gratuite</h3>
          <span className="text-sm font-medium text-gray-500">Étape {step}/{totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Type de débarras</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <OptionButton label="Appartement" value="appartement" field="type" selected={formData.type === 'appartement'} />
              <OptionButton label="Maison" value="maison" field="type" selected={formData.type === 'maison'} />
              <OptionButton label="Cave / Grenier" value="cave-grenier" field="type" selected={formData.type === 'cave-grenier'} />
              <OptionButton label="Local commercial" value="local-commercial" field="type" selected={formData.type === 'local-commercial'} />
              <OptionButton label="Autre" value="autre" field="type" selected={formData.type === 'autre'} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Taille du logement</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <OptionButton label="Studio" value="studio" field="size" selected={formData.size === 'studio'} />
              <OptionButton label="T1 / T2" value="t1-t2" field="size" selected={formData.size === 't1-t2'} />
              <OptionButton label="T3" value="t3" field="size" selected={formData.size === 't3'} />
              <OptionButton label="T4" value="t4" field="size" selected={formData.size === 't4'} />
              <OptionButton label="T5 et +" value="t5+" field="size" selected={formData.size === 't5+'} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Accès</h4>
            <div>
              <p className="font-medium text-gray-700 mb-3">Étage</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionButton label="Rez-de-chaussée" value="rez-de-chaussée" field="floor" selected={formData.floor === 'rez-de-chaussée'} />
                <OptionButton label="1 - 2" value="1-2" field="floor" selected={formData.floor === '1-2'} />
                <OptionButton label="3 - 4" value="3-4" field="floor" selected={formData.floor === '3-4'} />
                <OptionButton label="5 et +" value="5+" field="floor" selected={formData.floor === '5+'} />
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-3">Ascenseur</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionButton label="Oui" value="oui" field="elevator" selected={formData.elevator === 'oui'} />
                <OptionButton label="Non" value="non" field="elevator" selected={formData.elevator === 'non'} />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Volume à débarrasser</h4>
            <div className="grid grid-cols-1 gap-4">
              <OptionButton label="Quelques meubles" value="quelques-meubles" field="volume" selected={formData.volume === 'quelques-meubles'} />
              <OptionButton label="Logement partiellement meublé" value="partiellement-meuble" field="volume" selected={formData.volume === 'partiellement-meuble'} />
              <OptionButton label="Logement entièrement meublé" value="entierement-meuble" field="volume" selected={formData.volume === 'entierement-meuble'} />
              <OptionButton label="Très encombré (succession / syndrome de Diogène)" value="tres-encombre" field="volume" selected={formData.volume === 'tres-encombre'} />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Type d'objets (optionnel)</h4>
            <div className="grid grid-cols-2 gap-4">
              <CheckboxButton label="Meubles" value="meubles" checked={formData.items.includes('meubles')} />
              <CheckboxButton label="Électroménager" value="electromenager" checked={formData.items.includes('electromenager')} />
              <CheckboxButton label="Cartons" value="cartons" checked={formData.items.includes('cartons')} />
              <CheckboxButton label="Déchets" value="dechets" checked={formData.items.includes('dechets')} />
              <CheckboxButton label="Objets lourds" value="objets-lourds" checked={formData.items.includes('objets-lourds')} />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Localisation</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateField('postalCode', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none transition-colors"
                  placeholder="75001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none transition-colors"
                  placeholder="Paris"
                />
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Délai souhaité</h4>
            <div className="grid grid-cols-1 gap-4">
              <OptionButton label="Urgent (24-48h)" value="urgent" field="urgency" selected={formData.urgency === 'urgent'} />
              <OptionButton label="Cette semaine" value="cette-semaine" field="urgency" selected={formData.urgency === 'cette-semaine'} />
              <OptionButton label="Date flexible" value="flexible" field="urgency" selected={formData.urgency === 'flexible'} />
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-black">Vos coordonnées</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none transition-colors"
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary outline-none transition-colors"
                  placeholder="jean.dupont@email.com"
                />
              </div>
            </div>
            {canProceed() && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-primary">
                <p className="text-sm font-semibold text-black mb-2">Résumé de votre demande :</p>
                <p className="text-sm text-gray-700">{getSummary()}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </button>
        )}
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg ml-auto ${
              canProceed()
                ? 'bg-primary text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg ml-auto ${
              canProceed()
                ? 'bg-primary text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Recevoir mon estimation gratuite
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
