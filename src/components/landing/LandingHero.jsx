import { ArrowRight, Sparkles, Zap, Brain, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../common/Button';

const LandingHero = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">

                    {/* Left Content Section */}
                    <div className="space-y-5 text-center lg:text-left">
                      

                        <div>
                            <h3 className="text-3xl sm:text-6xl lg:text-5xl text-nowrap font-bold text-gray-800 leading-tight">
                                A Unified AI Products
                            </h3>
                            <h3 className='text-3xl sm:text-6xl lg:text-5xl font-light text-gray-500'>
                                Development Company
                            </h3>
                        </div>

                      <div className='space-y-10'>
                          <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 tracking-wide">
                            Webkype is a product IP–driven AI company that helps businesses, institutions, and digital platforms replace manual workflows, fragmented software, and reactive decision-making with a unified, intelligent AI operating layer.
                        </p>

                        <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 tracking-wide">
                            We engineer AI-native ecosystems that think, learn, and execute across your organization—at scale.
                        </p>
                      </div>

                      <button className=' py-3 '>
                        <Button onClick={() => navigate('/auth')} size="lg" className="flex items-center gap-2">
                            Know About Us
                            <ArrowRight size={20} />
                        </Button>
                      </button>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative">
                        {/* Main Image Container - Glass Surface */}
                        <div className="rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-200/80 shadow-2xl shadow-purple-500/10 ">
                            <div className="bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-xl overflow-hidden">
                                <img
                                    src="https://www.caasaa.com/assets/images/A-Unified-AI-Products.webp"
                                    alt="AI Chatbot Dashboard Preview"
                                    className="w-full h-80 sm:h-96 lg:h-[350px] object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Card - Top Right */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl flex items-center justify-center hidden lg:flex">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles size={24} className="text-white" />
                            </div>
                        </div>

                        {/* Floating Card - Bottom Left */}
                        

                        {/* Decorative gradient orbs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-2xl hidden lg:block"></div>
                        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full blur-2xl hidden lg:block"></div>
                    </div>

                </div>
            </div>

            {/* ========================================
          FLOATING SECTION - MOVES UP ON SCROLL
      ======================================== */}
            {/* <div
                className="absolute bottom-40 left-1/2 -translate-x-1/2 translate-y-1/2 z-20"
                style={{
                    transform: `translate(-50%, calc(50% - ${scrollY * 0.3}px))`,
                }}
            >
                <div className='flex items-center gap-4 px-12 py-12  backdrop-blur-xl rounded-lg border border-gray-200 '>
                    <div className="flex items-center gap-4 px-5 py-5 bg-white/40 backdrop-blur-xl rounded-full border border-gray-200 ">
                        <img
                            src="https://www.caasaa.com/assets/images/caasaa-favicon.png"
                            alt="AI Chatbot Dashboard Preview"
                            className="w-full h-80 sm:h-32 object-cover"
                        />
                    </div>
                </div>
            </div> */}

        </section>
    );
};

export default LandingHero;