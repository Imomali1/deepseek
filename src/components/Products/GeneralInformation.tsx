import React, { useState } from "react";

interface SizeOption {
  label: string;
  value: string;
}

interface GenderOption {
  label: string;
  value: string;
}

const GeneralInformation = () => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  const sizes: SizeOption[] = [
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
  ];

  const genders: GenderOption[] = [
    { label: "Men", value: "men" },
    { label: "Woman", value: "woman" },
    { label: "Unisex", value: "unisex" },
  ];

  return (
    <>
      {/* General Information */}
      <div className="p-4 bg-gray-100 rounded-2xl">
        <p className="text-2xl font-bold mb-4">General Information</p>
        <label className="block text-base font-medium mb-2">Name Product</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-xl bg-white"
          placeholder="Puffer Jacket"
        />

        <label className="block text-base font-medium mt-4 mb-2">
          Description Product
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-xl bg-white"
          rows={7}
          placeholder="Description of the product"
        ></textarea>

        <div className="flex gap-8">
          <div className="w-1/2">
            <div className="text-base font-semibold mb-1">Size</div>
            <div className="text-xs text-gray-400 mb-2">
              Pick Available Size
            </div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`
                px-4 py-2 rounded text-sm min-w-[40px]
                ${
                  selectedSize === size.value
                    ? "bg-green-300 text-black"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }
              `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/2">
            <div className="text-base font-semibold mb-1">Gender</div>
            <div className="text-xs text-gray-400 mb-2">
              Pick Available Gender
            </div>
            <div className="flex gap-2">
              {genders.map((gender) => (
                <button
                  key={gender.value}
                  onClick={() => setSelectedGender(gender.value)}
                  className={`
                flex items-center gap-2 py-2 pl-0 pr-4 rounded text-sm
                ${
                  selectedGender === gender.value
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }
              `}
                >
                  <div
                    className={`
                w-4 h-4 rounded-full border-2
                ${
                  selectedGender === gender.value
                    ? "border-green-400 bg-green-400"
                    : "border-gray-600"
                }
              `}
                  >
                    {selectedGender === gender.value && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  {gender.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
