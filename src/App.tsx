import { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { products, categories, Product } from './data/products';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-amber-300 text-sm font-medium uppercase tracking-[0.2em] mb-3">
              Crafted with intention
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Exceptional Coffee,<br />
              <span className="text-amber-300">Roasted to Perfection</span>
            </h2>
            <p className="text-amber-100/80 text-lg max-w-lg leading-relaxed">
              Discover our curated selection of specialty coffees sourced from the world's finest growing regions. Each bean tells a story of craft and care.
            </p>
          </div>
        </div>
        {/* Decorative coffee beans */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white">
            <ellipse cx="60" cy="100" rx="30" ry="45" fill="currentColor" transform="rotate(-20 60 100)" />
            <ellipse cx="120" cy="80" rx="25" ry="40" fill="currentColor" transform="rotate(15 120 80)" />
            <ellipse cx="150" cy="130" rx="28" ry="42" fill="currentColor" transform="rotate(-10 150 130)" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-amber-900">Our Collection</h3>
            <p className="text-amber-500 text-sm mt-1">
              {filteredProducts.length} coffee{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="font-serif text-xl text-amber-900 mb-2">No coffees found</h4>
            <p className="text-amber-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-3">Ember & Bloom</h4>
              <p className="text-amber-200/70 text-sm leading-relaxed">
                Specialty coffee roasted with care. We source directly from farmers who share our passion for quality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm text-amber-200/70">
                <li><span className="hover:text-white cursor-pointer transition-colors">Our Story</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Brewing Guides</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Subscriptions</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Wholesale</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 text-sm text-amber-200/70">
                <li><span className="hover:text-white cursor-pointer transition-colors">Instagram</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Twitter</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Newsletter</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-300/50">
            <p>© 2026 Ember & Bloom. All rights reserved. Crafted with ☕ and care.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
