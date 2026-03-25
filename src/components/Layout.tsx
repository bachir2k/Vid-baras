import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Videbarras team', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <Link to="/" className="flex items-center">
              <img
                src="/debara.png"
                alt="Vidébarras"
                className="h-16 md:h-16 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center justify-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-6">
              <a href="tel:+33695257352" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">06 95 25 73 52</span>
              </a>
            </div>

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      <main className="pt-24">
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
