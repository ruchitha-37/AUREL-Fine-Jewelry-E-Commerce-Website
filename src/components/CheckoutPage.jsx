import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import ConfettiBlast from './ConfettiBlast';

export default function CheckoutPage({ onClose }) {
  const { items, totalPrice, totalItems } = useCart();
  const [step, setStep] = useState('checkout'); // checkout | confirmation
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '',
  });
  const [errors, setErrors] = useState({});

  const shipping = 0; // Free shipping
  const tax = Math.round(totalPrice * 0.03); // 3% GST
  const grandTotal = totalPrice + shipping + tax;
  const orderNumber = `AUR-${Date.now().toString().slice(-8)}`;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid phone is required';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = 'Valid pincode is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validate()) {
      setStep('confirmation');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (step === 'confirmation') {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-onyx/80 backdrop-blur-sm" onClick={onClose} />
        <ConfettiBlast />

        <div className="relative z-[112] w-full max-w-lg bg-cream rounded-3xl p-10 text-center shadow-2xl animate-scaleIn">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl text-onyx mb-2">Order Confirmed!</h2>
          <p className="text-muted text-sm mb-6">Thank you for shopping with AUREL, {formData.name.split(' ')[0]}!</p>

          {/* Order details */}
          <div className="bg-white rounded-2xl p-6 mb-6 text-left shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs tracking-[0.15em] uppercase text-muted font-medium">Order Number</span>
              <span className="font-mono text-sm font-bold text-onyx">{orderNumber}</span>
            </div>
            <div className="border-t border-champagne pt-4 space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-onyx truncate">{item.product.name}</p>
                    <p className="text-[10px] text-muted">{item.options.karat} · {item.options.diamondSize} · {item.options.metalColor}</p>
                  </div>
                  <span className="text-sm font-semibold text-onyx whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-champagne mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-sm text-muted">
                <span>GST (3%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-onyx pt-2 border-t border-champagne">
                <span>Grand Total</span>
                <span className="font-serif">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-blush/50 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-rose-gold font-semibold tracking-wider uppercase mb-1">Delivering To</p>
            <p className="text-sm text-onyx">{formData.name}</p>
            <p className="text-xs text-muted">{formData.address}, {formData.city} - {formData.pincode}</p>
            <p className="text-xs text-muted mt-1">Estimated delivery: 5-7 business days</p>
          </div>

          <button onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-rose-gold to-deep-rose text-white text-sm tracking-[0.15em] uppercase font-bold rounded-full hover:shadow-lg transition-all duration-500">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-onyx/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[111] w-full max-w-2xl max-h-[90vh] bg-cream rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-gold to-deep-rose p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl">Checkout</h2>
              <p className="text-white/70 text-xs tracking-wider mt-1">{totalItems} items · {formatPrice(totalPrice)}</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Order summary */}
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
            <h3 className="text-xs tracking-[0.15em] uppercase text-rose-gold font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.product.image} alt="" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-onyx truncate">{item.product.name}</p>
                    <p className="text-[10px] text-muted">{item.options.karat} · {item.options.diamondSize} · {item.options.metalColor} × {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm text-onyx">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping form */}
          <h3 className="text-xs tracking-[0.15em] uppercase text-rose-gold font-semibold mb-4">Shipping Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { field: 'name', label: 'Full Name', placeholder: 'Priya Sharma', full: true },
              { field: 'email', label: 'Email', placeholder: 'priya@example.com', type: 'email' },
              { field: 'phone', label: 'Phone', placeholder: '+91 98765 43210', type: 'tel' },
              { field: 'address', label: 'Address', placeholder: '123, MG Road, Indiranagar', full: true },
              { field: 'city', label: 'City', placeholder: 'Bengaluru' },
              { field: 'pincode', label: 'Pincode', placeholder: '560001' },
            ].map(({ field, label, placeholder, type, full }) => (
              <div key={field} className={full ? 'sm:col-span-2' : ''}>
                <label className="text-[11px] tracking-wider uppercase text-slate font-medium mb-1.5 block">{label}</label>
                <input
                  type={type || 'text'}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={placeholder}
                  className={`w-full px-4 py-3 bg-white rounded-xl text-sm border-2 outline-none transition-all duration-300 ${
                    errors[field] ? 'border-red-400 focus:border-red-500' : 'border-champagne focus:border-rose-gold/50'
                  }`}
                />
                {errors[field] && <p className="text-red-500 text-[10px] mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-blush/40 rounded-2xl p-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between text-muted"><span>Shipping</span><span className="text-emerald-600 font-medium">FREE</span></div>
              <div className="flex justify-between text-muted"><span>GST (3%)</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between font-bold text-lg text-onyx pt-3 border-t border-rose-gold/20">
                <span>Grand Total</span><span className="font-serif">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Place Order */}
        <div className="p-6 border-t border-champagne bg-cream">
          <button onClick={handlePlaceOrder}
            className="w-full py-4 bg-gradient-to-r from-rose-gold to-deep-rose text-white text-sm tracking-[0.2em] uppercase font-bold rounded-full hover:shadow-xl hover:shadow-rose-gold/30 transition-all duration-500">
            Place Order · {formatPrice(grandTotal)}
          </button>
          <p className="text-center text-muted text-[10px] tracking-wider mt-3">🔒 Secure payment · 100% encrypted</p>
        </div>
      </div>
    </div>
  );
}
