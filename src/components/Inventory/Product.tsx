import React, { useState } from 'react';
import CategoriesTab from './Category';

// Mock product data
const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
  category: `Category ${Math.floor(i / 10) + 1}`,
}));

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">${product.price}</td>
                  <td className="border p-2">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
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

