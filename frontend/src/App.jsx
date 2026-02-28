import { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch from the data directory relative to the index.html
    fetch('data/site_content.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.json();
      })
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading site content:", err);
        setError("Could not load site data. Please ensure /data/site_content.json exists.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-accent-light border-t-accent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium tracking-wide">Loading Daser Design Studio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-500">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-lg text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <h2 className="text-xl font-bold mb-2">Configuration Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/30">
                D
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Daser <span className="text-accent">Design</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-slate-600 hover:text-accent font-medium transition-colors">Acasă</a>
              <a href="#contact" className="text-slate-600 hover:text-accent font-medium transition-colors">Contact</a>
            </div>
            <div className="md:hidden">
              <button className="text-slate-600 hover:text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {content?.hero && (
        <section id="home" className="relative bg-slate-50 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {content.hero.badge && (
                <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 uppercase tracking-wider">
                  {content.hero.badge}
                </span>
              )}

              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                {content.hero.title ? content.hero.title.split(' Digital').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i !== arr.length - 1 && <span className="text-accent"> Digital</span>}
                  </span>
                )) : 'Transformăm Viziuni în Realitate Digitală'}
              </h1>

              <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed mb-10">
                {content.hero.subtitle || 'Creăm experiențe web, aplicații și strategii digitale care propulsează brandul tău în viitor.'}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl shadow-lg shadow-accent/30 text-white bg-accent hover:bg-accent-dark transition-all transform hover:-translate-y-1">
                  Începe un Proiect
                </a>
                <a href="#portfolio" className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-200 text-base font-bold rounded-xl text-slate-700 bg-transparent hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Vezi Portofoliul
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {content?.contact && (
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Hai să vorbim.</h2>
              <p className="mt-4 text-lg text-slate-600">Suntem pregătiți să dăm viață ideii tale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Informații Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Email</p>
                      <a href={`mailto:${content.contact.email}`} className="text-lg font-semibold text-slate-900 hover:text-accent transition-colors">{content.contact.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Telefon</p>
                      <a href={`tel:${content.contact.phone}`} className="text-lg font-semibold text-slate-900 hover:text-accent transition-colors">{content.contact.phone}</a>
                    </div>
                  </div>

                  {content.contact.address && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-accent">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Adresă</p>
                        <p className="text-lg font-semibold text-slate-900">{content.contact.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700">Nume Complet</label>
                    <input type="text" id="name" className="mt-1 flex-w-full block w-full rounded-xl border-slate-300 bg-white py-3 px-4 shadow-sm focus:border-accent focus:ring-accent sm:text-sm" placeholder="Ex: Popescu Ion" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email</label>
                    <input type="email" id="email" className="mt-1 flex-w-full block w-full rounded-xl border-slate-300 bg-white py-3 px-4 shadow-sm focus:border-accent focus:ring-accent sm:text-sm" placeholder="Ex: adresa@email.ro" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700">Mesaj</label>
                    <textarea id="message" rows="4" className="mt-1 block w-full rounded-xl border-slate-300 bg-white py-3 px-4 shadow-sm focus:border-accent focus:ring-accent sm:text-sm" placeholder="Cu ce te putem ajuta?"></textarea>
                  </div>
                  <button type="button" className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-accent hover:bg-accent-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                    Trimite Mesajul
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6">
            D
          </div>
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Daser Design Studio. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
