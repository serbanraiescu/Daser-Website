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
            <svg width="24" height="24" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <a href={data?.company?.social?.facebook} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white"><svg width="20" height="20" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
          <a href={data?.company?.social?.instagram} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all text-white"><svg width="20" height="20" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
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
  const services = data?.pages?.services?.items || [];
  if (!home) return null;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative bg-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-2 px-6 rounded-full bg-accent/10 text-accent font-black text-xs mb-8 uppercase tracking-[0.3em] leading-none">Bucovina • Professional Production</span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-10 uppercase italic">
              {home.hero?.title?.split('Studio').map((p, i) => (
                <span key={i} className="block">{p}{i === 0 && <span className="text-accent underline decoration-[12px] underline-offset-[16px]">Studio</span>}</span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-12 font-medium">
              {home.hero?.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="inline-flex justify-center items-center px-12 py-6 text-lg font-black rounded-full shadow-2xl shadow-accent/40 text-white bg-accent hover:bg-slate-900 transition-all transform hover:-translate-y-1 uppercase italic tracking-tighter">
                {home.hero?.cta}
              </Link>
              <Link to="/servicii" className="inline-flex justify-center items-center px-12 py-6 text-lg font-black rounded-full border-2 border-slate-200 text-slate-900 hover:bg-slate-50 transition-all uppercase italic tracking-tighter">
                Vezi Serviciile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-slate-900">Servicii <span className="text-accent">Daser</span></h2>
              <p className="text-slate-500 font-medium max-w-xl">De la mici personalizări la proiecte industriale de amploare.</p>
            </div>
            <Link to="/servicii" className="hidden md:block text-accent font-black uppercase text-sm border-b-2 border-accent pb-1 hover:text-slate-900 hover:border-slate-900 transition-all">Toate serviciile</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {services.map((item, i) => (
              <Link key={i} to={`/servicii/${item.slug}`} className="group relative bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-accent/5 transition-all overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl font-black italic">0{i + 1}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-slate-500 mb-8 line-clamp-2">{item.description}</p>
                <ul className="space-y-2">
                  {item.benefits?.slice(0, 3).map((b, bi) => (
                    <li key={bi} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <svg width="16" height="16" className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ data }) => {
  const services = data?.pages?.services?.items || [];
  return (
    <div className="pt-32 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">Expertiză în <span className="text-accent">Producție</span></h1>
          <p className="text-xl text-slate-500 font-medium">Soluții complete de branding, de la design la montajul final.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black mb-4 uppercase italic tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{item.description}</p>
              </div>
              <div className="space-y-4">
                <ul className="space-y-2 mb-8">
                  {item.benefits?.map((b, bi) => (
                    <li key={bi} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="block text-center py-3 bg-slate-50 hover:bg-accent hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">Solicită Detalii</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ data }) => {
  const about = data?.pages?.about;
  const stats = data?.pages?.home?.stats || [];
  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">{about?.hero?.title}</h1>
            <p className="text-xl text-slate-900 font-bold mb-8 italic">{about?.hero?.subtitle}</p>
            <div className="prose prose-slate prose-lg text-slate-500 font-medium">
              <p>{about?.content}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className={`p-8 rounded-[2rem] ${i === 2 ? 'col-span-2' : ''} ${i % 2 === 0 ? 'bg-accent text-white' : 'bg-slate-900 text-white'}`}>
                <div className="text-4xl font-black italic tracking-tighter mb-2">{s.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 text-center">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12">Procesul Nostru</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultare', text: 'Analizăm nevoile și mediul de aplicare.' },
              { step: '02', title: 'Design', text: 'Creăm machetele conform standardelor.' },
              { step: '03', title: 'Producție', text: 'Folosim tehnologie de ultimă oră.' },
              { step: '04', title: 'Montaj', text: 'Execuție impecabilă la locația clientului.' }
            ].map((s, i) => (
              <div key={i} className="space-y-4">
                <div className="text-accent text-2xl font-black italic">/ {s.step}</div>
                <h3 className="font-black uppercase italic tracking-tight text-lg">{s.title}</h3>
                <p className="text-slate-500 text-sm font-medium">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQPage = ({ data }) => {
  const [open, setOpen] = useState(0);
  const faqs = data?.pages?.faq?.items || [];
  return (
    <div className="pt-40 pb-20 animate-in slide-in-from-top-4 duration-700">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-16 text-center">Răspunsuri la <span className="text-accent">Întrebări</span></h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center p-6 text-left hover:bg-slate-50 transition-colors">
                <span className="font-black uppercase italic tracking-tight text-slate-900">{f.question}</span>
                <span className={`transform transition-transform ${open === i ? 'rotate-45' : ''} text-accent text-2xl`}>+</span>
              </button>
              {open === i && <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed border-t border-slate-50">{f.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ data }) => {
  const contact = data?.company?.contact;
  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-8 leading-none">Hai să <span className="text-accent">Vorbim</span></h1>
            <p className="text-xl text-slate-500 font-medium mb-12">Suntem pregătiți să transformăm viziunea ta într-un produs finit de excepție.</p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Telefon</h4>
                <a href={`tel:${contact?.phone}`} className="text-2xl font-black italic tracking-tight hover:text-accent transition-colors">{contact?.phone}</a>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email</h4>
                <a href={`mailto:${contact?.email}`} className="text-2xl font-black italic tracking-tight hover:text-accent transition-colors">{contact?.email}</a>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Program de Lucru</h4>
                <span className="text-lg font-bold text-slate-700">{contact?.schedule}</span>
              </div>
              <div className="pt-8">
                <a href={`https://wa.me/${contact?.whatsapp}`} target="_blank" className="inline-flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 rounded-full font-black uppercase italic tracking-tight hover:scale-105 transition-transform shadow-xl shadow-green-500/20">
                  <svg width="24" height="24" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.53.909 3.039 1.389 4.603 1.391 5.483.003 9.948-4.463 9.95-9.947.001-2.657-1.032-5.155-2.908-7.032-1.875-1.875-4.375-2.907-7.031-2.908-5.483-.002-9.947 4.463-9.95 9.947-.001 2.069.541 4.056 1.57 5.79l-1.026 3.735 3.824-.997-1.032 6.088zm8.56-4.299c-.458-.229-2.708-1.336-3.129-1.489-.42-.153-.726-.23-.1.03.229.305.764 1.145.936 1.336.172.191.344.229.802.115 2.503-.961 4.299-2.13 5.385-4.002s1.411-4.025.764-5.245c-.21-.305-.726-.458-1.528-.841-.803-.382-3.793-1.834-4.364-2.102-.572-.267-1.144-.401-1.639-.305-.495.096-1.565.419-2.28 1.13-.715.711-2.327 2.216-2.327 5.405 0 3.189 2.327 6.273 2.632 6.7.305.42 4.542 6.946 10.983 9.695.534.228 1.066.457 1.603.626.541.17 1.034.146 1.424.088.435-.065 1.336-.546 1.527-1.074.191-.527.191-.979.134-1.074-.056-.096-.21-.153-.668-.382z" /></svg>
                  Contact WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div>
            <form className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Nume</label>
                  <input type="text" className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-accent transition-all" placeholder="Popescu Ion" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Telefon</label>
                  <input type="text" className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-accent transition-all" placeholder="0740..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Serviciu Interesat</label>
                <select className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-accent transition-all">
                  <option>Colantări Auto</option>
                  <option>Print Mare Format</option>
                  <option>Textile Personalizate</option>
                  <option>ALTCEVA</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Mesaj</label>
                <textarea className="w-full bg-slate-800 border-none rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-accent transition-all" rows="4" placeholder="Detalii proiect..."></textarea>
              </div>
              <button className="w-full py-6 bg-accent text-white font-black uppercase italic tracking-tighter text-xl rounded-full hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-accent/20">Trimite Cererea</button>
            </form>
          </div>
        </div>
      </div>
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

    useEffect(() => {
      if (!data) return;

      let path = location.pathname;
      let pageKey = path === '/' ? 'home' : path.split('/')[1];

      // Handle services slug if needed
      if (pageKey === 'servicii' && path.split('/')[2]) {
        // You could find the specific service for title
      }

      let seoArr = data.pages?.[pageKey]?.seo;

      if (seoArr) {
        document.title = seoArr.title;
        const updateMeta = (name, value, property = false) => {
          let el = property ? document.querySelector(`meta[property="${name}"]`) : document.querySelector(`meta[name="${name}"]`);
          if (el) el.setAttribute('content', value);
        };
        updateMeta('description', seoArr.description);
        updateMeta('og:title', seoArr.og_title, true);
        updateMeta('og:description', seoArr.og_description, true);

        const scriptId = 'json-ld-schema';
        let existingScript = document.getElementById(scriptId);
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(seoArr.schema_jsonld);
        document.head.appendChild(script);
      }
    }, [location, data]);

    return null;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white italic font-black text-accent animate-pulse uppercase tracking-[0.2em] text-4xl">Daser Design Studio</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-500 font-bold">Error: {error}</div>;

  return (
    <Router>
      <SEOManager />
      <div className="flex flex-col min-h-screen font-sans selection:bg-accent selection:text-white">
        <Header />

        <main className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/servicii" element={<ServicesPage data={data} />} />
            <Route path="/portofoliu" element={<div className="pt-40 pb-20 text-center font-black uppercase text-4xl">Portofoliu - Curând</div>} />
            <Route path="/despre" element={<AboutPage data={data} />} />
            <Route path="/faq" element={<FAQPage data={data} />} />
            <Route path="/contact" element={<ContactPage data={data} />} />
            <Route path="/termeni-si-conditii" element={<div className="pt-40 pb-20 max-w-4xl mx-auto px-4"><h1 className="text-4xl font-black mb-8 uppercase italic">{data?.pages?.legal?.terms?.title}</h1><div className="prose">{data?.pages?.legal?.terms?.content}</div></div>} />
            <Route path="/politica-de-confidentialitate" element={<div className="pt-40 pb-20 max-w-4xl mx-auto px-4"><h1 className="text-4xl font-black mb-8 uppercase italic">{data?.pages?.legal?.privacy?.title}</h1><div className="prose">{data?.pages?.legal?.privacy?.content}</div></div>} />
          </Routes>
        </main>

        <Footer data={data} />
      </div>
    </Router>
  );
}

export default App;
