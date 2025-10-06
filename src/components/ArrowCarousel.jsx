// // components/ArrowCarousel.js
// import React, { useState, useCallback } from 'react';

// const ArrowCarousel = ({ items }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === items.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [items.length]);

//   const prevSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? items.length - 1 : prevIndex - 1
//     );
//   }, [items.length]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="relative max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      
//       {/* Carousel Container */}
//       <div className="relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
//         <div 
//           className="flex transition-transform duration-500 ease-in-out h-full"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {items.map((item) => (
//             <div key={item.id} className="w-full flex-shrink-0 relative">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
//                 <div className="p-8 text-white w-full">
//                   <h3 className="text-2xl md:text-4xl font-bold mb-3">
//                     {item.title}
//                   </h3>
//                   <p className="text-lg md:text-xl opacity-90 max-w-2xl">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200"
//         aria-label="Previous slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
      
//       <button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200"
//         aria-label="Next slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Pagination Dots */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//         {items.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
//               index === currentIndex 
//                 ? 'bg-white scale-125' 
//                 : 'bg-transparent hover:bg-white/50'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Slide Counter */}
//       <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
//         {currentIndex + 1} / {items.length}
//       </div>
//     </div>
//   );
// };

// export default ArrowCarousel;



// components/ArrowCarousel.js
import React, { useState, useCallback, useEffect } from 'react';

const ArrowCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideStyle, setSlideStyle] = useState({});

  // Clone slides for infinite effect: [last, first, second, ..., last, first]
  const clonedItems = [
    { ...items[items.length - 1], id: 'clone-last' },
    ...items,
    { ...items[0], id: 'clone-first' }
  ];

  const totalSlides = clonedItems.length;
  const realSlidesCount = items.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex + 1;
    
    setSlideStyle({
      transform: `translateX(-${newIndex * 100}%)`,
      transition: 'transform 500ms ease-in-out'
    });
    
    setCurrentIndex(newIndex);
  }, [currentIndex, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = currentIndex - 1;
    
    setSlideStyle({
      transform: `translateX(-${newIndex * 100}%)`,
      transition: 'transform 500ms ease-in-out'
    });
    
    setCurrentIndex(newIndex);
  }, [currentIndex, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // +1 because we have one cloned slide at beginning
    const newIndex = index + 1;
    
    setSlideStyle({
      transform: `translateX(-${newIndex * 100}%)`,
      transition: 'transform 500ms ease-in-out'
    });
    
    setCurrentIndex(newIndex);
  };

  // Handle transition end to jump between clones and real slides
  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      // If we're on the clone of last slide (index 0), jump to real last slide without animation
      if (currentIndex === 0) {
        setSlideStyle({
          transform: `translateX(-${realSlidesCount * 100}%)`,
          transition: 'none'
        });
        setCurrentIndex(realSlidesCount);
      }
      // If we're on the clone of first slide (last index), jump to real first slide without animation
      else if (currentIndex === totalSlides - 1) {
        setSlideStyle({
          transform: `translateX(-${1 * 100}%)`,
          transition: 'none'
        });
        setCurrentIndex(1);
      }
    };

    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
      carousel.addEventListener('transitionend', handleTransitionEnd);
      return () => carousel.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [currentIndex, realSlidesCount, totalSlides]);

  // Initialize carousel position
  useEffect(() => {
    // Start from first real slide (index 1 because index 0 is clone)
    setSlideStyle({
      transform: `translateX(-${1 * 100}%)`,
      transition: 'none'
    });
    setCurrentIndex(1);
  }, []);

  // Calculate real slide index for display
  const getDisplayIndex = () => {
    if (currentIndex === 0) return realSlidesCount; // On clone of last
    if (currentIndex === totalSlides - 1) return 1; // On clone of first
    if (currentIndex > realSlidesCount) return 1; // Safety check
    return currentIndex;
  };

  const displayIndex = getDisplayIndex() - 1; // -1 because we want 0-based index for display

  return (
    <div className="relative max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Carousel Container */}
      <div className="relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
        <div 
          className="flex h-full carousel-container"
          style={slideStyle}
        >
          {clonedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-full flex-shrink-0 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-2xl md:text-4xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
              index === displayIndex 
                ? 'bg-white scale-125' 
                : 'bg-transparent hover:bg-white/50'
            } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
        {displayIndex + 1} / {items.length}
      </div>
    </div>
  );
};

export default ArrowCarousel;