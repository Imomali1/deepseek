import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Desk {
  id: number;
  name: string;
  cart: Product[];
}

interface CashDeskProps {
  desk: Desk;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CashDesk = ({ desk, updateQuantity, removeFromCart }: CashDeskProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalAmount = desk.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert(`Payment of $${totalAmount.toFixed(2)} processed for ${desk.name}`);
      desk.cart.forEach((item) => removeFromCart(item.id));
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="bg-white border-brown-300 shadow-lg rounded-lg">
      <div className="border-b border-brown-300 p-4">
        <h2 className="text-2xl font-serif text-brown-800">{desk.name}</h2>
      </div>
      <div className="p-6">
        {desk.cart.length === 0 ? (
          <p className="text-brown-600 italic">Your cart awaits your exquisite selections.</p>
        ) : (
          <div className="space-y-4">
            {desk.cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-brown-200">
                <div>
                  <h3 className="font-serif font-semibold text-brown-800">{item.name}</h3>
                  <p className="text-sm text-brown-600">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-brown-100 text-brown-800 border-brown-400 hover:bg-brown-200 p-1 rounded"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-brown-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-brown-100 text-brown-800 border-brown-400 hover:bg-brown-200 p-1 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-700 text-amber-100 hover:bg-red-600 p-1 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-stretch p-6 border-t border-brown-300">
        <div className="text-2xl font-serif font-bold mb-4 text-brown-800">Total: ${totalAmount.toFixed(2)}</div>
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut || desk.cart.length === 0}
          className={`w-full p-2 rounded ${
            isCheckingOut || desk.cart.length === 0
              ? 'bg-brown-200 text-brown-500'
              : 'bg-brown-700 text-amber-100 hover:bg-brown-600'
          }`}
        >
          {isCheckingOut ? 'Processing...' : 'Complete Transaction'}
        </button>
      </div>
    </div>
  );
};

export default CashDesk;