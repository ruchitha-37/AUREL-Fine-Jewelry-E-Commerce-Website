import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [selectedKarat, setSelectedKarat] = useState(product?.karat || '18K');
  const [selectedDiamondSize, setSelectedDiamondSize] = useState(product?.diamondSize || '0.50 ct');
  const [selectedMetalColor, setSelectedMetalColor] = useState(product?.metalColor || 'Yellow Gold');
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setTimeout(() => setIsVisible(true), 50);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    if (!isRotating || isDragging) return;
    const interval = setInterval(() => setRotationAngle((prev) => prev + 0.5), 16);
    return () => clearInterval(interval);
  }, [isRotating, isDragging]);

  const handleMouseDown = (e) => { setIsDragging(true); setIsRotating(false); setDragStart(e.clientX); };
  const handleMouseMove = (e) => { if (!isDragging) return; setRotationAngle((p) => p + (e.clientX - dragStart) * 0.5); setDragStart(e.clientX); };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e) => { setIsDragging(true); setIsRotating(false); setDragStart(e.touches[0].clientX); };
  const handleTouchMove = (e) => { if (!isDragging) return; setRotationAngle((p) => p + (e.touches[0].clientX - dragStart) * 0.5); setDragStart(e.touches[0].clientX); };

  const handleAddToCart = () => {
    addItem(product, { karat: selectedKarat, diamondSize: selectedDiamondSize, metalColor: selectedMetalColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleClose = () => { setIsVisible(false); setTimeout(onClose, 300); };

  if (!product) return null;

  const metalColors = {
    'Yellow Gold': { color: '#DAA520', filterClass: 'metal-yellow-gold', bg: 'from-yellow-50 via-amber-50 to-orange-50' },
    'Rose Gold': { color: '#B76E79', filterClass: 'metal-rose-gold', bg: 'from-pink-50 via-rose-50 to-red-50' },
    Silver: { color: '#C0C0C0', filterClass: 'metal-silver', bg: 'from-gray-50 via-slate-50 to-zinc-50' },
  };

  const karatOptions = ['14K', '18K', '22K'];
  const diamondSizes = ['0.25 ct', '0.50 ct', '0.75 ct', '1.00 ct'];
  const karatMultiplier = { '14K': 0.85, '18K': 1, '22K': 1.3 };
  const diamondMultiplier = { '0.25 ct': 0.7, '0.50 ct': 1, '0.75 ct': 1.35, '1.00 ct': 1.8 };
  const adjustedPrice = Math.round(product.price * (karatMultiplier[selectedKarat] || 1) * (diamondMultiplier[selectedDiamondSize] || 1));
  const currentMetal = metalColors[selectedMetalColor] || metalColors['Yellow Gold'];

  return (
    <div
      id="product-modal-overlay"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}
    >
      <div className="absolute inset-0 bg-onyx/80 backdrop-blur-sm" />
      <div
        id="product-modal"
        className={`relative w-full max-w-5xl max-h-[90vh] bg-cream rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button id="modal-close-btn" onClick={handleClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-charcoal hover:bg-rose-gold hover:text-white transition-all duration-300 shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
          {/* Left — 3D View */}
          <div className={`lg:w-1/2 relative bg-gradient-to-br ${currentMetal.bg} min-h-[400px] flex flex-col items-center justify-center p-8 transition-all duration-700`}>
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-onyx/80 text-rose-gold text-[10px] tracking-[0.2em] uppercase rounded-full backdrop-blur-sm">
              <svg className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              360° Interactive View
            </div>
            <button onClick={() => setIsRotating(!isRotating)}
              className={`absolute top-4 right-16 px-3 py-1.5 text-[10px] tracking-wider uppercase rounded-full transition-all duration-300 font-semibold ${isRotating ? 'bg-rose-gold text-white' : 'bg-white/80 text-charcoal'}`}>
              {isRotating ? 'Auto ●' : 'Auto ○'}
            </button>

            {/* Decorative rings */}
            <div className="absolute w-64 h-64 rounded-full border-2 border-dashed opacity-10" style={{ borderColor: currentMetal.color }} />
            <div className="absolute w-80 h-80 rounded-full border opacity-5" style={{ borderColor: currentMetal.color }} />

            {/* 3D Product */}
            <div className="relative w-72 h-72 cursor-grab active:cursor-grabbing" style={{ perspective: '1000px' }}
              onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <div className="w-full h-full flex items-center justify-center"
                style={{ transform: `rotateY(${rotationAngle}deg)`, transformStyle: 'preserve-3d', transition: isDragging ? 'none' : undefined }}>
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="relative">
                    <div className="absolute -inset-8 blur-3xl opacity-25 rounded-full" style={{ backgroundColor: currentMetal.color }} />
                    <img src={product.image} alt={product.name}
                      className={`w-56 h-56 object-contain relative z-10 drop-shadow-2xl transition-all duration-500 ${currentMetal.filterClass}`} />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="relative">
                    <div className="absolute -inset-8 blur-3xl opacity-25 rounded-full" style={{ backgroundColor: currentMetal.color }} />
                    <img src={product.image} alt={product.name}
                      className={`w-56 h-56 object-contain relative z-10 drop-shadow-2xl ${currentMetal.filterClass}`} style={{ transform: 'scaleX(-1)' }} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-muted text-xs tracking-wider">Drag to rotate · Click auto to toggle</p>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent mt-4" />
          </div>

          {/* Right — Config */}
          <div className="lg:w-1/2 p-8 lg:p-10 overflow-y-auto">
            <span className="text-rose-gold text-xs tracking-[0.2em] uppercase font-medium">{product.category}</span>
            <h2 className="font-serif text-3xl md:text-4xl text-onyx mt-1 mb-2">{product.name}</h2>
            <p className="text-muted text-sm leading-relaxed mb-8">{product.description}</p>
            <div className="w-full h-[1px] bg-champagne mb-8" />

            {/* Karat */}
            <div className="mb-6">
              <label className="text-xs tracking-[0.2em] uppercase text-slate font-semibold mb-3 block">Gold Karat</label>
              <div className="flex gap-2">
                {karatOptions.map((k) => (
                  <button key={k} onClick={() => setSelectedKarat(k)}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300 ${
                      selectedKarat === k ? 'bg-onyx text-ivory border-onyx' : 'bg-white text-charcoal border-champagne hover:border-rose-gold/50'
                    }`}>{k}</button>
                ))}
              </div>
            </div>

            {/* Diamond */}
            <div className="mb-6">
              <label className="text-xs tracking-[0.2em] uppercase text-slate font-semibold mb-3 block">Diamond Size</label>
              <div className="flex flex-wrap gap-2">
                {diamondSizes.map((d) => (
                  <button key={d} onClick={() => setSelectedDiamondSize(d)}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300 ${
                      selectedDiamondSize === d ? 'bg-onyx text-ivory border-onyx' : 'bg-white text-charcoal border-champagne hover:border-rose-gold/50'
                    }`}>{d}</button>
                ))}
              </div>
            </div>

            {/* Metal Color */}
            <div className="mb-8">
              <label className="text-xs tracking-[0.2em] uppercase text-slate font-semibold mb-3 block">Metal Color</label>
              <div className="flex gap-5">
                {Object.entries(metalColors).map(([name, { color }]) => (
                  <button key={name} onClick={() => setSelectedMetalColor(name)} className="flex flex-col items-center gap-2 group">
                    <div className={`w-12 h-12 rounded-full border-[3px] transition-all duration-300 shadow-sm ${
                      selectedMetalColor === name ? 'border-onyx scale-110 shadow-lg ring-2 ring-offset-2 ring-rose-gold/30' : 'border-champagne hover:border-rose-gold/50 hover:scale-105'
                    }`} style={{ backgroundColor: color }} />
                    <span className={`text-[10px] tracking-wider font-medium transition-colors ${
                      selectedMetalColor === name ? 'text-onyx' : 'text-muted'
                    }`}>{name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-champagne mb-8" />

            {/* Price */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs text-muted tracking-wider uppercase">Total Price</span>
                <div className="font-serif text-3xl text-onyx font-bold">{formatPrice(adjustedPrice)}</div>
              </div>
              <div className="text-right text-xs text-muted">
                <div>{selectedKarat} · {selectedDiamondSize}</div>
                <div>{selectedMetalColor}</div>
              </div>
            </div>

            <button id="add-to-cart-btn" onClick={handleAddToCart}
              className={`w-full py-4 text-sm tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-500 shadow-lg ${
                added ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-gradient-to-r from-rose-gold to-deep-rose text-white hover:shadow-xl hover:shadow-rose-gold/30'
              }`}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <div className="flex items-center justify-center gap-6 mt-6 text-muted">
              {[
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Certified' },
                { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Free Shipping' },
                { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', label: '30-Day Returns' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[10px] tracking-wider">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} /></svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
