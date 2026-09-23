import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = totalPrice >= 50 ? 0 : 5;
  const total = totalPrice + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-900 mb-2">Order Confirmed!</h2>
          <p className="text-amber-600 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-amber-500 mb-6">
            Order #EB-{Math.random().toString(36).substring(2, 8).toUpperCase()} • Confirmation sent to {formData.email || 'your email'}
          </p>
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-700">
              Your exceptional coffee is being prepared with care. Expect delivery within 3-5 business days.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-full transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-amber-200 border-t-amber-800 animate-spin" />
          <h2 className="font-serif text-xl font-bold text-amber-900 mb-2">Processing Order</h2>
          <p className="text-amber-600 text-sm">Please wait while we confirm your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-amber-100 p-5 flex items-center justify-between z-10">
          <div>
            <h2 className="font-serif text-xl font-bold text-amber-900">Checkout</h2>
            <p className="text-sm text-amber-500">{items.length} item{items.length !== 1 ? 's' : ''} in your order</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Form Fields */}
            <div className="md:col-span-3 space-y-5">
              <div>
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">1</span>
                  Contact
                </h3>
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">2</span>
                  Shipping Address
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Street address"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="ZIP code"
                      required
                      value={formData.zip}
                      onChange={(e) => handleChange('zip', e.target.value)}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-bold">3</span>
                  Payment
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card number"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      value={formData.expiry}
                      onChange={(e) => handleChange('expiry', e.target.value)}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      required
                      value={formData.cvv}
                      onChange={(e) => handleChange('cvv', e.target.value)}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 sticky top-24">
                <h3 className="font-semibold text-amber-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-amber-900 truncate">{item.product.name}</p>
                        <p className="text-xs text-amber-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold text-amber-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-amber-200 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-amber-900 text-lg pt-2 border-t border-amber-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-4 bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-800/20 active:scale-[0.98] text-lg"
          >
            Place Order — ${total.toFixed(2)}
          </button>

          <p className="text-center text-xs text-amber-400 mt-3">
            🔒 This is a simulated checkout. No real payment will be processed.
          </p>
        </form>
      </div>
    </div>
  );
}
