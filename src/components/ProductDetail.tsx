import { useState } from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-auto md:min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex-1">
              <span className="text-xs font-medium text-amber-500 uppercase tracking-wider">
                {product.category} • {product.origin}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 mt-2 mb-1">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-500' : 'text-amber-200'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-amber-600">{product.rating} / 5</span>
              </div>

              <p className="text-amber-700 leading-relaxed mb-6 text-sm sm:text-base">
                {product.description}
              </p>

              {/* Tasting Notes */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2">
                  Tasting Notes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map(note => (
                    <span
                      key={note}
                      className="px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-800 text-sm rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-amber-50 rounded-xl p-3">
                  <span className="text-xs text-amber-500 font-medium">Roast Level</span>
                  <p className="text-sm font-semibold text-amber-900">{product.roast}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <span className="text-xs text-amber-500 font-medium">Weight</span>
                  <p className="text-sm font-semibold text-amber-900">{product.weight}</p>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="border-t border-amber-100 pt-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-amber-900">
                  ${product.price.toFixed(2)}
                </span>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-amber-50 rounded-full px-1 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-amber-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-full font-semibold text-white transition-all duration-300 active:scale-[0.98] ${
                  added
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-amber-800 hover:bg-amber-900 hover:shadow-lg hover:shadow-amber-800/20'
                }`}
              >
                {added ? '✓ Added to Cart!' : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
