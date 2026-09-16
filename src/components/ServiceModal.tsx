import { X, Home, Users } from 'lucide-react';
import { useEffect } from 'react';
import { serviceDetails, clientTypeInfo } from '../lib/serviceDetails';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  clientType: 'particulier' | 'professionnel';
}

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
