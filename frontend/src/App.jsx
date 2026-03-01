import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- SEO & META UTILITIES ---

const MetaTags = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Daser Design` : 'Daser Design Studio | Producție Publicitară Premium';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description || 'Atelier de producție publicitară premium. Colantări auto, print mare format, textile și branding.');
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
    <nav className="fixed w-full bg-white/90 backdrop-blur-xl z-[60] border-b border-slate-100 h-20 flex items-center">
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

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900 z-[70]">
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
            className="fixed top-0 left-0 w-full h-screen bg-white p-8 flex flex-col gap-6 shadow-2xl z-[65] pt-32"
          >
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-5xl font-black uppercase italic tracking-tighter text-slate-900 hover:text-accent">
                {link.name}
              </Link>
            ))}
            <div className="mt-auto pb-10">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 italic">Social</p>
              <div className="flex gap-6 font-black uppercase italic text-xl tracking-tighter">
                <a href="#" className="hover:text-accent">Instagram</a>
                <a href="#" className="hover:text-accent">Facebook</a>
              </div>
            </div>
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
      <div className="pt-10 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 flex flex-col md:flex-row justify-between gap-6">
        <p>&copy; {new Date().getFullYear()} {data?.company?.legalName || 'Daser Enterprise SRL'}. Toate drepturile rezervate.</p>
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
  const content = data?.pages?.home;
  const services = data?.pages?.services?.list?.slice(0, 3) || [];

  return (
    <div className="bg-white">
      <MetaTags
        title="Acasă"
        description={content?.hero?.subtitle}
      />
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <StripeReveal>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Est. {data?.company?.established} • Premium Production</span>
            <h1 className="text-7xl md:text-[10rem] font-black text-slate-900 leading-[0.9] tracking-tighter mb-16 uppercase italic">
              {content?.hero?.title}
            </h1>
          </StripeReveal>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-20 items-end"
          >
            <div className="max-w-xl">
              <p className="text-2xl text-slate-500 font-bold leading-relaxed mb-8">
                {content?.hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                {content?.hero?.bullets?.map((b, i) => (
                  <span key={i} className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 italic">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full"></span> {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <MagneticButton to="/contact" className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase italic tracking-tighter text-2xl shadow-2xl hover:bg-accent transition-all">
                {content?.hero?.ctas?.primary}
              </MagneticButton>
              <MagneticButton to="/portofoliu" className="bg-white border-2 border-slate-900 text-slate-900 px-12 py-6 rounded-full font-black uppercase italic tracking-tighter text-2xl hover:bg-slate-50 transition-all">
                {content?.hero?.ctas?.secondary}
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

      {/* INFINITE RUNNING STRIPE */}
      <div className="bg-accent py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-20"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <span key={i} className="text-white font-black uppercase italic tracking-tighter text-5xl">
              PRODUCȚIE PUBLICITARĂ — {data?.company?.name.toUpperCase()} — {data?.company?.location.toUpperCase()} — PREMIUM QUALITY — MODERN TECH — ATELIER PROPRIU
            </span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {content?.stats?.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-8xl font-black text-slate-200 mb-2 italic tracking-tighter">{s.value}</span>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-accent italic">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
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
                  <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="font-bold text-xl opacity-50 group-hover:text-white group-hover:opacity-80 transition-all">{s.shortDesc}</p>
                </div>

                <Link to={`/servicii/${s.id}`} className="relative z-10 font-black uppercase tracking-[0.3em] text-xs text-accent group-hover:text-white">
                  Detalii +
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <MagneticButton to="/servicii" className="inline-block border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-black uppercase italic tracking-tighter text-xl">
              Vezi toate serviciile
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
            <div>
              <StripeReveal>
                <h2 className="text-9xl font-black uppercase italic tracking-tighter leading-none mb-20">Proces <br /> <span className="text-accent">Simpu</span></h2>
              </StripeReveal>
              <div className="space-y-16">
                {data?.pages?.process?.steps?.slice(0, 3).map((step, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    key={i}
                    className="flex gap-10 border-l-2 border-accent/20 pl-10"
                  >
                    <span className="text-accent font-black text-5xl italic">{step.n}</span>
                    <div>
                      <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{step.title}</h4>
                      <p className="text-slate-400 font-bold text-lg">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/contact" className="inline-block mt-20 bg-accent text-white px-10 py-4 rounded-full font-black uppercase italic tracking-tighter text-xl shadow-xl shadow-accent/20 animate-pulse">
                Începe un proiect
              </Link>
            </div>

            <div className="relative hidden md:flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                className="w-full aspect-square border-[10px] border-accent/10 border-dashed rounded-full flex items-center justify-center relative"
              >
                <span className="absolute top-0 text-xs font-black uppercase italic text-accent/40 tracking-[1em]">Design</span>
                <span className="absolute bottom-0 text-xs font-black uppercase italic text-accent/40 tracking-[1em]">Producție</span>
                <div className="bg-slate-800 w-3/4 h-3/4 rounded-full flex items-center justify-center animate-pulse shadow-inner">
                  <img src="/assets/logo_dark.png" alt="Daser" className="w-1/2 opacity-20 invert" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ data }) => {
  const content = data?.pages?.services;

  return (
    <div className="py-40 px-6 max-w-7xl mx-auto min-h-screen">
      <MetaTags title="Servicii" description={content?.intro} />
      <StripeReveal>
        <h1 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-20 leading-none">Servicii</h1>
      </StripeReveal>
      <p className="text-3xl font-bold text-slate-500 max-w-4xl leading-relaxed mb-32 italic">
        {content?.intro}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {content?.list?.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-b-4 border-slate-100 pb-16 group"
          >
            <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-8 group-hover:text-accent transition-colors tracking-tighter">{s.title}</h3>
            <p className="text-xl text-slate-500 font-bold leading-relaxed mb-10">{s.fullDesc}</p>
            <ul className="mb-12 space-y-4">
              {s.details?.map((detail, idx) => (
                <li key={idx} className="font-black uppercase italic text-xs tracking-widest text-slate-400 flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent"></span> {detail}
                </li>
              ))}
            </ul>
            <MagneticButton to="/contact" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase italic tracking-tighter text-sm hover:bg-accent transition-all">
              Programează o discuție
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = ({ data }) => {
  const content = data?.pages?.about;

  return (
    <div className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-20">
      <MetaTags title="Despre Noi" description={content?.content} />
      <StripeReveal>
        <h1 className="text-7xl md:text-[11vw] font-black uppercase italic tracking-tighter leading-none">Studio</h1>
      </StripeReveal>
      <p className="text-3xl md:text-4xl font-bold text-slate-500 max-w-5xl leading-tight italic">
        {content?.content}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mt-20">
        <div className="bg-slate-50 p-16 rounded-[4rem] flex flex-col items-center">
          <h4 className="text-8xl font-black mb-4 italic text-accent">{data?.company?.established}</h4>
          <p className="font-black opacity-30 uppercase tracking-widest text-xs">Anul Înființării</p>
        </div>
        <div className="bg-slate-50 p-16 rounded-[4rem] flex flex-col items-center">
          <h4 className="text-8xl font-black mb-4 italic text-accent">1500+</h4>
          <p className="font-black opacity-30 uppercase tracking-widest text-xs">Proiecte Finalizate</p>
        </div>
        <div className="bg-slate-50 p-16 rounded-[4rem] flex flex-col items-center border-4 border-accent shadow-2xl shadow-accent/20">
          <h4 className="text-8xl font-black mb-4 italic text-slate-900">100%</h4>
          <p className="font-black opacity-30 uppercase tracking-widest text-xs">Atelier Propriu</p>
        </div>
      </div>
    </div>
  );
};

const FAQPage = ({ data }) => {
  const [open, setOpen] = useState(null);
  const faqs = data?.pages?.faq?.general || [];

  return (
    <div className="py-40 px-6 max-w-5xl mx-auto min-h-screen">
      <MetaTags title="FAQ" description="Întrebări frecvente despre resurse, print și procese de producție." />
      <StripeReveal>
        <h1 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-20 text-center">FAQ</h1>
      </StripeReveal>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-slate-50 rounded-3xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-8 text-left flex justify-between items-center group"
            >
              <span className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-accent transition-colors">{f.q}</span>
              <span className={`text-4xl font-black transition-transform ${open === i ? 'rotate-45 text-accent' : ''}`}>+</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-8 pt-0 text-xl font-bold text-slate-500 italic max-w-3xl leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage = ({ data }) => (
  <div className="py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 min-h-screen">
    <MetaTags title="Contact" description="Contactează echipa Daser Studio pentru oferte personalizate de producție publicitară în Bucovina." />
    <div>
      <StripeReveal>
        <h1 className="text-8xl md:text-[12rem] font-black uppercase italic tracking-tighter mb-10 leading-none">Salut!</h1>
      </StripeReveal>
      <p className="text-3xl font-bold text-slate-500 mb-20 leading-relaxed italic">Ești gata să dai viață proiectului tău? <br /> Scrie-ne sau sună-ne direct.</p>
      <div className="space-y-12">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-300 mb-2 italic">Telefon / WhatsApp</p>
          <p className="text-4xl font-black italic hover:text-accent transition-colors">{data?.company?.contact?.phone}</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-300 mb-2 italic">Email</p>
          <p className="text-4xl font-black italic hover:text-accent transition-colors">{data?.company?.contact?.email}</p>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-300 mb-2 italic">Locație</p>
          <p className="text-xl font-black italic text-slate-400 capitalize">{data?.company?.contact?.address}</p>
        </div>
      </div>
    </div>
    <div className="bg-slate-50 p-12 md:p-20 rounded-[4rem] shadow-inner relative group">
      <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-opacity">
        <Icon size={120} className="text-accent animate-spin-slow">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" /></svg>
        </Icon>
      </div>
      <form className="space-y-8 relative z-10" onSubmit={e => e.preventDefault()}>
        <div><input type="text" placeholder="NUME COMPLET" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase italic focus:border-accent outline-none transition-all text-xl" /></div>
        <div><input type="email" placeholder="ADRESA EMAIL" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase italic focus:border-accent outline-none transition-all text-xl" /></div>
        <div><textarea placeholder="DETALII PROIECT..." rows="4" className="w-full bg-transparent border-b-4 border-slate-200 py-4 font-black uppercase italic focus:border-accent outline-none transition-all resize-none text-xl"></textarea></div>
        <MagneticButton className="w-full bg-accent text-white py-10 rounded-3xl font-black uppercase italic text-3xl shadow-2xl shadow-accent/40 hover:scale-[1.02] active:scale-95 transition-all">
          Trimite Mesaj
        </MagneticButton>
      </form>
    </div>
  </div>
);

const LegalPage = ({ title, sections }) => (
  <div className="py-40 px-6 max-w-4xl mx-auto min-h-screen">
    <StripeReveal>
      <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-20 leading-none">{title}</h1>
    </StripeReveal>
    <div className="space-y-16">
      {sections?.map((s, i) => (
        <div key={i}>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-accent">{s.t}</h3>
          <p className="text-xl font-bold text-slate-500 leading-relaxed italic">{s.c}</p>
        </div>
      ))}
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
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/servicii" element={<ServicesPage data={data} />} />
              <Route path="/despre" element={<AboutPage data={data} />} />
              <Route path="/faq" element={<FAQPage data={data} />} />
              <Route path="/contact" element={<ContactPage data={data} />} />
              <Route path="/portofoliu" element={<div className="py-60 italic font-black text-9xl text-center opacity-5 select-none">PORTFOLIO</div>} />
              <Route path="/termeni-si-conditii" element={<LegalPage title="Termeni și Condiții" sections={data?.legal?.terms?.sections} />} />
              <Route path="/politica-de-confidentialitate" element={<div className="py-40 px-6 max-w-4xl mx-auto italic font-bold text-slate-400">GDPR Content coming from CRM...</div>} />
              <Route path="/politica-cookies" element={<div className="py-40 px-6 max-w-4xl mx-auto italic font-bold text-slate-400">Cookie Policy coming from CRM...</div>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
