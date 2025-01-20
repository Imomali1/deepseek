import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesTab from './Category';



const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          page: currentPage,
          limit: productsPerPage,
          search: searchTerm,
        },
      });
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
  };

  const handleFilter = () => {
    // Placeholder for filter functionality
    console.log('Filter button clicked');
  };

  const handleCreateProduct = () => {
    // Placeholder for create product functionality
    console.log('Create product button clicked');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex mb-4 space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 flex-grow"
            />
            <input
              type="text"
              placeholder="Scan barcode..."
              value={barcode}
              onChange={handleBarcodeChange}
              className="border p-2 w-1/4"
            />
            <button onClick={handleFilter} className="bg-gray-200 px-4 py-2">
              Filter
            </button>
            <button onClick={handleCreateProduct} className="bg-green-500 text-white px-4 py-2">
              Create Product
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">№</th>
                <th className="border p-2">Nomi</th>
                <th className="border p-2">Narxi</th>
                <th className="border p-2">Turkumi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className="border p-2">{(currentPage - 1) * productsPerPage + index + 1}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && <CategoriesTab />}
    </div>
  );
};

export default ProductManagement;