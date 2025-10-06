// // components/Gallery.jsx - UPDATED CODE
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

//   return (
//     <div className="max-w-7xl mx-auto">
      
//       {/* Gallery Grid - BLACK BACKGROUND HATA DIYA */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//         {items.map((item, index) => (
//           <div 
//             key={item.id} 
//             className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-xl overflow-hidden"
//             onClick={() => openImage(item.image, index)}
//           >
//             {/* Image - Clear dikhegi bina click kiye */}
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover"
//             />
            
//             {/* Hover Effect - Sirf hover pe dikhega */}
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
//               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
//                 <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0l3-3m-3 3l-3-3" />
//                 </svg>
//                 <p className="font-semibold text-sm">Click to enlarge</p>
//               </div>
//             </div>

//             {/* Image Title - Always visible */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
//               <h3 className="text-white font-semibold text-sm truncate">
//                 {item.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal - Same as before */}
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

//             {/* Image Info */}
//             <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg max-w-md">
//               <h3 className="font-bold text-lg">{items[currentIndex].title}</h3>
//               <p className="text-sm opacity-90">{items[currentIndex].description}</p>
//             </div>

//             {/* Keyboard Hint */}
//             <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs">
//               ← → arrows to navigate
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;



// components/Gallery.jsx - DEBUG VERSION
import React, { useState } from 'react';

const Gallery = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image open karein modal mein
  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Modal band karein
  const closeImage = () => {
    setSelectedImage(null);
  };

  // Next image
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedImage(items[nextIndex].image);
    setCurrentIndex(nextIndex);
  };

  // Previous image  
  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedImage(items[prevIndex].image);
    setCurrentIndex(prevIndex);
  };

  // Keyboard controls
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  console.log('Gallery items:', items); // Debug

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Gallery Grid - SIMPLE VERSION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="relative cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg"
            onClick={() => openImage(item.image, index)}
          >
            {/* SIMPLE IMAGE TAG - NO COMPLEX STYLING */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover"
              onError={(e) => {
                console.error('Image failed to load:', item.image);
                e.target.style.backgroundColor = '#ef4444';
                e.target.style.display = 'flex';
                e.target.style.alignItems = 'center';
                e.target.style.justifyContent = 'center';
                e.target.innerHTML = '<div class="text-white font-bold">IMAGE LOAD FAILED</div>';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', item.image);
              }}
            />
            
            {/* Title */}
            <div className="p-3 bg-white">
              <h3 className="font-semibold text-gray-800 text-sm">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImage}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute -top-4 -right-4 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl z-10 hover:scale-110 transition-transform duration-200"
            >
              ✕
            </button>

            {/* Main Image */}
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white text-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
            >
              ›
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;