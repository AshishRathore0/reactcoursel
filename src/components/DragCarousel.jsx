



// components/DragCarousel.js
import React, { useState, useRef, useCallback, useEffect } from 'react';

const DragCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from 1 for clones
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Create cloned slides for infinite effect
  const clonedItems = [
    { ...items[items.length - 1], id: 'clone-last' },
    ...items,
    { ...items[0], id: 'clone-first' }
  ];

  const totalSlides = clonedItems.length;
  const realSlidesCount = items.length;

  const handleDragStart = (e) => {
    if (isTransitioning) return;
    
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = useCallback((e) => {
    if (!isDragging || isTransitioning) return;
    
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!currentX) return;

    const diff = currentX - startX;
    setTranslateX(diff);
  }, [isDragging, startX, isTransitioning]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || isTransitioning) return;

    const threshold = carouselRef.current.offsetWidth * 0.15;
    let newIndex = currentIndex;
    
    if (translateX < -threshold) {
      // Swipe left - next
      newIndex = currentIndex + 1;
    } else if (translateX > threshold) {
      // Swipe right - previous
      newIndex = currentIndex - 1;
    }
    
    if (newIndex !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
    }
    
    setIsDragging(false);
    setTranslateX(0);
  }, [isDragging, translateX, currentIndex, isTransitioning]);

  // Handle transition end to jump between clones and real slides
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // If we're on the clone of last slide (index 0), jump to real last slide
      if (currentIndex === 0) {
        setIsTransitioning(true);
        setCurrentIndex(realSlidesCount);
      }
      // If we're on the clone of first slide (last index), jump to real first slide
      else if (currentIndex === totalSlides - 1) {
        setIsTransitioning(true);
        setCurrentIndex(1);
      } else {
        setIsTransitioning(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, realSlidesCount, totalSlides]);

  // Initialize carousel position
  useEffect(() => {
    setCurrentIndex(1);
  }, []);

  // Event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleTouchMove = (e) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    const dragTransform = (translateX / carouselRef.current?.offsetWidth) * 100;
    return `translateX(calc(${baseTransform}% + ${dragTransform}px))`;
  };

  // Calculate real slide index for display
  const getDisplayIndex = () => {
    if (currentIndex === 0) return realSlidesCount - 1; // On clone of last
    if (currentIndex === totalSlides - 1) return 0; // On clone of first
    return currentIndex - 1; // Adjust for clone at beginning
  };

  const displayIndex = getDisplayIndex();

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      <div 
        ref={carouselRef}
        className={`relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden select-none ${
          isTransitioning ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
        }`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div 
          className="flex h-full"
          style={{ 
            transform: getTransform(),
            transition: (isDragging || isTransitioning) ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {clonedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-full flex-shrink-0 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-2xl md:text-4xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-sm opacity-75">
                    <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      ← Drag or swipe to navigate →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between text-white mb-3">
          <span className="font-medium">Slide {displayIndex + 1} of {items.length}</span>
          <span className="text-sm opacity-75">{Math.round(((displayIndex + 1) / items.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((displayIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-white ${
              index === displayIndex 
                ? 'bg-white scale-125' 
                : 'bg-transparent hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DragCarousel;




