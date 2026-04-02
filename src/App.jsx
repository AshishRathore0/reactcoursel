// App.js - UPDATED
import React from 'react';
import ArrowCarousel from './components/ArrowCarousel';
import DragCarousel from './components/DragCarousel';
import FadeCarousel from './components/FadeCarousel';
import Gallery from './components/Gallery';

// IMPORT YOUR IMAGES FIRST
import img1 from './assets/images/pic1.jpg';
import img2 from './assets/images/pic2.jpg';
import img3 from './assets/images/pic3.jpg';
import img4 from './assets/images/pic4.jpg';
import img5 from './assets/images/pic5.jpg';
import img6 from './assets/images/pic6.jpg';
import img7 from './assets/images/pic7.jpg';
import img8 from './assets/images/pic8.jpg';

// Nature + Romantic vibes 🌿💖
const romanticData = [
  {
    id: 1,
    image: img1,
    title: "Whispers of Nature",
    description: "Like the breeze, your love touches my soul softly 🍃"
  },
  {
    id: 2,
    image: img2,
    title: "Sunset Love",
    description: "Every sunset feels more beautiful with you in my thoughts 🌅"
  },
  {
    id: 3,
    image: img3,
    title: "Blooming Hearts",
    description: "Like flowers, my love for you blooms endlessly 🌸"
  },
  {
    id: 4,
    image: img4,
    title: "Ocean of Love",
    description: "My love for you is as deep and endless as the sea 🌊"
  },
  {
    id: 5,
    image: img5,
    title: "Under the Stars",
    description: "With you, even the stars shine brighter ✨"
  },
  {
    id: 6,
    image: img6,
    title: "Mountain Peace",
    description: "In your arms, I find the calm of the mountains ⛰️"
  },
  {
    id: 7,
    image: img7,
    title: "Rainy Love",
    description: "Every raindrop reminds me of your gentle love 🌧️"
  },
  {
    id: 8,
    image: img8,
    title: "Forever Like Nature",
    description: "Just like nature, my love for you will never fade 🌿💞"
  }
];


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Professional Header */}
        <header className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-100">
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Nature Gallery Showcase 🌿
            </h1>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A modern and interactive gallery built using React, showcasing the beauty of nature 
              through smooth animations and engaging UI components.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm shadow">
                🌿 Nature Inspired
              </span>
              <span className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm shadow">
                ⚡ Smooth Animations
              </span>
              <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm shadow">
                🎯 Clean UI Design
              </span>
            </div>

          </div>
        </header>

        <div className="space-y-16">
          
          {/* 1. Arrow Carousel */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-green-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-green-700 mb-2">
                🌄 Featured Landscapes
              </h2>
              <p className="text-gray-600 text-lg">
                Explore breathtaking natural views through an interactive arrow-based carousel.
              </p>
            </div>
            <ArrowCarousel items={romanticData} />
          </section>

          {/* 2. Drag Carousel */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-teal-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-teal-700 mb-2">
                🖱️ Drag Interaction Gallery
              </h2>
              <p className="text-gray-600 text-lg">
                Swipe or drag to navigate through high-quality nature visuals.
              </p>
            </div>
            <DragCarousel items={romanticData} />
          </section>

          {/* 3. Fade Carousel */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-emerald-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-emerald-700 mb-2">
                🌅 Smooth Fade Transitions
              </h2>
              <p className="text-gray-600 text-lg">
                Experience seamless transitions between stunning nature moments.
              </p>
            </div>
            <FadeCarousel items={romanticData} />
          </section>

          {/* 4. Image Gallery */}
          <section className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-green-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-green-600 mb-2">
                🖼️ Nature Image Gallery
              </h2>
              <p className="text-gray-600 text-lg">
                Click on images to preview them in full size with a responsive layout.
              </p>
            </div>
            <Gallery items={romanticData} />
          </section>

        </div>

        {/* Professional Footer */}
        <footer className="text-center mt-16 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100">
          <p className="text-gray-700 text-lg">
            Built using React.js with reusable components, smooth animations, and responsive design principles.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full">
              ⚛️ React.js
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full">
              🎨 Tailwind CSS
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full">
              📱 Responsive UI
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;