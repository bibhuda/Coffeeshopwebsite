import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#faf7f2] z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-amber-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-amber-900">Your Cart</h2>
              <p className="text-sm text-amber-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="font-serif text-lg text-amber-900 mb-1">Your cart is empty</p>
                <p className="text-sm text-amber-500">Add some exceptional coffee to get started</p>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-amber-50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-amber-900 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-amber-500 mb-2">{item.product.weight}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-medium transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-amber-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-medium transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-amber-900 text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-amber-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-amber-100 p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Shipping</span>
                  <span>{totalPrice >= 50 ? 'Free' : '$5.00'}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-900 text-lg pt-2 border-t border-amber-100">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 50 && (
                <p className="text-xs text-amber-500 text-center">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                </p>
              )}

              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-800/20 active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
