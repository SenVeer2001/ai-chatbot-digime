import { Zap, Shield, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group relative p-8 rounded-2xl border border-white/40 dark:border-white/20 bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-gray-900/40 dark:via-gray-900/30 dark:to-gray-900/20 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-white/60 dark:hover:border-white/40">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative">
      <div className="flex items-center gap-3 mb-4 text-blue-500 dark:text-blue-300">
        <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

const LandingFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate, preview, and deploy in minutes with AI-powered setup.'
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Your data is isolated and protected with modern privacy controls.'
    },
    {
      icon: Sparkles,
      title: 'Smart Training',
      description: 'Use prompts, PDFs, and images to train highly accurate chatbots.'
    }
  ];

  return (
    <section id="features" className="relative py-20 bg-gradient-to-b from-blue-50/40 via-purple-50/40 to-pink-50/40 dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 overflow-hidden">
      {/* Subtle animated elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-300/20 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to create, train, and deploy intelligent chatbots
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
