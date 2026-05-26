import { useState, useEffect } from 'react';

export default function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background + overlay ───────────────────────────────── */}
      <div className="absolute inset-0">
        <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover" />

        {/* Deep burgundy night base */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,4,8,0.94) 0%, rgba(22,6,14,0.90) 35%, rgba(16,4,10,0.88) 65%, rgba(8,2,6,0.95) 100%)'
        }} />

        {/* Wine & mauve bloom glows */}
        <div className="absolute inset-0" style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 10% 60%, rgba(139,46,74,0.28) 0%, transparent 62%)',
            'radial-gradient(ellipse 50% 60% at 90% 25%, rgba(61,14,32,0.40) 0%, transparent 58%)',
            'radial-gradient(ellipse 42% 42% at 55% 88%, rgba(168,64,96,0.16) 0%, transparent 55%)',
            'radial-gradient(ellipse 35% 35% at 70% 65%, rgba(192,96,122,0.10) 0%, transparent 50%)',
          ].join(', ')
        }} />
      </div>

      {/* ── Decorative rings — wine tones ────────────────────── */}
      <div className="absolute top-16 right-16 w-96 h-96 rounded-full animate-float"
        style={{ border: '1px solid rgba(139,46,74,0.20)' }} />
      <div className="absolute bottom-16 left-16 w-72 h-72 rounded-full animate-float"
        style={{ border: '1px solid rgba(192,96,122,0.15)', animationDelay: '2s' }} />
      <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full blur-3xl"
        style={{ background: 'rgba(139,46,74,0.07)' }} />

      {/* Soft blush sparkle dots */}
      {[
        { top: '20%', left: '15%' }, { top: '68%', left: '10%' },
        { top: '35%', left: '84%' }, { top: '75%', left: '80%' },
        { top: '12%', left: '52%' }, { top: '88%', left: '48%' },
      ].map((pos, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full animate-sparkle"
          style={{ ...pos, background: '#F0D8E0', animationDelay: `${i * 0.4}s` }} />
      ))}

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Est line */}
        <div className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, transparent, #8B2E4A)' }} />
          <span className="text-xs tracking-[0.45em] uppercase font-sans font-light" style={{ color: '#D0A8B8' }}>Est. 2024</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to left, transparent, #8B2E4A)' }} />
        </div>

        {/* Headline */}
        <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-light text-ivory leading-[1.1] mb-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Crafted for
          <br />
          <span className="italic" style={{
            background: 'linear-gradient(135deg, #E090A8 0%, #C0607A 35%, #8B2E4A 65%, #5C1A30 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Eternity</span>
        </h1>

        {/* Subtext */}
        <p className={`font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ color: 'rgba(220,185,200,0.72)' }}>
          Discover our curated collection of fine jewelry — where heritage craftsmanship meets contemporary elegance. Each piece tells a story of timeless beauty.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#collections" id="cta-explore"
            className="px-10 py-4 text-white font-sans text-sm tracking-[0.22em] uppercase rounded-full shadow-xl transition-all duration-500"
            style={{ background: 'linear-gradient(135deg, #C0607A 0%, #8B2E4A 55%, #3D0E20 100%)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 45px rgba(139,46,74,0.60)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}>
            Explore Collection
          </a>
          <a href="#about"
            className="px-10 py-4 font-sans text-sm tracking-[0.22em] uppercase rounded-full transition-all duration-500"
            style={{ border: '1px solid rgba(139,46,74,0.45)', color: '#D0A8B8' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,46,74,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}>
            Our Story
          </a>
        </div>

        {/* Stats */}
        <div className={`flex items-center justify-center gap-10 md:gap-20 mt-16 transition-all duration-1000 delay-[900ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '150+', label: 'Unique Designs', color: '#C0607A' },
            { value: '25K+', label: 'Happy Clients',  color: '#D0A8B8' },
            { value: '99.9%', label: 'Pure Gold',     color: '#8B2E4A' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-semibold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] tracking-[0.25em] uppercase mt-1 font-sans" style={{ color: 'rgba(208,168,184,0.48)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(139,46,74,0.52)' }}>Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(139,46,74,0.58), transparent)' }} />
      </div>
    </section>
  );
}
