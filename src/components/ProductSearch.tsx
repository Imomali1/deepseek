import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
}

interface ProductSearchProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductSearch = ({ products, onProductSelect }: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-white border-brown-300 shadow-lg rounded-lg">
      <div className="border-b border-brown-300 p-4">
        <h2 className="text-2xl font-serif text-brown-800">Product Catalogue</h2>
      </div>
      <div className="p-6">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-grow bg-white border-brown-300 text-brown-800 placeholder-brown-400 p-2 rounded"
          />
          <button className="bg-brown-700 text-amber-100 hover:bg-brown-600 border-brown-500 p-2 rounded">
            <Search className="h-4 w-4" />
          </button>
        </div>
        {searchResults.length > 0 && (
          <ul className="mt-4 space-y-2">
            {searchResults.map((product) => (
              <li
                key={product.id}
                className="p-2 hover:bg-brown-100 cursor-pointer rounded text-brown-800"
                onClick={() => {
                  onProductSelect(product);
                  setSearchTerm('');
                  setSearchResults([]);
                }}
              >
                {product.name} - ${product.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;