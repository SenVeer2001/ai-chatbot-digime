import { Bot } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-[#0c1732] text-white py-12 px-6 relative flex-shrink-0">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Logo Section */}
                <div className="flex items-center gap-2 mb-6">

                    <img src="./webkype-logo11.png" alt="" className='w-[200px] h-30' />
                </div>

                {/* Tagline */}
                <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight leading-tight max-w-2xl opacity-90">
                    AI-Powered Conversations.<br />
                    <span className="text-slate-400">Human-Like Experience.</span>
                </h2>

                {/* Navigation & Copyright */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm font-medium text-slate-300">
                    <nav className="flex gap-6">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                    </nav>

                    <span className="hidden md:inline text-slate-600">|</span>

                    <p className="text-slate-400">
                        © 2026 Webkype. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Back to Top Button */}

        </footer>
    )
}

export default Footer