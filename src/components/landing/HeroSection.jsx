import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Outer container
    <section className="relative w-full overflow-hidden font-sans flex flex-col items-center justify-center pt-10 pb-20 md:py-24 bg-[#fafbfc]">
      
      {/* Subtle Purple Background Glow */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-300/30 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-center min-h-[600px]">
        
        {/* --- ROBOT IMAGE --- */}
        {/* Mobile: Absolute top-left, smaller. Desktop: Absolute left, larger. */}
        {/* Parallax: Moves X (left) and Y (up) when scrolling */}
        <div 
          className="absolute top-0 left-4 md:top-auto md:bottom-auto md:left-[2%] z-20 will-change-transform"
          style={{ 
            transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.2}px)` 
          }}
        >
          <img 
            src="https://www.caasaa.com/assets/images/robot-2.png" 
            alt="AI Robot" 
            className="w-24 md:w-48 lg:w-72 drop-shadow-2xl transition-all duration-300"
          />
        </div>

        {/* --- TEXT CONTENT --- */}
        {/* Added margins to prevent text from overlapping the images on mobile */}
        <div className="relative z-10 w-full md:max-w-3xl md:ml-auto md:mr-24 lg:mr-40 mt-24 md:mt-0 mb-24 md:mb-0 text-center md:text-left">
          
          <p className="text-[#6d28d9] text-xs md:text-sm font-bold tracking-[0.15em] mb-4 uppercase flex items-center justify-center md:justify-start">
            <span className="mr-1 text-gray-400">┌</span> 
            CAASAA PRODUCTS 
            <span className="ml-1 text-gray-400">┘</span>
          </p>
          
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-gray-900 leading-[1.2] mb-6">
            <span className="font-extrabold text-black">AICHA™</span>, Conversational<br className="hidden md:block"/>
            AI Chatbots & Agents
          </h1>
          
          <p className="text-[#4b5563] text-sm md:text-base leading-relaxed mb-6 px-2 md:px-0">
            AICHA™, Unlike traditional chatbots, AICHA understands intent, context, and
            sentiment, connects directly with enterprise systems, and executes tasks and
            workflows—not just replies. It enables human-like, multilingual interactions
            across chat, voice, messaging, and digital interfaces.
          </p>
          
          <p className="text-[#4b5563] text-sm md:text-base leading-relaxed mb-8 px-2 md:px-0">
            AICHA acts as a digital workforce layer, enabling organisations to move from
            reactive support to proactive, intelligent engagement.
          </p>
          
          <div className="flex justify-center md:justify-start">
            <button className="bg-[#1849D6] hover:bg-blue-800 text-white font-medium py-3 px-7 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30">
              Customize & Integrate <span className="text-lg leading-none">&rarr;</span>
            </button>
          </div>
        </div>

        {/* --- ARROW IMAGE --- */}
        {/* Mobile: Absolute bottom-right. Desktop: Absolute right. */}
        {/* Parallax: Moves X (left/diagonal) and Y (up) faster */}
        <div 
          className="absolute bottom-0 right-4 md:bottom-[-40px] md:right-[5%] lg:right-[15%] z-20 will-change-transform"
          style={{ 
            transform: `translate(${scrollY * -0.3}px, ${scrollY * -0.6}px)` 
          }}
        >
          <img 
            src="https://www.caasaa.com/assets/images/curser.png" 
            alt="3D Cursor Arrow" 
            className="w-20 md:w-32 lg:w-48 drop-shadow-2xl transition-all duration-300"
          />
        </div>

      </div>
      
      {/* Invisible spacer to allow scrolling for testing */}
      <div className="hidden md:block absolute top-[100vh] h-[50vh] w-full pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;