import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;
}

interface Category {
  id: number;
  name: string;
}

interface Variant {
  color: string;
  size: string;
  quantity: number;
  price: string;
}

const NewInventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minStock, setMinStock] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', barcode: '' });
  const [newCategory, setNewCategory] = useState('');
  const itemsPerPage = 3;

  // Filter and paginate products
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.barcode.includes(productSearch);

    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

    const matchesPrice = (minPrice ? product.price >= parseFloat(minPrice) : true) &&
      (maxPrice ? product.price <= parseFloat(maxPrice) : true);

    const matchesStock = minStock ? product.stock >= parseFloat(minStock) : true;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const paginatedProducts = filteredProducts.slice(
    (productPage - 1) * itemsPerPage,
    productPage * itemsPerPage
  );

  // Filter and paginate categories
  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (categoryPage - 1) * itemsPerPage,
    categoryPage * itemsPerPage
  );

  // Handle creating a new product
  const handleCreateProduct = () => {
    const newProductData = {
      id: mockProducts.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      barcode: newProduct.barcode,
    };

    mockProducts.push(newProductData);
    setIsCreateProductModalOpen(false);
    setNewProduct({ name: '', category: '', price: '', stock: '', barcode: '' });
  };

  // Handle creating a new category
  const handleCreateCategory = () => {
    const newCategoryData = {
      id: mockCategories.length + 1,
      name: newCategory,
    };

    mockCategories.push(newCategoryData);
    setIsCreateCategoryModalOpen(false);
    setNewCategory('');
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'categories' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="mt-4">
          {/* Search and Buttons */}
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Products (Name, Category, or Barcode)"
              className="w-full p-2 border rounded"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsFiltersModalOpen(true)}
            >
              Filters
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setIsCreateProductModalOpen(true)}
            >
              Create Product
            </button>
          </div>

          {/* Filters Modal */}
          {isFiltersModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Filters</h2>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Price Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      className="w-1/2 p-2 border rounded"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      className="w-1/2 p-2 border rounded"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Min Stock</label>
                  <input
                    type="number"
                    placeholder="Min Stock"
                    className="w-full p-2 border rounded"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setIsFiltersModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setIsFiltersModalOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create Product Modal */}
          {isCreateProductModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New Product</h2>

                {/* Product Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>

                {/* Product Category */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>

                {/* Product Stock */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    className="w-full p-2 border rounded"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>

                {/* Product Barcode */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Barcode</label>
                  <input
                    type="text"
                    placeholder="Barcode"
                    className="w-full p-2 border rounded"
                    value={newProduct.barcode}
                    onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setIsCreateProductModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleCreateProduct}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <table className="w-full mt-4 border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Barcode</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{product.id}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">${product.price.toFixed(2)}</td>
                  <td className="p-2 border">{product.stock}</td>
                  <td className="p-2 border">{product.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-1 px-3 py-1 border rounded ${productPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => setProductPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="mt-4">
          {/* Search and Create Category Button */}
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Categories"
              className="w-full p-2 border rounded"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => setIsCreateCategoryModalOpen(true)}
            >
              Create Category
            </button>
          </div>

          {/* Create Category Modal */}
          {isCreateCategoryModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New Category</h2>

                {/* Category Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full p-2 border rounded"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setIsCreateCategoryModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleCreateCategory}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <table className="w-full mt-4 border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{category.id}</td>
                  <td className="p-2 border">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-1 px-3 py-1 border rounded ${categoryPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => setCategoryPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInventory;

// ProductEntryForm Component
const ProductEntryForm: React.FC = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    basePrice: '',
    colors: [] as string[],
    sizes: [] as string[],
    variants: [] as Variant[],
  });

  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const defaultColors = ['Black', 'White', 'Navy', 'Gray', 'Red', 'Blue'];

  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  const addColor = (color: string) => {
    if (!productData.colors.includes(color)) {
      setProductData({
        ...productData,
        colors: [...productData.colors, color],
        variants: generateVariants([...productData.colors, color], productData.sizes),
      });
    }
  };

  const addSize = (size: string) => {
    if (!productData.sizes.includes(size)) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, size],
        variants: generateVariants(productData.colors, [...productData.sizes, size]),
      });
    }
  };

  const removeColor = (colorToRemove: string) => {
    setProductData({
      ...productData,
      colors: productData.colors.filter((color) => color !== colorToRemove),
      variants: generateVariants(
        productData.colors.filter((color) => color !== colorToRemove),
        productData.sizes
      ),
    });
  };

  const removeSize = (sizeToRemove: string) => {
    setProductData({
      ...productData,
      sizes: productData.sizes.filter((size) => size !== sizeToRemove),
      variants: generateVariants(
        productData.colors,
        productData.sizes.filter((size) => size !== sizeToRemove)
      ),
    });
  };

  const generateVariants = (colors: string[], sizes: string[]): Variant[] => {
    const variants: Variant[] = [];
    colors.forEach((color) => {
      sizes.forEach((size) => {
        variants.push({
          color,
          size,
          quantity: 0,
          price: productData.basePrice,
        });
      });
    });
    return variants;
  };

  const updateVariantQuantity = (color: string, size: string, quantity: string) => {
    setProductData({
      ...productData,
      variants: productData.variants.map((variant) =>
        variant.color === color && variant.size === size
          ? { ...variant, quantity: parseInt(quantity) || 0 }
          : variant
      ),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted product data:', productData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border rounded"
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="outerwear">Outerwear</option>
            </select>
          </div>
        </div>

        {/* Description and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Base Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={productData.basePrice}
              onChange={(e) => setProductData({ ...productData, basePrice: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Image Upload Area */}
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">📷</div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-600">
              Upload Product Images
            </label>
            <input type="file" className="mt-2" accept="image/*" multiple />
          </div>
        </div>

        {/* Colors and Sizes Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colors */}
          <div>
            <label className="block text-sm font-medium mb-2">Colors</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {productData.colors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Add custom color"
              />
              <button
                type="button"
                onClick={() => {
                  if (newColor) {
                    addColor(newColor);
                    setNewColor('');
                  }
                }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {defaultColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => addColor(color)}
                  className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {productData.sizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(size)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 border rounded"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Add custom size"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSize) {
                    addSize(newSize);
                    setNewSize('');
                  }
                }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {defaultSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => addSize(size)}
                  className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Variant Quantities */}
        {productData.variants.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Inventory Quantities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productData.variants.map((variant, index) => (
                <div key={index} className="p-3 border rounded">
                  <div className="text-sm font-medium mb-1">
                    {variant.color} - {variant.size}
                  </div>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={variant.quantity}
                    onChange={(e) =>
                      updateVariantQuantity(variant.color, variant.size, e.target.value)
                    }
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductEntryForm;