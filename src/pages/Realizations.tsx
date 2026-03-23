import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Play } from 'lucide-react';
import SEO from '../components/SEO';

interface Realization {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  media_urls: string[];
  media_type: 'photo' | 'video' | 'mixed';
  featured: boolean;
}

export default function Realizations() {
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<{url: string; type: string} | null>(null);

  useEffect(() => {
    fetchRealizations();
  }, []);

  async function fetchRealizations() {
    try {
      const { data, error } = await supabase
        .from('realizations')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setRealizations(data || []);
    } catch (error) {
      console.error('Error fetching realizations:', error);
    } finally {
      setLoading(false);
    }
  }

  const getMediaType = (url: string): 'photo' | 'video' => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) ? 'video' : 'photo';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <SEO
        title="Nos Réalisations - Vidébarras Île-de-France"
        description="Explorez nos projets de débarras de maisons, appartements, caves et locaux professionnels en images et vidéos. Résultat garanti avant/après."
      />
      <main className="flex flex-col grow pt-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="relative mx-auto max-w-[1200px] px-4 sm:px-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Nos <span className="text-primary">Réalisations</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos interventions de débarras en Île-de-France.
              Chaque projet est unique et traité avec le plus grand soin.
            </p>
          </div>
        </div>

        <section className="py-12 md:py-16 px-4 sm:px-10 bg-slate-50 dark:bg-slate-900">
          <div className="mx-auto max-w-[1400px]">
            {realizations.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Nos réalisations arrivent bientôt
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Nous sommes en train de constituer notre galerie de projets réalisés.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {realizations.map((realization) => (
                  <div
                    key={realization.id}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {realization.media_urls.length > 0 ? (
                        <>
                          {getMediaType(realization.media_urls[0]) === 'video' ? (
                            <div className="relative w-full h-full">
                              <video
                                src={realization.media_urls[0]}
                                aria-label={`Vidéo d'intervention pour ${realization.title}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                poster=""
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <button
                                  onClick={() => setSelectedMedia({ url: realization.media_urls[0], type: 'video' })}
                                  className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all transform hover:scale-110"
                                >
                                  <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={realization.media_urls[0]}
                              alt={realization.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                              onClick={() => setSelectedMedia({ url: realization.media_urls[0], type: 'photo' })}
                            />
                          )}
                          {realization.media_urls.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                              +{realization.media_urls.length - 1}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {realization.title}
                        </h3>
                        {realization.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {realization.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{realization.location}</span>
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">
                          {new Date(realization.date).toLocaleDateString('fr-FR', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedMedia(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.url}
                aria-label="Vidéo de l'intervention"
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt="Realization"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
