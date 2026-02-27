import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { Check } from 'lucide-react';

const PricingCard = ({ tier, features }) => (
  <div className="relative group rounded-3xl overflow-hidden border border-white/40 dark:border-white/20 bg-gradient-to-br from-white/40 via-white/30 to-white/20 dark:from-gray-900/50 dark:via-gray-900/40 dark:to-gray-900/30 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-white/60 dark:hover:border-white/40">
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative p-8 sm:p-10">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-8">Pricing coming soon</p>

      <div className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <Check size={20} className="text-blue-500 dark:text-blue-300 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>

      <Button variant="outline" size="md" className="w-full">
        Get Started
      </Button>
    </div>
  </div>
);

const LandingPricing = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: 'Starter',
      features: ['Up to 5 chatbots', 'Basic training', 'Community support']
    },
    {
      name: 'Pro',
      features: ['Unlimited chatbots', 'Advanced training', 'Priority support', 'Custom integrations']
    },
    {
      name: 'Enterprise',
      features: ['Custom solutions', 'Dedicated support', 'SLA guarantee', 'White-label options']
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-pink-50/40 via-purple-50/40 to-blue-50/40 dark:from-gray-950 dark:via-purple-900/20 dark:to-gray-950 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-300/20 to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {tiers.map((tier, index) => (
            <PricingCard
              key={index}
              tier={tier.name}
              features={tier.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
