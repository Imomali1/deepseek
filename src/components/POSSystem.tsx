import React, { useState } from "react";
import CashDesk from "./CashDesk";
import ProductSearch from "./ProductSearch";
import { PlusCircle } from "lucide-react";

// Mock data for products
const products = [
  { id: 1, name: "Silk Tie", price: 89.99, barcode: "1234567890123" },
  { id: 2, name: "Cashmere Sweater", price: 249.99, barcode: "2345678901234" },
  { id: 3, name: "Leather Oxfords", price: 359.99, barcode: "3456789012345" },
  { id: 4, name: "Wool Blazer", price: 479.99, barcode: "4567890123456" },
  { id: 5, name: "Fountain Pen", price: 129.99, barcode: "5678901234567" },
  { id: 6, name: "Leather Briefcase", price: 569.99, barcode: "6789012345678" },
];

interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
}

interface Desk {
  id: number;
  name: string;
  cart: Product[];
}

const POSSystem = () => {
  const [cashDesks, setCashDesks] = useState<Desk[]>([
    { id: 1, name: "Grand Hall", cart: [] },
    { id: 2, name: "Parlour", cart: [] },
  ]);
  const [activeDeskId, setActiveDeskId] = useState<number>(1);

  const addItemToCart = (product: Product, deskId: number) => {
    setCashDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId
          ? {
              ...desk,
              cart: desk.cart.some((item) => item.id === product.id)
                ? desk.cart.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: item.quantity + 1 }
                      : item
                  )
                : [...desk.cart, { ...product, quantity: 1 }],
            }
          : desk
      )
    );
  };

  const updateQuantity = (
    deskId: number,
    productId: number,
    quantity: number
  ) => {
    setCashDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId
          ? {
              ...desk,
              cart: desk.cart
                .map((item) =>
                  item.id === productId
                    ? { ...item, quantity: Math.max(0, quantity) }
                    : item
                )
                .filter((item) => item.quantity > 0),
            }
          : desk
      )
    );
  };

  const removeFromCart = (deskId: number, productId: number) => {
    setCashDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId
          ? {
              ...desk,
              cart: desk.cart.filter((item) => item.id !== productId),
            }
          : desk
      )
    );
  };

  const handleBarcodeScanned = (barcode: string) => {
    const product = products.find((p) => p.barcode === barcode);
    if (product) {
      addItemToCart(product, activeDeskId);
    } else {
      alert("Product not found");
    }
  };

  const addNewDesk = () => {
    const newId = Math.max(...cashDesks.map((desk) => desk.id)) + 1;
    setCashDesks([
      ...cashDesks,
      { id: newId, name: `Salon ${newId}`, cart: [] },
    ]);
    setActiveDeskId(newId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center text-brown-800 border-b-2 border-brown-300 pb-4">
        Cash Desk Terminals
      </h1>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div className="bg-brown-100 p-1 rounded-md">
            {cashDesks.map((desk) => (
              <button
                key={desk.id}
                onClick={() => setActiveDeskId(desk.id)}
                className={`px-4 py-2 text-brown-800 rounded transition-colors duration-200 ${
                  activeDeskId === desk.id ? "bg-brown-200" : ""
                }`}
              >
                {desk.name}
              </button>
            ))}
          </div>
          <button
            onClick={addNewDesk}
            className="bg-brown-700 text-amber-500 hover:bg-brown-800 border-brown-800 px-4 py-2 rounded"
          >
            <PlusCircle className="inline-block mr-2" /> Add Salon
          </button>
        </div>
        {cashDesks.map(
          (desk) =>
            desk.id === activeDeskId && (
              <div
                key={desk.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-8">
                  <div className="bg-brown-50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-serif font-bold mb-4 text-brown-800">
                      Barcode Scanner
                    </h2>
                    <input
                      type="text"
                      placeholder="Scan or enter barcode"
                      className="w-full mb-4 bg-white border-brown-300 text-brown-800 placeholder-brown-400 p-2 rounded"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleBarcodeScanned(
                            (e.target as HTMLInputElement).value
                          );
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                  </div>
                  <ProductSearch
                    products={products}
                    onProductSelect={(product) =>
                      addItemToCart(product, desk.id)
                    }
                  />
                </div>
                <CashDesk
                  desk={desk}
                  updateQuantity={(productId, quantity) =>
                    updateQuantity(desk.id, productId, quantity)
                  }
                  removeFromCart={(productId) =>
                    removeFromCart(desk.id, productId)
                  }
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default POSSystem;
