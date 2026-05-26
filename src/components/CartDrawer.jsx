import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartDrawer({ onCheckout }) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    closeCart();
    onCheckout();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-onyx/50 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeCart} />
      <div id="cart-drawer"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-[95] shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-champagne bg-gradient-to-r from-blush/50 to-cream">
          <div>
            <h2 className="font-serif text-2xl text-onyx">Your Cart</h2>
            <p className="text-muted text-xs tracking-wider mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button id="close-cart-btn" onClick={closeCart} className="w-10 h-10 rounded-full bg-white hover:bg-rose-gold hover:text-white flex items-center justify-center text-charcoal transition-all duration-300 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 260px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className="font-serif text-xl text-onyx mb-2">Your cart is empty</h3>
              <p className="text-muted text-sm">Discover our exquisite collection</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-onyx truncate">{item.product.name}</h4>
                    <p className="text-muted text-[10px] tracking-wider mt-0.5">{item.options.karat} · {item.options.diamondSize} · {item.options.metalColor}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => item.quantity > 1 ? updateQuantity(index, item.quantity - 1) : removeItem(index)}
                          className="w-7 h-7 rounded-full bg-blush flex items-center justify-center text-sm text-charcoal hover:bg-rose-gold hover:text-white transition-all">−</button>
                        <span className="text-sm font-semibold w-7 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-blush flex items-center justify-center text-sm text-charcoal hover:bg-rose-gold hover:text-white transition-all">+</button>
                      </div>
                      <span className="font-bold text-sm text-onyx">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(index)} className="text-muted hover:text-deep-rose transition-colors self-start">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-cream border-t border-champagne">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted uppercase tracking-wider">Subtotal</span>
              <span className="font-serif text-xl font-bold text-onyx">{formatPrice(totalPrice)}</span>
            </div>
            <button id="checkout-btn" onClick={handleCheckout}
              className="w-full py-4 bg-gradient-to-r from-rose-gold to-deep-rose text-white text-sm tracking-[0.2em] uppercase font-bold rounded-full hover:shadow-xl hover:shadow-rose-gold/30 transition-all duration-500">
              Proceed to Checkout
            </button>
            <p className="text-center text-muted text-[10px] tracking-wider mt-3">Free shipping pan India · 30-day returns</p>
          </div>
        )}
      </div>
    </>
  );
}
