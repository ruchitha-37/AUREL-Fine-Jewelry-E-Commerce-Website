import { useState, useRef, useEffect } from 'react';
import { categories } from '../data/products';

export default function CategoryGrid({ onCategorySelect }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (catName) => {
    onCategorySelect(catName);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="collections" className="py-24 px-6 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-rose-gold text-sm tracking-[0.3em] uppercase font-sans font-medium">
            Curated Collections
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-onyx mt-3 mb-4">
            Shop by Category
          </h2>
          <div className="w-20 h-[1.5px] mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #8B2E4A, #C0607A, #6A4A7A)' }} />
        </div>

        {/* All 4 cards — EQUAL height, same-size grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ gridAutoRows: '340px' }}>
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              id={`category-${cat.name.toLowerCase()}`}
              onClick={() => handleCategoryClick(cat.name)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500 ${
                visible ? 'animate-tiltIn' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Image — same cover for all */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(12,8,22,0.88) 0%, rgba(12,8,22,0.28) 55%, rgba(12,8,22,0.08) 100%)'
                }} />

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: 'inset 0 0 32px rgba(192,96,122,0.28)' }} />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-[2px] w-6 group-hover:w-10 transition-all duration-500 rounded-full"
                    style={{ background: '#C0607A' }} />
                  <span className="text-[10px] tracking-[0.28em] uppercase font-medium"
                    style={{ color: 'rgba(220,180,200,0.85)' }}>
                    {cat.count} Pieces
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-ivory mb-1 drop-shadow-lg">
                  {cat.name}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(240,230,235,0.60)' }}>
                  {cat.description}
                </p>

                {/* Explore link — slides in on hover */}
                <div className="flex items-center gap-2 mt-4 text-xs tracking-[0.18em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500"
                  style={{ color: '#E0A0B8' }}>
                  <span>Explore Collection</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ borderColor: 'rgba(192,96,122,0.45)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
