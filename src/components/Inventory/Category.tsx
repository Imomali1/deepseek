import React, { useState } from 'react';

// Mock category data
const mockCategories = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Turkum ${i + 1}`,
  productCount: Math.floor(Math.random() * 100) + 1,
}));

interface Category {
  id: number;
  name: string;
  productCount: number;
}

const CategoriesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateCategory = () => {
    // Placeholder for create category functionality
    console.log('Create category button clicked');
  };

  return (
    <div>
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 flex-grow"
        />
        <button onClick={handleCreateCategory} className="bg-green-500 text-white px-4 py-2">
          Create Category
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">№</th>
            <th className="border p-2">Nomi</th>
            <th className="border p-2">Miqdori</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.id}>
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">{category.productCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, i) => (
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
  );
};

export default CategoriesTab;

