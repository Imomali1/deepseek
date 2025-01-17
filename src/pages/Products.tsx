import { FaArrowRight } from "react-icons/fa";
import { BsShop } from "react-icons/bs";

function Products() {
  return (
    <div className="bg-white min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="px-4 py-2 rounded-lg flex items-center">
            <BsShop className="w-6 h-6 mr-4"/>
            <span className="text-2xl text-gray-700">Add New Product</span>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
            <FaArrowRight className="mr-2" /> {/* Icon */}
            <span>Add Product</span> {/* Text */}
          </button>
        </div>

        {/* Form Section */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Information */}
          <div className="p-4 bg-gray-light rounded">
            <label className="block text-sm font-medium mb-2">
              Name Product
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-medium rounded"
              placeholder="Puffer Jacket"
            />

            <label className="block text-sm font-medium mt-4 mb-2">
              Description Product
            </label>
            <textarea
              className="w-full p-2 border border-gray-medium rounded"
              rows="4"
              placeholder="Description of the product"
            ></textarea>
          </div>

          {/* Pricing Section */}
          <div className="p-4 bg-gray-light rounded">
            <label className="block text-sm font-medium mb-2">
              Base Pricing
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-medium rounded"
              placeholder="$47.55"
            />

            <label className="block text-sm font-medium mt-4 mb-2">
              Discount
            </label>
            <select className="w-full p-2 border border-gray-medium rounded">
              <option>Chinese New Year Discount</option>
              <option>Seasonal Discount</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="p-4 bg-gray-light rounded">
            <label className="block text-sm font-medium mb-2">
              Upload Image
            </label>
            <div className="bg-green-pastel h-48 flex items-center justify-center rounded">
              <p>Image Preview</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Products;
