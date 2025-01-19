import { BsShop } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import GeneralInformation from "../components/Products/GeneralInformation";
import ImageUploader from "../components/Products/ImageUploader";

function Products() {
  return (
    <div className="bg-white min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="px-4 py-2 rounded-lg flex items-center">
            <BsShop className="w-6 h-6 mr-4" />
            <span className="text-2xl text-gray-700">Add New Product</span>
          </div>
          <button className="bg-green-300 text-black px-4 py-3 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300">
            <GoCheck className="mr-2" /> {/* Icon */}
            <span>Add Product</span> {/* Text */}
          </button>
        </div>

        {/* Form Section */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GeneralInformation/>

      <ImageUploader/>
          {/* Pricing Section */}
          <div className="p-4 bg-gray-100 rounded">
            <label className="block text-sm font-medium mb-2">
              Base Pricing
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-100 rounded"
              placeholder="$47.55"
            />

            <label className="block text-sm font-medium mt-4 mb-2">
              Discount
            </label>
            <select className="w-full p-2 border border-gray-100 rounded">
              <option>Chinese New Year Discount</option>
              <option>Seasonal Discount</option>
            </select>
          </div>

          
        </form>
      </main>
    </div>
  );
}

export default Products;
