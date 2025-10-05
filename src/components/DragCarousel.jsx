// components/DragCarousel.js
import React, { useState, useRef, useCallback, useEffect } from 'react';

const DragCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!currentX) return;

    const diff = currentX - startX;
    setTranslateX(diff);
  }, [isDragging, startX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    const threshold = carouselRef.current.offsetWidth * 0.15;
    
    if (translateX < -threshold) {
      // Swipe left - next
      setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    } else if (translateX > threshold) {
      // Swipe right - previous
      setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    }
    
    setIsDragging(false);
    setTranslateX(0);
  }, [isDragging, translateX, items.length]);

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

  return (
    <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      <div 
        ref={carouselRef}
        className="relative h-80 md:h-[500px] lg:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div 
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ 
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
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
          <span className="font-medium">Slide {currentIndex + 1} of {items.length}</span>
          <span className="text-sm opacity-75">{Math.round(((currentIndex + 1) / items.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DragCarousel;