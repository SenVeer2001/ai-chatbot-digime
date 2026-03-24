// pages/CreditPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Crown, Building2, Sparkles } from 'lucide-react';



import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/layout/Header';
import Footer from '../Footer';

const CreditPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: "Free",
            icon: Sparkles,
            price: billingCycle === 'monthly' ? "$0" : "$0",
            period: "/month",
            target: "Starters",
            description: "Perfect for trying out the platform",
            credits: "99",
            sdk: "Creator+ only",
            essenceSelf: "Not included",
            essenceCloud: "Not available",
            features: [
                "99 credits/month",
                "Basic AI features",
                "Community support",
                "1 project"
            ],
            isCurrent: false,
            isPopular: false,
            buttonStyle: "default",
            buttonText: "Get Started Free",
            buttonIcon: "⭐"
        },
        {
            name: "Early Adopter",
            icon: Zap,
            price: billingCycle === 'monthly' ? "$20" : "$17",
            period: "/month",
            target: "Early Adopters",
            description: "Great for individuals and small teams",
            credits: "1,800",
            sdk: "Included",
            essenceSelf: "1,800 min/mo",
            essenceCloud: "900 min/mo",
            features: [
                "1,800 credits/month",
                "All AI features",
                "Priority support",
                "5 projects",
                "API access"
            ],
            isCurrent: true,
            isPopular: false,
            buttonStyle: "current",
            buttonText: "Current Plan",
            buttonIcon: "⚒️"
        },
        {
            name: "Pro",
            icon: Crown,
            price: billingCycle === 'monthly' ? "$99" : "$84",
            period: "/month",
            target: "Power Users",
            description: "For professionals who need more power",
            credits: "10,000",
            sdk: "Included",
            essenceSelf: "10,000 min/mo",
            essenceCloud: "5,000 min/mo",
            features: [
                "10,000 credits/month",
                "Advanced AI features",
                "24/7 Priority support",
                "Unlimited projects",
                "Full API access",
                "Custom integrations"
            ],
            isCurrent: false,
            isPopular: true,
            buttonStyle: "popular",
            buttonText: "Go Pro Now",
            buttonIcon: "🔥"
        },
        {
            name: "Enterprise",
            icon: Building2,
            price: "Custom",
            period: "",
            target: "Large Businesses",
            description: "For organizations with custom needs",
            credits: "Bulk",
            sdk: "Included",
            essenceSelf: "Custom",
            essenceCloud: "Custom",
            features: [
                "Unlimited credits",
                "All features included",
                "Dedicated support",
                "Custom SLA",
                "On-premise deployment",
                "White-label options"
            ],
            isCurrent: false,
            isPopular: false,
            buttonStyle: "enterprise",
            buttonText: "Contact Sales",
            buttonIcon: "📊"
        }
    ];

    const getButtonStyles = (style, isCurrent) => {
        if (isDarkMode) {
            switch (style) {
                case 'current':
                    return 'bg-blue-900/50 text-blue-400 border-2 border-blue-500/50 cursor-default';
                case 'popular':
                    return 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105';
                case 'enterprise':
                    return 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600';
                default:
                    return 'bg-gray-700 text-gray-200 hover:bg-gray-600';
            }
        } else {
            switch (style) {
                case 'current':
                    return 'bg-blue-50 text-blue-600 border-2 border-blue-200 cursor-default';
                case 'popular':
                    return 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105';
                case 'enterprise':
                    return 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200';
                default:
                    return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            }
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-transparent' : 'bg-transparent'
            }`}>
            <Header title="Credits & Pricing" />
            <div className='flex items-center justify-start lg:px-10 mt-5'>
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center px-4 py-2  gap-2 mb-6 rounded-lg text-sm font-medium transition-colors ${isDarkMode
                            ? ' bg-gray-900 text-white'
                            : 'text-gray-600 bg-white'
                        }`}
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-8">

              

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Choose Your{' '}
                        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            Perfect Plan
                        </span>
                    </h1>
                    <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Unlock the full potential of AI with our flexible pricing plans.
                        Scale as you grow.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className={`p-1.5 rounded-2xl flex items-center border transition-colors ${isDarkMode
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-gray-100 border-gray-200'
                        }`}>
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${billingCycle === 'monthly'
                                    ? isDarkMode
                                        ? 'bg-gray-700 text-white shadow-lg'
                                        : 'bg-white text-gray-900 shadow-md'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === 'yearly'
                                    ? isDarkMode
                                        ? 'bg-gray-700 text-white shadow-lg'
                                        : 'bg-white text-gray-900 shadow-md'
                                    : isDarkMode
                                        ? 'text-gray-400 hover:text-gray-300'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Yearly
                            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                Save 15%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={index}
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${plan.isPopular
                                        ? 'ring-2 ring-orange-500 scale-105 z-10'
                                        : ''
                                    } ${plan.isCurrent
                                        ? isDarkMode
                                            ? 'ring-2 ring-blue-500/50'
                                            : 'ring-2 ring-blue-300'
                                        : ''
                                    } ${isDarkMode
                                        ? 'bg-gray-800/70 border border-gray-700 hover:border-gray-600'
                                        : 'bg-white/80 border border-gray-200 hover:border-gray-300 hover:shadow-xl'
                                    }`}
                            >
                                {/* Popular Badge */}
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold text-center py-1.5">
                                        🔥 MOST POPULAR
                                    </div>
                                )}

                                {/* Current Plan Badge */}
                                {plan.isCurrent && (
                                    <div className={`absolute top-0 left-0 right-0 text-xs font-bold text-center py-1.5 ${isDarkMode
                                            ? 'bg-blue-900/50 text-blue-400'
                                            : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        ✓ YOUR CURRENT PLAN
                                    </div>
                                )}

                                <div className={`p-6 ${plan.isPopular || plan.isCurrent ? 'pt-10' : ''}`}>
                                    {/* Plan Icon & Name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plan.isPopular
                                                ? 'bg-gradient-to-br from-orange-500 to-pink-500'
                                                : isDarkMode
                                                    ? 'bg-gray-700'
                                                    : 'bg-gray-100'
                                            }`}>
                                            <Icon size={24} className={plan.isPopular ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {plan.name}
                                            </h3>
                                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                                {plan.target}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {plan.period}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {plan.description}
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${getButtonStyles(plan.buttonStyle, plan.isCurrent)
                                            }`}
                                        disabled={plan.isCurrent}
                                    >
                                        <span>{plan.buttonIcon}</span>
                                        {plan.buttonText}
                                    </button>

                                    {/* Cancel Subscription Link */}
                                    {plan.isCurrent && (
                                        <button className={`w-full mt-3 text-xs flex items-center justify-center gap-1 ${isDarkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                                            }`}>
                                            <span className={`border rounded-full w-4 h-4 flex items-center justify-center text-[10px] ${isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                                }`}>×</span>
                                            Cancel subscription
                                        </button>
                                    )}

                                    {/* Divider */}
                                    <div className={`my-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>

                                    {/* Features List */}
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.isPopular
                                                        ? 'bg-orange-500/20 text-orange-500'
                                                        : isDarkMode
                                                            ? 'bg-green-900/30 text-green-400'
                                                            : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        );
                    })}
                </div>

                {/* Detailed Comparison Table */}
                <div className="mb-12">
                    <h2 className={`text-2xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        Detailed Plan Comparison
                    </h2>

                    <div className={`rounded-2xl overflow-hidden border ${isDarkMode
                            ? 'bg-gray-800/50 border-gray-700'
                            : 'bg-white border-gray-200'
                        }`}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className={isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}>
                                        <th className={`p-5 font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Features
                                        </th>
                                        {plans.map((plan, i) => (
                                            <th key={i} className={`p-5 text-center ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300'
                                                    : ''
                                                }`}>
                                                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {plan.name}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="text-sm">
                                    {/* Price Row */}
                                    <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <td className={`p-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Price
                                        </td>
                                        {plans.map((plan, i) => (
                                            <td key={i} className={`p-5 text-center font-medium ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50 text-white'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300'
                                                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>
                                                {plan.price}{plan.period}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Credits Row */}
                                    <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <td className={`p-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Credits
                                        </td>
                                        {plans.map((plan, i) => (
                                            <td key={i} className={`p-5 text-center font-semibold ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50 text-white'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300 text-blue-600'
                                                    : isDarkMode ? 'text-gray-300' : 'text-gray-800'
                                                }`}>
                                                {plan.credits}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* SDK Row */}
                                    <tr className={`border-t ${isDarkMode ? 'border-gray-700/50 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'}`}>
                                        <td className={`p-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <div className="flex items-center gap-2">
                                                SDK / API
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${isDarkMode
                                                        ? 'bg-red-900/50 text-red-400'
                                                        : 'bg-red-100 text-red-500'
                                                    }`}>
                                                    Creator+
                                                </span>
                                            </div>
                                        </td>
                                        {plans.map((plan, i) => (
                                            <td key={i} className={`p-5 text-center ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300'
                                                    : ''
                                                } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {plan.sdk || (
                                                    <Check size={18} className={`mx-auto ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                                                )}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Essence Self Row */}
                                    <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <td className={`p-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Essence (Self-hosted)
                                        </td>
                                        {plans.map((plan, i) => (
                                            <td key={i} className={`p-5 text-center ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50 text-white'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300'
                                                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {plan.essenceSelf}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Essence Cloud Row */}
                                    <tr className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <td className={`p-5 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Essence (Cloud)
                                        </td>
                                        {plans.map((plan, i) => (
                                            <td key={i} className={`p-5 text-center ${plan.isCurrent
                                                    ? isDarkMode
                                                        ? 'bg-blue-900/20 border-x-2 border-dashed border-blue-500/50 text-white'
                                                        : 'bg-blue-50/50 border-x-2 border-dashed border-blue-300'
                                                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {plan.essenceCloud}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FAQ or Additional Info */}
                <div className={`text-center p-8 rounded-2xl ${isDarkMode
                        ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20'
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100'
                    }`}>
                    <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Need help choosing?
                    </h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Our team is here to help you find the perfect plan for your needs.
                    </p>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                        Contact Support
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default CreditPage;