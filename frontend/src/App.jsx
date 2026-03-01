import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- SEO & META UTILITIES ---

const MetaTags = ({ title, description, path }) => {
  useEffect(() => {
    document.title = title ? `${title} | Daser Design` : 'Daser Design Studio | Producție Publicitară Premium';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || 'Atelier de producție publicitară în Bucovina. Colantări auto, print mare format, textile și branding.');
  }, [title, description]);
  return null;
};

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

const MagneticButton = ({ children, className = "", to = "", href = "" }) => {
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

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
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

  const navLinks = [
    { name: 'Acasă', path: '/' },
    { name: 'Servicii', path: '/servicii' },
    { name: 'Portofoliu', path: '/portofoliu' },
    { name: 'Despre', path: '/despre' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img src="/assets/logo_dark.png" alt="Daser Design Studio" className="h-12 w-auto" />
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
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6 shadow-2xl z-[100]"
          >
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter text-slate-900 hover:text-accent">
                {link.name}
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
          <div className="mb-10">
            <img src="/assets/logo_dark.png" alt="Daser Design Studio" className="h-10 w-auto" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-10 leading-[0.85] uppercase italic">
            Partenerul tău <br /> <span className="text-accent underline decoration-[8px] underline-offset-[12px]">Premium</span> pentru Branding.
          </h2>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Pagini</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter">
            <li><Link to="/servicii">Servicii</Link></li>
            <li><Link to="/despre">Despre Noi</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">Întrebări Frecvente</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-8 italic">Legal</h5>
          <ul className="space-y-4 font-bold text-slate-900 uppercase text-xs tracking-tighter text-slate-400">
            <li><Link to="/termeni-si-conditii">Termeni și Condiții</Link></li>
            <li><Link to="/politica-de-confidentialitate">Politica de Confidențialitate</Link></li>
            <li><Link to="/politica-cookies">Politica Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="pt-10 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 flex flex-col md:row justify-between gap-6">
        <p>&copy; {new Date().getFullYear()} Daser Enterprise SRL. Toate drepturile rezervate.</p>
        <div className="flex gap-10">
          <a href="https://anpc.ro" target="_blank" rel="noopener" className="hover:text-slate-900">ANPC</a>
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" className="hover:text-slate-900">SOL</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ data }) => {
  const services = [
    { title: 'Colantări Auto', slug: 'colantari-auto', desc: 'Marketing mobil premium cu folii dedicate.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path d="M13 16V6a1-1 0 00-1-1H4a1-1 0 00-1 1v10M17.803 16.203L19 16h1a1 1 0 001-1v-4a1 1 0 00-.293-.707l-2-2A1 1 0 0018 8h-2l-3 4s-3-1-3 4" /></svg> },
    { title: 'Print Mare Format', slug: 'print-mare-format', desc: 'Bannere, mesh-uri și autocolante de impact.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: 'Textile Custom', slug: 'textile-personalizate', desc: 'Personalizări durabile prin broderie sau DTF.', icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg> }
  ];

  return (
    <div className="bg-white">
      <MetaTags
        title="Acasă"
        description="Atelier de producție publicitară premium. Colantări auto, print mare format, textile și branding realizate cu tehnologie de ultimă oră."
      />
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <StripeReveal>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Est. 2016 • Premium Production</span>
            <h1 className="text-8xl md:text-[12rem] font-black text-slate-900 leading-[0.8] tracking-tighter mb-16 uppercase italic">
              Daser<br />
              <span className="text-accent underline decoration-[15px] underline-offset-[25px]">Design</span><br />
              Studio
            </h1>
          </StripeReveal>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-20 items-end"
          >
            <p className="text-2xl text-slate-500 font-bold max-w-xl leading-relaxed">
              Transformăm viziunea ta în realitate prin producție publicitară de elită. Atelier propriu, tehnologie de ultimă oră și execuție impecabilă.
            </p>
            <div className="flex gap-4">
              <MagneticButton to="/contact" className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase italic tracking-tighter text-2xl shadow-2xl hover:bg-accent transition-all">
                Cere Ofertă
              </MagneticButton>
              <MagneticButton to="/servicii" className="bg-white border-2 border-slate-900 text-slate-900 px-12 py-6 rounded-full font-black uppercase italic tracking-tighter text-2xl hover:bg-slate-50 transition-all">
                Portofoliu
              </MagneticButton>
            </div>
          </motion.div>
        </div>

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

      {/* STRIPE */}
      <div className="bg-accent py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-20"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <span key={i} className="text-white font-black uppercase italic tracking-tighter text-5xl">PRODUCȚIE PUBLICITARĂ — PREMIUM QUALITY — MODERN TECH — ATELIER PROPRIU — COLANTĂRI AUTO — DESIGN & BRANDING</span>
          ))}
        </motion.div>
      </div>

      {/* SERVICES */}
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

      {/* REASONS */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div>
              <StripeReveal>
                <h2 className="text-9xl font-black uppercase italic tracking-tighter leading-none mb-20">De ce <br /> <span className="text-accent">Noi?</span></h2>
              </StripeReveal>
              <div className="space-y-20">
                {[
                  { t: 'Tehnologie TOP', d: 'Utilizăm cele mai noi echipamente de print și colantare pentru rezultate de neegalat.' },
                  { t: 'Atelier Propriu', d: 'Controlăm 100% procesul de producție și calitatea fiecărui proiect livrat.' },
                  { t: 'Execuție Rapidă', d: 'Timpul tău este prețios. Livrăm rapid fără a sacrifica niciun detaliu de calitate.' }
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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

            <div className="relative hidden md:flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="w-full aspect-square border-[20px] border-accent/10 rounded-full flex items-center justify-center relative"
              >
                <Icon size={200} className="text-accent/20">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
                </Icon>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = () => (
  <div className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
    <MetaTags title="Servicii" description="Descoperă gama completă de servicii Daser: colantări auto, print digital, personalizări textile și semnalistică publicitară." />
    <StripeReveal>
      <h1 className="text-8xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-20">Servicii</h1>
    </StripeReveal>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      {[
        { t: 'Colantări Auto', d: 'Aplicare folii premium (3M, Oracal, Avery) pentru schimbarea culorii sau branding comercial.' },
        { t: 'Print Mare Format', d: 'Bannere, autocolante, mesh-uri și backlit pentru campanii publicitare de impact.' },
        { t: 'Textile Personalizate', d: 'Tricouri, hanorace și echipamente de lucru personalizate prin broderie sau DTF.' },
        { t: 'Semnalistică & Reclame', d: 'Litere volumetrice, panouri publicitare și casete luminoase de înaltă calitate.' }
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="border-b-4 border-slate-100 pb-10"
        >
          <h3 className="text-4xl font-black uppercase italic mb-6">{s.t}</h3>
          <p className="text-xl text-slate-500 font-bold leading-relaxed">{s.d}</p>
          <Link to="/contact" className="inline-block mt-8 text-accent font-black uppercase tracking-widest text-xs border-b-2 border-accent">Solicită Detalii</Link>
        </motion.div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-20">
    <MetaTags title="Despre Noi" description="Suntem un atelier de producție publicitară înființat în 2016, dedicat calității și inovației în Bucovina." />
    <StripeReveal>
      <h1 className="text-8xl md:text-[10rem] font-black uppercase italic tracking-tighter">Atelierul Noastru</h1>
    </StripeReveal>
    <p className="text-3xl font-bold text-slate-500 max-w-4xl leading-relaxed">
      Daser Studio s-a născut din pasiunea pentru detalii și dorința de a oferi partenerilor noștri soluții de branding care să iasă în evidență.
      Echipat cu tehnologie de ultimă oră, atelierul nostru gestionează intern întregul flux de producție.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
      <div className="bg-slate-50 p-10 rounded-3xl"><h4 className="text-4xl font-black mb-4">2016</h4><p className="font-bold opacity-50 uppercase tracking-widest text-xs">Anul Înființării</p></div>
      <div className="bg-slate-50 p-10 rounded-3xl"><h4 className="text-4xl font-black mb-4">1500+</h4><p className="font-bold opacity-50 uppercase tracking-widest text-xs">Proiecte Livrate</p></div>
      <div className="bg-slate-50 p-10 rounded-3xl"><h4 className="text-4xl font-black mb-4">100%</h4><p className="font-bold opacity-50 uppercase tracking-widest text-xs">Producție Proprie</p></div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 min-h-screen">
    <MetaTags title="Contact" description="Contactează echipa Daser Studio pentru oferte personalizate de producție publicitară." />
    <div>
      <StripeReveal>
        <h1 className="text-8xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-10">Salut!</h1>
      </StripeReveal>
      <p className="text-2xl font-bold text-slate-500 mb-20 leading-relaxed italic">Ești gata să dai viață proiectului tău? <br /> Scrie-ne sau sună-ne direct.</p>
      <div className="space-y-10">
        <div><p className="text-xs font-black uppercase tracking-widest text-slate-300 mb-2 italic">Telefon</p><p className="text-3xl font-black italic">0754 520 740</p></div>
        <div><p className="text-xs font-black uppercase tracking-widest text-slate-300 mb-2 italic">Email</p><p className="text-3xl font-black italic">office@daser.ro</p></div>
      </div>
    </div>
    <div className="bg-slate-50 p-12 rounded-[4rem]">
      <form className="space-y-8" onSubmit={e => e.preventDefault()}>
        <div><input type="text" placeholder="NUME COMPLET" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase focus:border-accent outline-none transition-all" /></div>
        <div><input type="email" placeholder="ADRESA EMAIL" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase focus:border-accent outline-none transition-all" /></div>
        <div><textarea placeholder="DETALII PROIECT..." rows="4" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase focus:border-accent outline-none transition-all resize-none"></textarea></div>
        <MagneticButton className="w-full bg-accent text-white py-8 rounded-3xl font-black uppercase italic text-2xl shadow-xl shadow-accent/20">Trimite Mesaj</MagneticButton>
      </form>
    </div>
  </div>
);

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
      <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white transition-colors duration-500">
        <Header />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/servicii" element={<ServicesPage />} />
              <Route path="/despre" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/portofoliu" element={<div className="py-60 italic font-black text-9xl text-center opacity-5">LUCRĂRI</div>} />
              <Route path="/faq" element={<div className="py-60 italic font-black text-9xl text-center opacity-5">FAQ</div>} />
              <Route path="/termeni-si-conditii" element={<div className="py-40 px-6 max-w-4xl mx-auto font-bold opacity-30">Legal Content...</div>} />
              <Route path="/politica-de-confidentialitate" element={<div className="py-40 px-6 max-w-4xl mx-auto font-bold opacity-30">GDPR Content...</div>} />
              <Route path="/politica-cookies" element={<div className="py-40 px-6 max-w-4xl mx-auto font-bold opacity-30">Cookie Policy Content...</div>} />
              {/* Fallback for SPA routing handled by .htaccess on server */}
            </Routes>
          </AnimatePresence>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
