import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const { addToCart } = useCart();

  const roastColor = {
    'Light': 'bg-yellow-100 text-yellow-800',
    'Light-Medium': 'bg-amber-100 text-amber-800',
    'Medium': 'bg-orange-100 text-orange-800',
    'Medium-Dark': 'bg-orange-200 text-orange-900',
    'Dark': 'bg-amber-900 text-amber-100',
  }[product.roast] || 'bg-amber-100 text-amber-800';

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-amber-50 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div
        className="relative h-52 sm:h-60 overflow-hidden cursor-pointer"
        onClick={() => onViewDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${roastColor}`}>
          {product.roast} Roast
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onViewDetail(product); }}
          className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-amber-900 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          View Details
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-amber-900 leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-medium text-amber-700">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-amber-500 font-medium uppercase tracking-wider mb-2">
          {product.origin} • {product.weight}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map(note => (
            <span key={note} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-50">
          <span className="text-xl font-bold text-amber-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-800/20 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
