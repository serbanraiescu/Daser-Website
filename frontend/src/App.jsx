import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- ANIMATION WRAPPERS ---

const StripeReveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative overflow-hidden group">
      <AnimatePresence>
        {!isInView && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-accent z-20 origin-left"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MagneticButton = ({ children, className = "", to = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};

const Icon = ({ children, size = 24, className = "" }) => (
  <div style={{ width: `${size}px`, height: `${size}px` }} className={`flex items-center justify-center shrink-0 ${className}`}>
    {children}
  </div>
);

// --- COMPONENTS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 90 }}
            className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent/20"
          >
            D
          </motion.div>
          <span className="font-black text-xl tracking-tighter text-slate-900 uppercase italic">
            Daser<span className="text-accent underline decoration-4 underline-offset-4">Studio</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {['Acasă', 'Servicii', 'Despre', 'Contact'].map((name, i) => {
            const path = i === 0 ? '/' : `/${name.toLowerCase()}`;
            return (
              <Link
                key={path}
                to={path}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent ${location.pathname === path ? 'text-accent' : 'text-slate-400'}`}
              >
                {name}
              </Link>
            );
          })}
          <MagneticButton to="/contact" className="bg-slate-900 text-white px-8 py-3 rounded-full font-black uppercase tracking-tighter text-xs hover:bg-accent transition-all">
            Cere Ofertă
          </MagneticButton>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
          <Icon size={24}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} /></svg>
          </Icon>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6"
          >
            {['Acasă', 'Servicii', 'Despre', 'Contact'].map((name, i) => (
              <Link key={i} to={i === 0 ? '/' : `/${name.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 hover:text-accent">
                {name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ data }) => (
  <footer className="bg-white border-t border-slate-100 pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm">D</div>
            <span className="font-black text-lg tracking-tighter uppercase italic">Daser Studio</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-10 leading-[0.85] uppercase italic">
            Partenerul tău <br /> <span className="text-accent underline decoration-[8px] underline-offset-[12px]">Premium</span> în Bucovina.
          </h2>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Contact</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter">
            <li>{data?.company?.contact?.phone}</li>
            <li>{data?.company?.contact?.email}</li>
            <li className="text-accent">{data?.company?.contact?.schedule}</li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Legal</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter">
            <li><Link to="/termeni-si-conditii">Terms</Link></li>
            <li><Link to="/politica-de-confidentialitate">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <p>&copy; {new Date().getFullYear()} Daser Enterprise SRL</p>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ data }) => {
  const services = [
    { title: 'Colantări Auto', slug: 'colantari-auto', desc: 'Marketing mobil premium.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1-1 0 00-1-1H4a1-1 0 00-1 1v10M17.803 16.203L19 16h1a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0018 8h-2l-3 4s-3-1-3 4" /></svg> },
    { title: 'Print Mare Format', slug: 'print-mare-format', desc: 'Bannere de impact maxim.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: 'Textile Custom', slug: 'textile-personalizate', desc: 'Personalizări ultra-durabile.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg> }
  ];

  return (
    <div className="bg-white">
      {/* HERO WITH STRIPE REVEAL */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <StripeReveal>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Est. 2012 • Premium Production</span>
            <h1 className="text-8xl md:text-[12rem] font-black text-slate-900 leading-[0.8] tracking-tighter mb-16 uppercase italic">
              Daser<br />
              <span className="text-accent underline decoration-[15px] underline-offset-[25px]">Design</span><br />
              Studio
            </h1>
          </StripeReveal>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-20 items-end"
          >
            <p className="text-2xl text-slate-500 font-bold max-w-xl leading-relaxed">
              Transformăm viziunea ta în realitate prin producție publicitară de elită. Atelier propriu, tehnologie de ultimă oră și execuție impecabilă.
            </p>
            <MagneticButton to="/contact" className="bg-slate-900 text-white px-16 py-8 rounded-full font-black uppercase italic tracking-tighter text-3xl shadow-2xl hover:bg-accent transition-all">
              Start Proiect
            </MagneticButton>
          </motion.div>
        </div>

        {/* CINETIC BACKGROUND STRIPES */}
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 flex">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-slate-50 border-l border-white origin-top"
            />
          ))}
        </div>
      </section>

      {/* INFINITE RUNNING STRIPE */}
      <div className="bg-accent py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-20"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <span key={i} className="text-white font-black uppercase italic tracking-tighter text-5xl">DASER DESIGN STUDIO — PREMIUM QUALITY — MODERN TECH — ATELIER PROPRIU</span>
          ))}
        </motion.div>
      </div>

      {/* SERVICES WITH HOVER CRAZINESS */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <StripeReveal>
            <h2 className="text-7xl font-black uppercase italic tracking-tighter mb-32">Servicii <span className="text-accent">Elite</span></h2>
          </StripeReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="group relative bg-slate-50 p-16 rounded-[4rem] overflow-hidden aspect-square flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"></div>

                <div className="relative z-10">
                  <div className="mb-10 text-accent group-hover:text-white transition-colors">
                    <Icon size={64}>{s.icon}</Icon>
                  </div>
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="font-bold text-xl opacity-50 group-hover:text-white group-hover:opacity-80 transition-all">{s.desc}</p>
                </div>

                <Link to={`/servicii/${s.slug}`} className="relative z-10 font-black uppercase tracking-[0.3em] text-xs text-accent group-hover:text-white">
                  Detalii +
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODERN PROCESS (WHY US) */}
      <section className="py-40 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div>
              <StripeReveal>
                <h2 className="text-9xl font-black uppercase italic tracking-tighter leading-none mb-20">De ce <br /> <span className="text-accent">Daser?</span></h2>
              </StripeReveal>
              <div className="space-y-20">
                {[
                  { t: 'Tehnologie TOP', d: 'Utilizăm cele mai noi echipamente de print și colantare.' },
                  { t: 'Atelier Propriu', d: 'Controlăm 100% procesul de producție și calitatea.' },
                  { t: 'Execuție Rapidă', d: 'Respectăm termenele limită fără a sacrifica detaliile.' }
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    key={i}
                    className="flex gap-10"
                  >
                    <span className="text-accent font-black text-5xl">0{i + 1}</span>
                    <div>
                      <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{item.t}</h4>
                      <p className="text-slate-400 font-bold text-lg">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CRAZY STRIPE DECORATION */}
            <div className="relative hidden md:flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="w-full aspect-square border-[40px] border-accent/20 rounded-full flex items-center justify-center"
              >
                <Icon size={120} className="text-accent animate-pulse">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
                </Icon>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA WITH GIGA TEXT */}
      <section className="py-60 bg-white text-center overflow-hidden">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] font-black uppercase italic tracking-tighter text-slate-900 leading-none mb-20"
        >
          Hai să <br /> <span className="text-accent">Lucrăm</span>
        </motion.h2>
        <MagneticButton to="/contact" className="inline-block bg-accent text-white px-24 py-10 rounded-full font-black uppercase italic tracking-tighter text-4xl shadow-[0_30px_60px_-15px_rgba(255,0,128,0.5)] hover:scale-110 transition-all">
          Cere Ofertă
        </MagneticButton>
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
      <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white selection:bg-accent transition-colors duration-500">
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/servicii" element={<div className="pt-60 pb-40 text-center font-black text-[15vw] uppercase italic tracking-tighter opacity-10">Servicii</div>} />
              <Route path="/despre" element={<div className="pt-60 pb-40 text-center font-black text-[15vw] uppercase italic tracking-tighter opacity-10">Despre</div>} />
              <Route path="/contact" element={<div className="pt-60 pb-40 text-center font-black text-[15vw] uppercase italic tracking-tighter opacity-10 text-accent">Contact</div>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
