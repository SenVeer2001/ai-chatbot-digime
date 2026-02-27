const LandingFooter = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; 2026 AI Chatbot. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
