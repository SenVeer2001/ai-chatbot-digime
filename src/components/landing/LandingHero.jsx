// components/landing/LandingHero.jsx
import { ArrowRight, Sparkles, Zap, Brain, Cpu, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const LandingHero = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
            isDarkMode ? 'bg-transparent' : 'bg-transparent'
        }`}>
            
            {/* Dark Mode Background Effects */}
            {isDarkMode && (
                <>
                    {/* Gradient Orbs for Dark Mode */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl"></div>
                </>
            )}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">

                    {/* Left Content Section */}
                    <div className="space-y-5 text-center lg:text-left">

                        <div>
                            <h3 className={`text-3xl sm:text-6xl lg:text-5xl text-nowrap font-bold leading-tight transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                                A Unified AI Products
                            </h3>
                            <h3 className={`text-3xl sm:text-6xl lg:text-5xl font-light transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                                Development Company
                            </h3>
                        </div>

                        <div className='space-y-10'>
                            <p className={`text-xl max-w-xl mx-auto lg:mx-0 tracking-wide transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                Webkype is a product IP–driven AI company that helps businesses, institutions, and digital platforms replace manual workflows, fragmented software, and reactive decision-making with a unified, intelligent AI operating layer.
                            </p>

                            <p className={`text-xl max-w-xl mx-auto lg:mx-0 tracking-wide transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                We engineer AI-native ecosystems that think, learn, and execute across your organization—at scale.
                            </p>
                        </div>

                        <button className='py-3'>
                            <Button 
                                onClick={() => navigate('/auth')} 
                                size="lg" 
                                className={`flex items-center gap-2 ${
                                    isDarkMode ? 'shadow-lg shadow-purple-500/25' : ''
                                }`}
                            >
                                Know About Us
                                <ArrowRight size={20} />
                            </Button>
                        </button>
                    </div>

                    {/* Right Image Section */}
                    <div className="relative">
                        {/* Main Image Container - Glass Surface */}
                        <div className={`rounded-2xl overflow-hidden backdrop-blur-xl border shadow-2xl transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gray-800/60 border-gray-700/80 shadow-purple-500/20' 
                                : 'bg-white/60 border-gray-200/80 shadow-purple-500/10'
                        }`}>
                            <div className={`backdrop-blur-sm rounded-xl overflow-hidden ${
                                isDarkMode 
                                    ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30' 
                                    : 'bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80'
                            }`}>
                                <img
                                    src="https://www.caasaa.com/assets/images/A-Unified-AI-Products.webp"
                                    alt="AI Chatbot Dashboard Preview"
                                    className="w-full h-80 sm:h-96 lg:h-[350px] object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Card - Top Right */}
                        <div className={`absolute -top-6 -right-6 w-24 h-24 backdrop-blur-xl rounded-2xl border shadow-xl flex items-center justify-center hidden lg:flex transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gray-800/70 border-gray-700' 
                                : 'bg-white/70 border-gray-200'
                        }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles size={24} className="text-white" />
                            </div>
                        </div>

                        {/* Floating Card - Bottom Left (Optional) */}
                        <div className={`absolute -bottom-4 -left-4 w-20 h-20 backdrop-blur-xl rounded-2xl border shadow-xl flex items-center justify-center hidden lg:flex transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gray-800/70 border-gray-700' 
                                : 'bg-white/70 border-gray-200'
                        }`}>
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Zap size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Decorative gradient orbs */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl hidden lg:block transition-colors duration-300 ${
                            isDarkMode 
                                ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30' 
                                : 'bg-gradient-to-br from-pink-300/40 to-purple-300/40'
                        }`}></div>
                        <div className={`absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl hidden lg:block transition-colors duration-300 ${
                            isDarkMode 
                                ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30' 
                                : 'bg-gradient-to-br from-blue-300/40 to-cyan-300/40'
                        }`}></div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default LandingHero;