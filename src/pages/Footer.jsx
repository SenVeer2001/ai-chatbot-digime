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
                    A Unified AI Products Eco System<br />
                    {/* <span className="text-slate-400">Human-Like Experience.</span> */}
                </h2>

                {/* Navigation & Copyright */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm font-medium text-slate-300">
                    <nav className="flex gap-6">
                        <a href="/aicha" className="hover:text-cyan-400 transition-colors">AICha</a>
                        <a href="/congen" className="hover:text-cyan-400 transition-colors">ConGen</a>
                        <a href="/digime" className="hover:text-cyan-400 transition-colors">DigiMee</a>
                        <a href="https://caasaa.com/aidas.html" className="hover:text-cyan-400 transition-colors">AIDas </a>
                        <a href="https://rightstepflooring-tau.vercel.app/" className="hover:text-cyan-400 transition-colors">AICA-CRM</a>
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