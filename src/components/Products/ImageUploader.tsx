import React, { useState } from "react";
import { Plus } from "lucide-react";

const ImageUploader = () => {
  const [images, setImages] = useState<File[]>([]); // Store uploaded images
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Store the selected image

  // Handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files); // Convert FileList to array
      setImages((prevImages) => [...prevImages, ...newImages]); // Add new images to the list
      if (!selectedImage) {
        setSelectedImage(newImages[0]); // Automatically select the first uploaded image
      }
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (image: File) => {
    setSelectedImage(image);
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index); // Remove the image at the specified index
    setImages(newImages);

    // If the removed image was the selected one, clear the selected image
    if (selectedImage === images[index]) {
      setSelectedImage(newImages.length > 0 ? newImages[0] : null);
    }
  };

  return (
    <>
      {/* Image Upload */}
      <div className="p-4 bg-gray-100 rounded-2xl">
        <p className="text-2xl font-bold mb-4">Upload Images</p>
        {/* Larger Image Preview */}
        {selectedImage && (
          <div className="m-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-64 h-64 max-w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Thumbnails and File Input Button */}
        <div className="flex gap-2 mb-4">
          {/* Thumbnails */}
          {images.map((image, index) => (
            <div key={index} className="relative cursor-pointer flex-shrink-0">
              {/* Thumbnail Image */}
              <div
                onClick={() => handleThumbnailClick(image)}
                className={`w-20 h-20 border-2 ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-300"
                } rounded-lg overflow-hidden`}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 hover:bg-red-600 transition-colors duration-200"
              >
                ×
              </button>
            </div>
          ))}

          {/* File Input Button */}
          <label
            className="
          flex items-center justify-center w-40 h-40 
          border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
           hover:border-gray-500 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Plus size={20} color="white" />
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
