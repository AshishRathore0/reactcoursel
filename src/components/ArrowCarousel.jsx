



// components/ArrowCarousel.js
import React, { useState, useCallback, useEffect } from 'react';

const ArrowCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 500);
  }, [items.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  }, [items.length, isTransitioning]);

  const goToSlide = (index) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="relative max-w-6xl mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Carousel Container */}
      <div className="relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              {/* Image container with proper sizing */}
              <div className="w-full h-full flex items-center justify-center bg-black/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{ 
                    width: 'auto', 
                    height: 'auto', 
                    maxWidth: '90%', 
                    maxHeight: '90%' 
                  }}
                />
              </div>
              
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 md:p-8 text-white w-full text-center">
                  <h3 className="text-2xl md:text-4xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-pink-200 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-pink-200 disabled:opacity-50"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-transparent hover:bg-white/50'
            } ${isTransitioning ? 'opacity-50' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Heart Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center">
        <span className="mr-1">💖</span>
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
};

export default ArrowCarousel;