// components/FadeCarousel.js
import React, { useState, useEffect, useCallback } from 'react';

const FadeCarousel = ({ items, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Carousel Container */}
      <div className="relative h-80 md:h-[500px] lg:h-[600px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
            } ${isTransitioning ? 'transition-opacity duration-500' : ''}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
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

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-6">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="bg-white/90 hover:bg-white disabled:opacity-50 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="bg-white/90 hover:bg-white disabled:opacity-50 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-center space-x-4 overflow-x-auto py-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden border-3 transition-all duration-300 disabled:opacity-50 ${
                index === currentIndex 
                  ? 'border-white scale-110 shadow-2xl' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-black/70 transition-all duration-300 flex items-center space-x-2"
          >
            <span>{isAutoPlaying ? '⏸️' : '▶️'}</span>
            <span>{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Slide Counter */}
          <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
          {isTransitioning ? 'Transitioning...' : 'Fade Effect'}
        </div>
      </div>
    </div>
  );
};

export default FadeCarousel;