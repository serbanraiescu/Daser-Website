import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

// --- COMPONENTS ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Servicii', path: '/servicii' },
    { name: 'Portofoliu', path: '/portofoliu' },
    { name: 'Despre', path: '/despre' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">D</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Daser <span className="text-accent">Design</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={`text-sm font-bold transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-slate-600 hover:text-accent'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b absolute w-full animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`block px-3 py-4 text-base font-bold ${location.pathname === link.path ? 'bg-accent/5 text-accent border-l-4 border-accent' : 'text-slate-600'}`}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ data }) => (
  <footer className="bg-slate-900 pt-20 pb-10 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xl">D</div>
          <span className="font-bold text-xl tracking-tight">Daser <span className="text-accent">Design Studio</span></span>
        </div>
        <p className="text-slate-400 max-w-sm mb-8">Partenerul tău de încredere în Bucovina pentru soluții profesionale de producție publicitară și branding.</p>
        <div className="flex gap-4">
          <a href={data?.company?.social?.facebook} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
          <a href={data?.company?.social?.instagram} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 tracking-wide">Link-uri Rapide</h4>
        <ul className="space-y-4 text-slate-400">
          <li><Link to="/servicii" className="hover:text-accent transition-colors">Servicii</Link></li>
          <li><Link to="/portofoliu" className="hover:text-accent transition-colors">Portofoliu</Link></li>
          <li><Link to="/despre" className="hover:text-accent transition-colors">Despre Noi</Link></li>
          <li><Link to="/faq" className="hover:text-accent transition-colors">Întrebări frecvente</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6 tracking-wide">Legal & Suport</h4>
        <ul className="space-y-4 text-slate-400">
          <li><Link to="/termeni-si-conditii" className="hover:text-accent transition-colors">Termeni și Condiții</Link></li>
          <li><Link to="/politica-de-confidentialitate" className="hover:text-accent transition-colors">Politică Confidențialitate</Link></li>
          <li><Link to="/politica-cookies" className="hover:text-accent transition-colors">Politică Cookies</Link></li>
          <li className="pt-2"><img src="https://anpc.ro/wp-content/uploads/2022/02/sal-anpc.jpg" alt="ANPC SAL" className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer mb-2" /></li>
          <li><img src="https://anpc.ro/wp-content/uploads/2022/02/sol-anpc.jpg" alt="ANPC SOL" className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" /></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-10 text-center text-slate-500 text-sm">
      <p>&copy; {new Date().getFullYear()} Daser Enterprise SRL. CIF {data?.company?.legal?.cui}. Toate drepturile rezervate.</p>
    </div>
  </footer>
);

// --- PAGES ---
const HomePage = ({ data }) => {
  const home = data?.pages?.home;
  if (!home) return null;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative bg-slate-50 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent font-bold text-xs mb-6 uppercase tracking-widest leading-none">Daser Design Studio</span>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8 uppercase italic">
              {home.hero?.title?.split('Studio').map((p, i) => (
                <span key={i}>{p}{i === 0 && <span className="text-accent underline decoration-8 underline-offset-8">Studio</span>}</span>
              ))}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed mb-10 font-medium">
              {home.hero?.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-flex justify-center items-center px-10 py-5 border border-transparent text-lg font-black rounded-full shadow-2xl shadow-accent/40 text-white bg-accent hover:bg-accent-dark transition-all transform hover:-translate-y-1 uppercase italic tracking-tighter italic">
                {home.hero?.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {home.stats?.map((stat, i) => (
              <div key={i} className="p-8 group hover:bg-slate-50 rounded-3xl transition-all">
                <div className="text-6xl font-black text-accent mb-2 tracking-tighter italic">{stat.value}</div>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('data/site_content.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // SEO Manager Logic
  const SEOManager = () => {
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
      if (!data) return;

      let pageKey = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
      let seo = data.pages?.[pageKey]?.seo;

      if (seo) {
        document.title = seo.title;
        // Update Meta
        const updateMeta = (name, value, property = false) => {
          let el = property ? document.querySelector(`meta[property="${name}"]`) : document.querySelector(`meta[name="${name}"]`);
          if (el) el.setAttribute('content', value);
        };
        updateMeta('description', seo.description);
        updateMeta('og:title', seo.og_title, true);
        updateMeta('og:description', seo.og_description, true);

        // Inject JSON-LD
        const scriptId = 'json-ld-schema';
        let existingScript = document.getElementById(scriptId);
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(seo.schema_jsonld);
        document.head.appendChild(script);
      }
    }, [location, data]);

    return null;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 italic font-black text-accent animate-pulse uppercase tracking-[0.2em]">Daser Design Studio Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-500 font-bold">Error: {error}</div>;

  return (
    <Router>
      <SEOManager />
      <div className="flex flex-col min-h-screen font-sans">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/servicii" element={<div className="pt-32 p-10 text-center font-bold">Servicii - Work in Progress</div>} />
            <Route path="/portofoliu" element={<div className="pt-32 p-10 text-center font-bold">Portofoliu - Work in Progress</div>} />
            <Route path="/despre" element={<div className="pt-32 p-10 text-center font-bold">Despre - Work in Progress</div>} />
            <Route path="/faq" element={<div className="pt-32 p-10 text-center font-bold">FAQ - Work in Progress</div>} />
            <Route path="/contact" element={<div className="pt-32 p-10 text-center font-bold">Contact - Work in Progress</div>} />
            <Route path="/termeni-si-conditii" element={<div className="pt-32 p-10 text-center font-bold">Terms - Work in Progress</div>} />
            <Route path="/politica-de-confidentialitate" element={<div className="pt-32 p-10 text-center font-bold">Privacy - Work in Progress</div>} />
          </Routes>
        </main>

        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
