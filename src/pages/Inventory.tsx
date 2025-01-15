import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  image?: string; // Add image URL to the product interface
}

const Inventory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 0,
    name: "",
    categoryId: 0,
    price: 0,
    stock: 0,
    image: "", // Initialize image as empty
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the uploaded image file

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const category: Category = {
      id: categories.length + 1,
      name: newCategory,
    };
    setCategories([...categories, category]);
    setNewCategory("");
  };

  // Delete a category
  const deleteCategory = (id: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
  };

  // Open modal for adding/editing a product
  const openProductModal = (product: Product | null) => {
    if (product) {
      setCurrentProduct(product); // Edit existing product
    } else {
      setCurrentProduct({ id: 0, name: "", categoryId: 0, price: 0, stock: 0, image: "" }); // Add new product
    }
    setImageFile(null); // Reset image file when opening the modal
    setIsProductModalOpen(true);
  };

  // Close modal
  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setCurrentProduct({ id: 0, name: "", categoryId: 0, price: 0, stock: 0, image: "" });
    setImageFile(null); // Reset image file when closing the modal
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentProduct((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save product
  const saveProduct = () => {
    if (
      currentProduct.name.trim() === "" ||
      currentProduct.categoryId === 0 ||
      currentProduct.price <= 0 ||
      currentProduct.stock < 0
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (currentProduct.id === 0) {
      // Add new product
      const newProduct: Product = {
        ...currentProduct,
        id: products.length + 1,
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      const updatedProducts = products.map((prod) =>
        prod.id === currentProduct.id ? currentProduct : prod
      );
      setProducts(updatedProducts);
    }

    closeProductModal();
  };

  // Delete a product
  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((prod) => prod.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {/* Category Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border">
                <td className="p-2 border">{cat.id}</td>
                <td className="p-2 border">{cat.name}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <button
          onClick={() => openProductModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
        >
          Add Product
        </button>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border">
                <td className="p-2 border">{prod.id}</td>
                <td className="p-2 border">{prod.name}</td>
                <td className="p-2 border">
                  {categories.find((cat) => cat.id === prod.categoryId)?.name}
                </td>
                <td className="p-2 border">${prod.price.toFixed(2)}</td>
                <td className="p-2 border">{prod.stock}</td>
                <td className="p-2 border">
                  {prod.image && (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => openProductModal(prod)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {currentProduct.id === 0 ? "Add Product" : "Edit Product"}
            </h2>
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={currentProduct.categoryId}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      categoryId: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value={0}>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={currentProduct.stock}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      stock: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-lg"
                />
                {currentProduct.image && (
                  <div className="mt-2">
                    <img
                      src={currentProduct.image}
                      alt="Product Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeProductModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;