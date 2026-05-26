import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { toggleCart, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/97 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      style={{ boxShadow: scrolled ? '0 2px 28px rgba(26,8,16,0.10)' : 'none' }}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── LOGO ─────────────────────────────────────────────── */}
        <a href="#" id="logo" className="flex items-center gap-3 group select-none">

          {/* Gem icon — deep wine + mauve + ivory */}
          <div className="w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(139,46,74,0.45))' }}>
              <defs>
                {/* Wine-to-plum gradient */}
                <linearGradient id="wg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#D06080" />
                  <stop offset="45%"  stopColor="#8B2E4A" />
                  <stop offset="100%" stopColor="#3D0E20" />
                </linearGradient>
                {/* Ivory shimmer */}
                <linearGradient id="wg2" x1="20" y1="2" x2="20" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#FDF9FB" stopOpacity="0.70" />
                  <stop offset="100%" stopColor="#D0B8C4" stopOpacity="0.06" />
                </linearGradient>
                {/* Dark plum left face */}
                <linearGradient id="wg3" x1="2" y1="20" x2="20" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#1A0810" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#5C1A30" stopOpacity="0.68" />
                </linearGradient>
              </defs>
              {/* Top crown */}
              <polygon points="20,2 29,15 20,12 11,15" fill="url(#wg1)" opacity="0.96" />
              {/* Left face */}
              <polygon points="11,15 20,12 20,38 3,22"  fill="url(#wg3)" opacity="0.90" />
              {/* Right face */}
              <polygon points="29,15 37,22 20,38 20,12" fill="url(#wg1)" opacity="0.74" />
              {/* Shimmer */}
              <polygon points="11,15 3,22 20,38 37,22 29,15 20,12" fill="url(#wg2)" />
              {/* Edges */}
              <polyline points="20,2 11,15 3,22 20,38 37,22 29,15 20,2"
                stroke="#FDF9FB" strokeWidth="0.65" strokeOpacity="0.42" fill="none" />
              <line x1="11" y1="15" x2="20" y2="12" stroke="#FDF9FB" strokeWidth="0.5" strokeOpacity="0.32" />
              <line x1="29" y1="15" x2="20" y2="12" stroke="#FDF9FB" strokeWidth="0.5" strokeOpacity="0.32" />
              <line x1="20" y1="12" x2="20" y2="38" stroke="#FDF9FB" strokeWidth="0.45" strokeOpacity="0.16" />
              {/* Soft ivory sparkle */}
              <path d="M20 0 L20.6 2.6 L23 2 L21.2 3.8 L22 6 L20 4.6 L18 6 L18.8 3.8 L17 2 L19.4 2.6 Z"
                fill="#F0D8E0" opacity="0.98" />
            </svg>
          </div>

          {/* "Aurel" in Great Vibes — deep wine/burgundy */}
          <div className="flex flex-col leading-none">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '42px',
                lineHeight: 1,
                letterSpacing: '0.02em',
                background: 'linear-gradient(135deg, #C0607A 0%, #8B2E4A 50%, #3D0E20 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Aurel
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '7px',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: scrolled ? '#7A5868' : 'rgba(255,255,255,0.45)',
                marginTop: '-2px',
                fontWeight: 300,
                transition: 'color 0.5s',
              }}
            >
              Fine Jewelry
            </span>
          </div>
        </a>

        {/* ── NAV LINKS ────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">
          {['Collections', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="relative text-sm tracking-wider transition-colors duration-300 group"
              style={{ color: scrolled ? '#2E1A22' : 'rgba(255,255,255,0.82)' }}>
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-gold group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* ── ICONS ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {[
            { label: 'Search',   d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
            { label: 'Wishlist', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
          ].map(({ label, d }) => (
            <button key={label} className="p-2 transition-colors hover:text-rose-gold duration-300" aria-label={label}
              style={{ color: scrolled ? '#2E1A22' : 'rgba(255,255,255,0.75)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
              </svg>
            </button>
          ))}

          <button id="cart-btn" onClick={toggleCart}
            className="relative p-2 transition-colors hover:text-rose-gold duration-300"
            style={{ color: scrolled ? '#2E1A22' : 'rgba(255,255,255,0.75)' }}
            aria-label="Cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulseGlow">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: scrolled ? '#2E1A22' : 'rgba(255,255,255,0.75)' }}
            aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-4 bg-cream/97 backdrop-blur-md border-t border-champagne">
          {['Collections', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-sm tracking-wider text-slate hover:text-rose-gold hover:pl-2 transition-all duration-300 border-b border-champagne/60 last:border-0">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
