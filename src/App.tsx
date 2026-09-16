import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Realizations from './pages/Realizations';
import FAQ from './pages/FAQ';
import ServiceDetail from './pages/ServiceDetail';
import Merci from './pages/Merci';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Le contenu de Services.tsx est en réalité la page "équipe/à propos"
              (hero "Videbarras Team", histoire, bios) et celui de About.tsx est
              en réalité le catalogue de services (tabs Particuliers/Professionnels) —
              les deux étaient inversés par rapport à leur URL. */}
          <Route path="/services" element={<About />} />
          <Route path="/services/:serviceKey" element={<ServiceDetail />} />
          <Route path="/realisations" element={<Realizations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/merci" element={<Merci />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
