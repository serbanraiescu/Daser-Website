import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- COMPONENTS ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Servicii', path: '/servicii' },
    { name: 'Portofoliu', path: '/portofoliu' },
    { name: 'Despre', path: '/despre' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform">D</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Daser <span className="text-accent">Design</span>
            </span>
          </Link>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className={`text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-slate-600 hover:text-accent'}`}>
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-accent text-white px-6 py-3 rounded-full font-black uppercase tracking-tighter text-sm italic hover:bg-slate-900 transition-all shadow-lg shadow-accent/20">
              Solicită Ofertă
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600 p-2">
            <svg width="24" height="24" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b absolute w-full animate-in slide-in-from-top duration-300 shadow-xl">
          <div className="px-6 pt-4 pb-8 space-y-4">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className={`block py-3 text-lg font-black uppercase italic tracking-tight ${location.pathname === link.path ? 'text-accent' : 'text-slate-600'}`}>
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-accent text-white py-4 rounded-xl font-black uppercase italic">
              Solicită Ofertă
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const DecorativeSVG = () => (
  <div className="absolute right-0 top-0 opacity-5 pointer-events-none max-w-[600px] w-full overflow-hidden" aria-hidden="true">
    <svg width="600" height="600" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M400 0L800 400L400 800L0 400L400 0Z" fill="currentColor" />
    </svg>
  </div>
);

const Footer = ({ data }) => (
  <footer className="bg-slate-900 pt-24 pb-12 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 relative z-10">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xl">D</div>
          <span className="font-bold text-xl tracking-tight uppercase italic">Daser <span className="text-accent">Design Studio</span></span>
        </div>
        <p className="text-slate-400 leading-relaxed mb-8 font-medium">Partenerul tău premium în Bucovina pentru soluții complete de branding și producție publicitară la cele mai înalte standarde.</p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-all">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-all">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-accent italic">Link-uri rapide</h4>
        <ul className="space-y-4 text-slate-400 font-medium">
          <li><Link to="/servicii" className="hover:text-white transition-colors">Servicii Pubicitare</Link></li>
          <li><Link to="/portofoliu" className="hover:text-white transition-colors">Portofoliu Lucrări</Link></li>
          <li><Link to="/despre" className="hover:text-white transition-colors">Echipa Noastră</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Solicită Ofertă</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-accent italic">Informații Contact</h4>
        <ul className="space-y-4 text-slate-400 font-medium">
          <li className="flex items-center gap-3"><span className="text-white">Tel:</span> {data?.company?.contact?.phone}</li>
          <li className="flex items-center gap-3"><span className="text-white">Email:</span> {data?.company?.contact?.email}</li>
          <li className="flex items-center gap-3"><span className="text-white">Locație:</span> Câmpulung Moldovenesc, Suceava</li>
          <li className="flex items-center gap-3 font-bold italic text-white uppercase tracking-tighter pt-2">Program: {data?.company?.contact?.schedule}</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-6 relative z-10">
      <p>&copy; {new Date().getFullYear()} Daser Design Studio – Daser Enterprise SRL. Toate drepturile rezervate.</p>
      <div className="flex gap-8">
        <Link to="/termeni-si-conditii" className="hover:text-white transition-colors">Termeni</Link>
        <Link to="/politica-de-confidentialitate" className="hover:text-white transition-colors">Politică GDPR</Link>
      </div>
    </div>
  </footer>
);

// --- PAGES ---
const HomePage = ({ data }) => {
  const services = [
    { title: 'Colantări Auto', slug: 'colantari-auto', desc: 'Transformăm vehiculele în instrumente de marketing mobil cu folii premium.', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M17.803 16.203L19 16h1a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0018 8h-2l-3 4s-3-1-3 4" /></svg> },
    { title: 'Print Mare Format', slug: 'print-mare-format', desc: 'Bannere, autocolante și mesh-uri realizate la rezoluție fotografică.', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: 'Textile Personalizate', slug: 'textile-personalizate', desc: 'Echipamente de lucru și promovare personalizate prin DTF sau broderie.', icon: <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" /></svg> }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-white">
        <DecorativeSVG />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block py-2 px-6 rounded-full bg-accent/5 text-accent font-black text-xs mb-8 uppercase tracking-[0.3em] leading-none italic">Est. 2012 • Bucovina</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8 uppercase italic">
              Producție Publicitară <br /> & Branding <span className="text-accent underline decoration-[8px] underline-offset-[12px]">Profesional</span> în Bucovina
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-xl text-slate-500 leading-relaxed mb-10 font-medium">
              Colantări auto, print mare format, textile personalizate și semnalistică realizate în atelier propriu, cu atenție la detalii și execuție rapidă.
            </p>

            <ul className="space-y-4 mb-12 hidden md:block">
              {['Atelier propriu în Câmpulung Moldovenesc', 'Control complet al calității', 'Montaj profesional', 'Soluții personalizate pentru fiecare business'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-900 font-bold italic uppercase tracking-tighter">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <Link to="/contact" className="px-12 py-6 bg-accent text-white font-black uppercase italic tracking-tighter text-xl rounded-full hover:bg-slate-900 transition-all shadow-2xl shadow-accent/40 transform hover:-translate-y-1">
                Cere Ofertă Rapidă
              </Link>
              <Link to="/portofoliu" className="px-12 py-6 border-2 border-slate-900 text-slate-900 font-black uppercase italic tracking-tighter text-xl rounded-full hover:bg-slate-50 transition-all transform hover:-translate-y-1">
                Vezi Portofoliul
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-accent/5 rounded-[2.5rem] -rotate-3 scale-105 pointer-events-none"></div>
            <img
              src="/assets/hero.png"
              alt="Daser Design Studio Production"
              className="w-full aspect-[4/3] object-cover rounded-[2.2rem] shadow-2xl border-4 border-white relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-slate-900">Servicii <span className="text-accent">Daser</span></h2>
            <p className="text-slate-500 font-medium italic">De la design la montajul final, totul sub același acoperiș.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="text-accent mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight">{item.title}</h3>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed">{item.desc}</p>
                <Link to={`/servicii/${item.slug}`} className="inline-block text-accent font-black uppercase tracking-widest text-sm border-b-2 border-accent pb-1 hover:text-slate-900 hover:border-slate-900 transition-all">Detalii Serviciu</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-20 bg-accent text-white italic overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { v: '1500+', l: 'Proiecte Finalizate' },
            { v: '12+', l: 'Ani Experiență' },
            { v: '450+', l: 'Clienți Locali' },
            { v: '100%', l: 'Execuție Rapidă' }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-black tracking-tighter mb-2">{stat.v}</div>
              <div className="text-xs font-black uppercase tracking-widest opacity-80">{stat.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('data/site_content.json')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white italic font-black text-accent animate-pulse uppercase tracking-widest text-4xl">Daser Design Studio</div>;

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white">
        <Header />
        <main className="flex-grow overflow-x-hidden pt-20 md:pt-0">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/servicii" element={<div className="pt-40 pb-20 text-center font-black text-4xl uppercase">Servicii Pubicitare</div>} />
            <Route path="/portofoliu" element={<div className="pt-40 pb-20 text-center font-black text-4xl uppercase italic">Portofoliu Lucrări</div>} />
            <Route path="/despre" element={<div className="pt-40 pb-20 text-center font-black text-4xl uppercase">Povestea Noastră</div>} />
            <Route path="/contact" element={<div className="pt-40 pb-20 text-center font-black text-4xl uppercase italic text-accent underline underline-offset-8 decoration-8 decoration-slate-900">Contactează-ne</div>} />
          </Routes>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
