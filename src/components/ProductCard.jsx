import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product, onViewIn3D }) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const badgeColors = {
    New:       'bg-deep-rose',
    Bestseller:'bg-gold',
    Limited:   'bg-rose-gold',
    Exclusive: 'bg-onyx',
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(product, {
      karat:       product.karat,
      diamondSize: product.diamondSize,
      metalColor:  product.metalColor,
    });
  };

  // Zoom level per category — necklaces zoom more so the pendant fills the frame
  const zoomClass = {
    Necklaces: 'scale-[1.55]',
    Rings:     'scale-[1.15]',
    Earrings:  'scale-[1.20]',
    Bracelets: 'scale-[1.20]',
  }[product.category] ?? 'scale-[1.15]';

  const hoverZoom = {
    Necklaces: 'scale-[1.62]',
    Rings:     'scale-[1.22]',
    Earrings:  'scale-[1.28]',
    Bracelets: 'scale-[1.28]',
  }[product.category] ?? 'scale-[1.22]';

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image Container — fixed square, all cards identical ── */}
      <div className="relative overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-500"
        style={{ aspectRatio: '1/1', background: 'linear-gradient(145deg, #EDE0E5, #F5EEF2)' }}>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 z-20 px-3 py-1.5 ${badgeColors[product.badge]} text-white text-[10px] tracking-[0.15em] uppercase font-semibold rounded-full shadow-md`}>
            {product.badge}
          </div>
        )}

        {/* Product Image — zoomed so jewelry fills the frame equally */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? hoverZoom + ' brightness-95' : zoomClass
          }`}
          loading="lazy"
          style={{ objectPosition: 'center center' }}
        />

        {/* Shimmer on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, transparent 30%, rgba(192,114,56,0.18) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        )}

        {/* Hover overlay with action buttons */}
        <div className={`absolute inset-0 flex items-end justify-center pb-5 gap-3 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.08) 55%, transparent 100%)' }}>
          <button
            onClick={() => onViewIn3D(product)}
            className="px-4 py-2 bg-white text-onyx text-[10px] tracking-[0.12em] uppercase font-semibold rounded-full transition-all duration-300 shadow-lg hover:bg-warm-gold hover:text-white"
          >
            View in 3D
          </button>
          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 text-white text-[10px] tracking-[0.12em] uppercase font-semibold rounded-full transition-all duration-300 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #8B2E4A, #3D0E20)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #5C1A30, #1A0810)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #8B2E4A, #3D0E20)'}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* ── Product Info ─────────────────────────────────────────── */}
      <div className="mt-4 px-1">
        <h3 className="font-serif text-lg text-onyx group-hover:text-rose-gold transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-muted text-xs tracking-wider uppercase">{product.type}</p>
          <span className="font-sans text-base font-bold text-onyx">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
}
