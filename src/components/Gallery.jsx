
// // components/Gallery.jsx - DEBUG VERSION
// import React, { useState } from 'react';

// const Gallery = ({ items }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Image open karein modal mein
//   const openImage = (image, index) => {
//     setSelectedImage(image);
//     setCurrentIndex(index);
//   };

//   // Modal band karein
//   const closeImage = () => {
//     setSelectedImage(null);
//   };

//   // Next image
//   const nextImage = () => {
//     const nextIndex = (currentIndex + 1) % items.length;
//     setSelectedImage(items[nextIndex].image);
//     setCurrentIndex(nextIndex);
//   };

//   // Previous image  
//   const prevImage = () => {
//     const prevIndex = (currentIndex - 1 + items.length) % items.length;
//     setSelectedImage(items[prevIndex].image);
//     setCurrentIndex(prevIndex);
//   };

//   // Keyboard controls
//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') closeImage();
//     if (e.key === 'ArrowRight') nextImage();
//     if (e.key === 'ArrowLeft') prevImage();
//   };

//   console.log('Gallery items:', items); // Debug

//   return (
//     <div className="max-w-7xl mx-auto">
      
//       {/* Gallery Grid - SIMPLE VERSION */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//         {items.map((item, index) => (
//           <div 
//             key={item.id} 
//             className="relative cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg"
//             onClick={() => openImage(item.image, index)}
//           >
//             {/* SIMPLE IMAGE TAG - NO COMPLEX STYLING */}
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover"
//               onError={(e) => {
//                 console.error('Image failed to load:', item.image);
//                 e.target.style.backgroundColor = '#ef4444';
//                 e.target.style.display = 'flex';
//                 e.target.style.alignItems = 'center';
//                 e.target.style.justifyContent = 'center';
//                 e.target.innerHTML = '<div class="text-white font-bold">IMAGE LOAD FAILED</div>';
//               }}
//               onLoad={() => {
//                 console.log('Image loaded successfully:', item.image);
//               }}
//             />
            
//             {/* Title */}
//             <div className="p-3 bg-white">
//               <h3 className="font-semibold text-gray-800 text-sm">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
//           onClick={closeImage}
//           onKeyDown={handleKeyDown}
//           tabIndex={0}
//         >
//           <div 
//             className="relative max-w-4xl max-h-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={closeImage}
//               className="absolute -top-4 -right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl z-10 hover:scale-110 transition-transform duration-200"
//             >
//               ✕
//             </button>

//             {/* Main Image */}
//             <img
//               src={selectedImage}
//               alt="Enlarged view"
//               className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
//             />

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
//             >
//               ‹
//             </button>

//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
//             >
//               ›
//             </button>

//             {/* Image Counter */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
//               {currentIndex + 1} / {items.length}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;   






// components/Gallery.js
import React, { useState } from 'react';

const Gallery = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const currentIndex = items.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedImage(items[nextIndex]);
  };

  const goToPrev = () => {
    const currentIndex = items.findIndex(item => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedImage(items[prevIndex]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1"
              onClick={() => openModal(item)}
            >
              {/* Image Container */}
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl overflow-hidden shadow-lg border-2 border-white group-hover:border-pink-300 transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-end">
                <div className="p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Heart Badge */}
              <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transform scale-0 group-hover:scale-100 transition-transform duration-300">
                💖
              </div>
            </div>
          ))}
        </div>

        {/* Love Message */}
        <div className="text-center mt-8 p-6 bg-white/80 rounded-2xl shadow-lg border border-pink-200">
          <p className="text-lg text-gray-700">
            "Each photo holds a special memory of us. Click to relive those moments... 💕"
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-lg bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 transition-colors z-10"
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              ‹
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              ›
            </button>

            {/* Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="max-h-[70vh] flex items-center justify-center p-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              
              {/* Caption */}
              <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-lg opacity-90">{selectedImage.description}</p>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <span>💖 Memory {items.findIndex(item => item.id === selectedImage.id) + 1} of {items.length}</span>
                  <span>Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;