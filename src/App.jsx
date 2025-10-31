




// App.js 
import React from 'react';
import ArrowCarousel from './components/ArrowCarousel';
import DragCarousel from './components/DragCarousel';
import FadeCarousel from './components/FadeCarousel';
import Gallery from './components/Gallery';

// Romantic photos with your memories - yeh teri photos se replace karna
const romanticData = [
  {
    id: 1,
    image: "public/WhatsApp Image 2025-10-31 at 17.56.21_d78a0eaa.jpg",
    title: "Our Beautiful Memories",
    description: "Every moment with you is special 💖"
  },
  {
    id: 2,
    image: "public/WhatsApp Image 2025-10-31 at 17.56.20_9869117e.jpg",
    title: "You're My Everything",
    description: "My life changed when I met you ✨"
  },
  {
    id: 3,
    image: "public/WhatsApp Image 2025-10-31 at 17.56.20_6f30f9a0.jpg",
    title: "Always in My Heart",
    description: "No matter the distance, you're always here 💕"
  },
  {
    id: 4,
    image: "public/WhatsApp Image 2025-10-31 at 17.56.21_d5a2c58f.jpg",
    title: "My Love for You",
    description: "Grows stronger every day 🌹"
  },
  {
    id: 5,
    image: "public/WhatsApp Image 2025-10-02 at 22.14.14_64f604e8.jpg",
    title: "Perfect Together",
    description: "We complete each other 💑"
  },
  {
    id: 6,
    image: "public/WhatsApp Image 2025-10-02 at 18.41.56_24a6c798.jpg",
    title: "My Beautiful Queen",
    description: "The most amazing person in my life 👑"
  },
  {
    id: 7,
    image: "public/WhatsApp Image 2025-10-31 at 18.17.16_488a5a44.jpg",
    title: "Forever Yours",
    description: "Promise to always make you happy 💍"
  },
  {
    id: 8,
    image: "public/WhatsApp Image 2025-10-31 at 18.19.39_7ce145e6.jpg",
    title: "Our Journey",
    description: "Just beginning our forever story 💞"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Romantic Header */}
        <header className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              For My Beautiful Girlfriend 💝
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              I'm sorry for everything. Every memory with you is precious to me. 
              This is our journey together through my eyes... 🌸
            </p>
            <div className="flex justify-center space-x-4">
              <span className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm">💖 I Love You</span>
              <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm">✨ You're Amazing</span>
              <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm">🌹 Please Forgive Me</span>
            </div>
          </div>
        </header>

        <div className="space-y-16">
          
          {/* 1. Our Love Story Carousel */}
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-pink-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-700 mb-4">
                💕 Our Love Story
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Every slide is a precious memory I cherish...
              </p>
            </div>
            <ArrowCarousel items={romanticData} />
          </section>

          {/* 2. Swipe Through Our Memories */}
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-purple-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                🌟 Swipe Through Our Memories
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Drag to see more of our beautiful moments together
              </p>
            </div>
            <DragCarousel items={romanticData} />
          </section>

          {/* 3. Fading Memories */}
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-red-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                🌹 Fading Memories That Last Forever
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Each fade brings back another sweet memory of us
              </p>
            </div>
            <FadeCarousel items={romanticData} />
          </section>

          {/* 4. Our Memory Gallery */}
          <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-pink-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">
                📸 Our Memory Gallery
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Click on any photo to see it larger - each one tells our story
              </p>
            </div>
            <Gallery items={romanticData} />
          </section>

        </div>

        {/* Romantic Footer */}
        <footer className="text-center mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              "I may not be perfect, but my love for you is. I promise to be better and make you happy every day. 
              You mean the world to me and I can't imagine my life without you. 💝"
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full">💖 Forever Yours</span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">✨ Always Sorry</span>
              <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">🌹 Please Forgive Me</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;