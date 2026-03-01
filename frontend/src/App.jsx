import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

/**
 * STUPID-PROOF ICON WRAPPER
 * Ensures icons never exceed their intended size even if CSS fails to load.
 */
const Icon = ({ children, size = 24, className = "" }) => (
  <div
    style={{ width: `${size}px`, height: `${size}px` }}
    className={`flex items-center justify-center shrink-0 ${className}`}
  >
    {children}
  </div>
);

// --- COMPONENTS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Servicii', path: '/servicii' },
    { name: 'Despre', path: '/despre' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent/20">D</div>
          <span className="font-black text-xl tracking-tighter text-slate-900 uppercase italic">
            Daser<span className="text-accent underline decoration-4 underline-offset-4">Studio</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-slate-400'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="bg-slate-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter text-xs hover:bg-accent transition-all">
            Cere Ofertă
          </Link>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
          <Icon size={24}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} /></svg>
          </Icon>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in fade-in">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = ({ data }) => (
  <footer className="bg-white border-t border-slate-100 pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm">D</div>
            <span className="font-black text-lg tracking-tighter uppercase italic">Daser Studio</span>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-900 mb-10 leading-tight">Expertiză premium în Bucovina pentru branding de impact.</p>
          <div className="flex gap-4">
            <a href="#" className="p-4 bg-slate-50 rounded-2xl hover:bg-accent hover:text-white transition-all">
              <Icon size={20}><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></Icon>
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Meniu</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter">
            <li><Link to="/servicii">Servicii</Link></li>
            <li><Link to="/despre">Despre</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Contact Direct</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter">
            <li>{data?.company?.contact?.phone}</li>
            <li>{data?.company?.contact?.email}</li>
            <li className="text-accent">{data?.company?.contact?.schedule}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between pt-10 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 gap-6">
        <p>&copy; {new Date().getFullYear()} Daser Enterprise SRL</p>
        <div className="flex gap-10">
          <Link to="/termeni-si-conditii">Terms</Link>
          <Link to="/politica-de-confidentialitate">Privacy</Link>
        </div>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ data }) => {
  const services = [
    { title: 'Colantări Auto', slug: 'colantari-auto', desc: 'Marketing mobil la cel mai înalt nivel.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1-1 0 00-1-1H4a1-1 0 00-1 1v10M17.803 16.203L19 16h1a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0018 8h-2l-3 4s-3-1-3 4" /></svg> },
    { title: 'Print Mare Format', slug: 'print-mare-format', desc: 'Bannere și mesh-uri de dimensiuni colosale.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: 'Textile Custom', slug: 'textile-personalizate', desc: 'Echipamente de lucru cu branding durabil.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg> }
  ];

  return (
    <div className="animate-in fade-in">
      {/* HERO ULTRA-MODERN */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-4xl">
            <div className="mb-10 animate-in slide-in-bottom" style={{ animationDelay: '0.1s' }}>
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px]">Premium Advertising Production</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-16 uppercase italic animate-in slide-in-bottom" style={{ animationDelay: '0.2s' }}>
              Daser<br />
              <span className="text-accent underline decoration-[12px] underline-offset-[20px]">Design</span><br />
              Studio
            </h1>
            <p className="text-2xl text-slate-500 font-bold max-w-2xl mb-16 leading-relaxed animate-in slide-in-bottom" style={{ animationDelay: '0.3s' }}>
              Atelier propriu de producție publicitară în Bucovina. De la colantări auto la personalizări textile, livrăm calitate fără compromis.
            </p>
            <div className="flex gap-4 animate-in slide-in-bottom" style={{ animationDelay: '0.4s' }}>
              <Link to="/contact" className="bg-accent text-white px-12 py-6 rounded-2xl font-black uppercase italic tracking-tighter text-xl shadow-2xl shadow-accent/40 hover:scale-105 transition-all">
                Cere Ofertă
              </Link>
            </div>
          </div>
        </div>

        {/* HERO IMAGE BACKGROUND (PARTIAL) */}
        <div className="absolute right-0 top-0 w-1/3 h-full hidden lg:block overflow-hidden">
          <img
            src="/assets/hero.png"
            alt=""
            className="w-full h-full object-cover grayscale brightness-110 opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          />
        </div>
      </section>

      {/* STRIP STATS */}
      <section className="bg-slate-900 py-10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="text-white font-black uppercase italic tracking-tighter text-4xl opacity-20 whitespace-nowrap">BUCOVINA ADVERTISING</span>
              <div className="w-3 h-3 bg-accent rounded-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES MODERN GRID */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-slate-50 p-12 rounded-[3.5rem] hover:bg-slate-900 hover:text-white transition-all group flex flex-col justify-between aspect-square">
                <div>
                  <div className="mb-10 text-accent group-hover:scale-125 transition-all origin-left">
                    <Icon size={48}>{s.icon}</Icon>
                  </div>
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-6 leading-none">{s.title}</h3>
                  <p className="font-bold opacity-50 text-xl">{s.desc}</p>
                </div>
                <Link to={`/servicii/${s.slug}`} className="font-black uppercase tracking-[0.2em] text-[10px] text-accent">Citește mai mult +</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 bg-accent text-white text-center overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-16">Pregătit pentru impact?</h2>
          <Link to="/contact" className="inline-block bg-white text-accent px-16 py-8 rounded-full font-black uppercase italic tracking-tighter text-2xl shadow-2xl hover:bg-slate-900 hover:text-white transition-all">
            Contactează-ne acum
          </Link>
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white italic font-black text-accent animate-pulse uppercase tracking-[0.4em] text-4xl">Daser</div>;

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/servicii" element={<div className="pt-60 pb-40 text-center font-black text-9xl uppercase italic tracking-tighter opacity-10">Servicii</div>} />
            <Route path="/despre" element={<div className="pt-60 pb-40 text-center font-black text-9xl uppercase italic tracking-tighter opacity-10">Despre</div>} />
            <Route path="/contact" element={<div className="pt-60 pb-40 text-center font-black text-9xl uppercase italic tracking-tighter opacity-10 text-accent">Contact</div>} />
          </Routes>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
