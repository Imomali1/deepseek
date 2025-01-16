import React, { useState } from "react";
import CashDesk from "./CashDesk";
import ProductSearch from "./ProductSearch";
import { PlusCircle, CircleX, ScanBarcode } from "lucide-react";
import Swal from 'sweetalert2';

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
    { id: 1, name: "Основной", cart: [] },
    { id: 2, name: "Второй", cart: [] },
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
      { id: newId, name: `Вкладка ${newId}`, cart: [] },
    ]);
    Swal.fire({
      icon: 'success',
      title: 'Desk Addd',
      text: 'The desk has been successfully added.',
      confirmButtonColor: '#3085d6',
    });
    setActiveDeskId(newId);
  };


  const removeDesk = (deskId: number) => {
    if (cashDesks.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Delete',
        text: 'You must have at least one desk.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to close this desk.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setCashDesks((prevDesks) => {
          const updatedDesks = prevDesks.filter((desk) => desk.id !== deskId);
          setActiveDeskId(updatedDesks[0].id);
          return updatedDesks;
        });

        Swal.fire({
          icon: 'success',
          title: 'Desk Closed',
          text: 'The desk has been successfully closed.',
          
        });
      }
    });
  };

  return (
    <div className="container font-serif">
        <div className="flex-row justify-between items-center">
          <div className="flex flex-row bg-brown-100 p-1 rounded-md">
            {cashDesks.map((desk) => (
              <div className="flex items-center" key={desk.id}>
                <button
                  onClick={() => setActiveDeskId(desk.id)}
                  className={`
                    px-4 py-2 text-brown-800 rounded transition-colors duration-200
                    bg-white
                    border-2 border-brown-300
                    ${activeDeskId === desk.id
                      ? "bg-brown-200 font-bold shadow-md shadow-orange-200"
                      : "hover:bg-brown-50"
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  {desk.name}
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); 
                      removeDesk(desk.id);
                    }}
                    className="ml-2 hover:text-red-600" 
                  >
                    <CircleX className="inline-block" />
                  </span>
                </button>
              </div>
            ))}
             <button
            onClick={addNewDesk}
            className="bg-brown-700 text-amber-500 hover:bg-brown-800 border-brown-800 px-4 py-2 rounded"
          >
            <PlusCircle className="inline-block mr-2" />
          </button>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-md">
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
                      Сканер штрихкодов
                    </h2>
                   <div className="flex flex-row">
                    <ScanBarcode className="w-10 h-10 mb-4 text-orange-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Сканировать или ввести штрихкод"
                      className="w-full mb-4 bg-white border-brown-300 text-brown-800 placeholder-brown-400 p-2 rounded"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleBarcodeScanned(
                            (e.target as HTMLInputElement).value
                          );
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                   </div>
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
