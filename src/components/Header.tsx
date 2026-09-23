import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
}

export default function Header({ searchQuery, onSearchChange, onCartClick }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2,21H20V19H2M20,8H18V5H6V8H4A2,2 0 0,0 2,10V14A4,4 0 0,0 6,18H16A4,4 0 0,0 20,14V10A2,2 0 0,0 18,8M20,14A2,2 0 0,1 18,16H6A2,2 0 0,1 4,14V10H18V14M20,10V14H22V10H20Z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-xl font-bold text-amber-900 tracking-tight">Ember & Bloom</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-medium">Specialty Coffee</p>
            </div>
            <h1 className="sm:hidden font-serif text-lg font-bold text-amber-900">E&B</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/80 border border-amber-200 rounded-full text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 sm:p-3 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all duration-200 group"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800 group-hover:text-amber-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-800 text-white text-xs font-bold rounded-full flex items-center justify-center animate-[scale-in_0.2s_ease]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
