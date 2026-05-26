import { useState, useRef, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ onViewIn3D, activeCategory, onCategoryChange }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Sync with external category selection
  const activeFilter = activeCategory || 'All';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filters = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category === activeFilter);

  const handleFilter = (filter) => {
    if (onCategoryChange) onCategoryChange(filter);
  };

  return (
    <section
      id="products"
      className="py-24 px-6"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #FAF6F8 0%, #F5EEF2 35%, #EDE0E5 65%, #F8F2F5 100%)',
        backgroundImage: `
          linear-gradient(160deg, #FAF6F8 0%, #F5EEF2 35%, #EDE0E5 65%, #F8F2F5 100%),
          url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238B2E4A' stroke-opacity='0.04' stroke-width='0.5'%3E%3Cline x1='0' y1='0' x2='80' y2='80'/%3E%3Cline x1='40' y1='0' x2='80' y2='40'/%3E%3Cline x1='0' y1='40' x2='40' y2='80'/%3E%3C/g%3E%3C/svg%3E")
        `,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.35em] uppercase font-sans font-medium" style={{ color: '#C07238' }}>
            The Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-onyx mt-3 mb-4">
            Signature Pieces
          </h2>
          <div className="w-20 h-[1.5px] mx-auto rounded-full mb-8" style={{ background: 'linear-gradient(90deg, #8B2E4A, #C0607A, #6A1A38)' }} />

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                id={`filter-${filter.toLowerCase()}`}
                onClick={() => handleFilter(filter)}
                className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase font-semibold rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'text-white shadow-md'
                    : 'bg-white text-slate hover:bg-champagne border border-champagne'
                }`}
                style={activeFilter === filter ? { background: 'linear-gradient(135deg, #8B2E4A, #3D0E20)' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <ProductCard product={product} onViewIn3D={onViewIn3D} />
            </div>
          ))}
        </div>

        {/* View All Pieces CTA */}
        {activeFilter !== 'All' && (
          <div className="text-center mt-16">
            <button
              id="view-all-btn"
              onClick={() => handleFilter('All')}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white border-2 border-rose-gold/30 text-onyx text-sm tracking-[0.15em] uppercase font-medium rounded-full hover:bg-gradient-to-r hover:from-rose-gold hover:to-deep-rose hover:text-white hover:border-transparent transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              View All Pieces
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
