// App.js
import React from 'react';
import ArrowCarousel from './components/ArrowCarousel';
import DragCarousel from './components/DragCarousel';
import FadeCarousel from './components/FadeCarousel';

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop",
    title: "Luxury Sports Car",
    description: "High-performance vehicle with sleek design"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
    title: "Electric SUV",
    description: "Eco-friendly and spacious family vehicle"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=500&fit=crop",
    title: "Classic Convertible",
    description: "Timeless design with modern features"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop",
    title: "Modern Sedan",
    description: "Efficient and comfortable daily driver"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&h=500&fit=crop",
    title: "Adventure Off-roader",
    description: "Built for rugged terrain and exploration"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            React Carousel Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three unique carousel components built with pure React and Tailwind CSS
          </p>
        </header>

        <div className="space-y-20">
          
          {/* 1. Arrow Navigation Carousel */}
          <section className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                1. Arrow Navigation Carousel
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Features: Previous/Next arrows, pagination dots, and smooth sliding transitions
              </p>
            </div>
            <ArrowCarousel items={carouselData} />
          </section>

          {/* 2. Drag & Swipe Carousel */}
          <section className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                2. Drag & Swipe Carousel
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Features: Mouse drag and touch swipe interactions with momentum scrolling
              </p>
            </div>
            <DragCarousel items={carouselData} />
          </section>

          {/* 3. Fade Transition Carousel */}
          <section className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                3. Fade Transition Carousel
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Features: Auto-play, fade transitions, thumbnail navigation, and manual controls
              </p>
            </div>
            <FadeCarousel items={carouselData} />
          </section>

        </div>

        {/* Footer */}
        <footer className="text-center mt-20 text-gray-500">
          <p>Built with React & Tailwind CSS - No external libraries used</p>
        </footer>

      </div>
    </div>
  );
}

export default App;