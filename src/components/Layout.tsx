import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Videbarras team', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isNavSolid = isScrolled || mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    animate(headerRef.current, {
      backgroundColor: isNavSolid ? '#fffffff2' : '#ffffff00',
      boxShadow: isNavSolid
        ? '0 1px 0 rgba(15, 23, 42, 0.08)'
        : '0 1px 0 rgba(15, 23, 42, 0)',
      duration: 350,
      ease: 'outQuad',
    });
  }, [isNavSolid]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <header
        ref={headerRef}
        className="fixed top-0 w-full z-50 backdrop-blur-sm"
        style={{ backgroundColor: '#ffffff00' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Link to="/" className="flex items-center">
              <img
                src="/debara.png"
                alt="Vidébarras"
                className="h-10 md:h-11 w-auto transition-all duration-300"
              />
            </Link>

            <nav className="hidden md:flex items-center justify-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive(item.path)
                      ? isNavSolid
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white border-b-2 border-white'
                      : isNavSolid
                        ? 'text-gray-600 hover:text-primary'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="tel:+33695257352"
                className={`flex items-center space-x-2 transition-colors duration-300 ${
                  isNavSolid ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-white/80'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">06 95 25 73 52</span>
              </a>
            </div>

            <button
              className={`md:hidden transition-colors duration-300 ${
                isNavSolid ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block text-base font-medium ${
                    isActive(item.path) ? 'text-primary' : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a href="tel:+33695257352" className="flex items-center space-x-2 text-gray-700 pt-4 border-t border-gray-100">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">06 95 25 73 52</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-black text-white mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img
                src="/debara.png"
                alt="Vidébarras"
                className="h-16 w-auto mb-6"
              />
              <p className="text-gray-300 leading-relaxed">
                Votre expert en débarras en Île-de-France. Service professionnel, rapide et respectueux de l'environnement.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-gray-300 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5" />
                  <span>+33695257352</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5" />
                  <span>Contact@vidédarras.fr</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Vidébarras. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
