import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MarqueeBar from './components/MarqueeBar';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <HeroBanner />
          <MarqueeBar />
          <CategoryGrid onCategorySelect={(cat) => setActiveCategory(cat)} />
          <ProductGrid
            onViewIn3D={setSelectedProduct}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </main>
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer onCheckout={() => setShowCheckout(true)} />

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        {/* Checkout */}
        {showCheckout && (
          <CheckoutPage onClose={() => setShowCheckout(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
