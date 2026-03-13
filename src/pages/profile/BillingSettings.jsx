// components/settings/BillingSettings.jsx
import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  Gift,
  BarChart3,
  Plus,
  Download,
  Trash2,
  Check,
  Star,
  Zap,
  Shield,
  ArrowUpRight,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  ChevronDown,
  Wallet,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';

const BillingSettings = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      name: 'Gajendra Singh',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '5555',
      name: 'Gajendra Singh',
      expiry: '08/25',
      isDefault: false
    }
  ]);

  // Billing History
  const [billingHistory] = useState([
    { id: 1, date: '01 Mar 2024', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid', invoice: 'INV-001' },
    { id: 2, date: '01 Feb 2024', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid', invoice: 'INV-002' },
    { id: 3, date: '01 Jan 2024', description: 'Pro Plan - Monthly', amount: 29.00, status: 'paid', invoice: 'INV-003' },
    { id: 4, date: '01 Dec 2023', description: 'Starter Plan - Monthly', amount: 9.00, status: 'paid', invoice: 'INV-004' },
    { id: 5, date: '01 Nov 2023', description: 'Starter Plan - Monthly', amount: 9.00, status: 'failed', invoice: 'INV-005' },
    { id: 6, date: '01 Oct 2023', description: 'Starter Plan - Monthly', amount: 9.00, status: 'paid', invoice: 'INV-006' }
  ]);

  // Credit Grants
  const [credits] = useState([
    { id: 1, title: 'Welcome Bonus', amount: 50.00, used: 20.00, expiry: '31 Dec 2024', status: 'active', color: 'blue' },
    { id: 2, title: 'Referral Reward', amount: 25.00, used: 25.00, expiry: '15 Jun 2024', status: 'used', color: 'green' },
    { id: 3, title: 'Promotional Credit', amount: 100.00, used: 0.00, expiry: '01 Jan 2025', status: 'active', color: 'purple' }
  ]);

  // Current Plan
  const currentPlan = {
    name: 'Pro Plan',
    price: 29.00,
    billingCycle: 'Monthly',
    nextBilling: '01 Apr 2024',
    features: [
      '10 Team Members',
      '50 GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'Custom Domain'
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'history', label: 'Billing History', icon: Receipt },
    { id: 'credits', label: 'Credit Grants', icon: Gift }
  ];

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      pending: 'bg-yellow-100 text-yellow-700',
      active: 'bg-green-100 text-green-700',
      used: 'bg-gray-100 text-gray-600',
      expired: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const getCardBrand = (type) => {
    if (type === 'visa') return (
      <div className="bg-blue-600 text-white text-xs font-black px-2 py-1.5 rounded italic">VISA</div>
    );
    if (type === 'mastercard') return (
      <div className="flex">
        <div className="w-5 h-5 bg-red-500 rounded-full opacity-90" />
        <div className="w-5 h-5 bg-yellow-400 rounded-full -ml-2 opacity-90" />
      </div>
    );
    return null;
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(m => ({ ...m, isDefault: m.id === id })));
  };

  const handleDeleteCard = (id) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };

  const handleAddCard = () => {
    if (!newCard.number || !newCard.name || !newCard.expiry) return;
    const newMethod = {
      id: Date.now(),
      type: newCard.number.startsWith('4') ? 'visa' : 'mastercard',
      last4: newCard.number.slice(-4),
      name: newCard.name,
      expiry: newCard.expiry,
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setNewCard({ number: '', name: '', expiry: '', cvv: '' });
    setShowAddCard(false);
  };

  const totalCredits = credits.reduce((acc, c) => acc + c.amount, 0);
  const usedCredits = credits.reduce((acc, c) => acc + c.used, 0);
  const availableCredits = totalCredits - usedCredits;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Billing & Payments</h2>
        <p className="text-sm text-gray-500">Manage your subscription, payment methods and billing history</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">

        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-blue-600 uppercase">Current Plan</p>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">{currentPlan.name}</p>
                <p className="text-xs text-gray-500 mt-1">${currentPlan.price}/month</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-green-600 uppercase">Next Billing</p>
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Calendar size={16} className="text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">{currentPlan.nextBilling}</p>
                <p className="text-xs text-gray-500 mt-1">{currentPlan.billingCycle} billing</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-purple-600 uppercase">Available Credits</p>
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Gift size={16} className="text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">${availableCredits.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">from {credits.filter(c => c.status === 'active').length} active grants</p>
              </div>
            </div>

            {/* Current Plan Details */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Star size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{currentPlan.name}</p>
                    <p className="text-xs text-blue-100">{currentPlan.billingCycle} • Next: {currentPlan.nextBilling}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${currentPlan.price}</p>
                  <p className="text-xs text-blue-100">/month</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">Included Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {currentPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-green-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                    <ArrowUpRight size={14} /> Upgrade Plan
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    <RefreshCw size={14} /> Change Plan
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 ml-auto">
                    Cancel Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Usage */}
            <div className="border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-4">Usage This Month</p>
              <div className="space-y-4">
                {[
                  { label: 'Team Members', used: 6, total: 10, color: 'bg-blue-500' },
                  { label: 'Storage', used: 32, total: 50, color: 'bg-green-500', unit: 'GB' },
                  { label: 'API Calls', used: 8500, total: 10000, color: 'bg-purple-500' }
                ].map((item, idx) => {
                  const percent = Math.round((item.used / item.total) * 100);
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="text-xs text-gray-400">
                          {item.unit ? `${item.used} ${item.unit}` : item.used} / {item.unit ? `${item.total} ${item.unit}` : item.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">{percent}% used</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Alert */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Upcoming Renewal</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Your Pro Plan will automatically renew on {currentPlan.nextBilling} for ${currentPlan.price}. 
                  Make sure your payment method is up to date.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== PAYMENT METHODS TAB ==================== */}
        {activeTab === 'payment' && (
          <div className="space-y-4">

            {/* Add New Card Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddCard(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                <Plus size={16} /> Add Payment Method
              </button>
            </div>

            {/* Add Card Form */}
            {showAddCard && (
              <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-600" /> Add New Card
                  </h3>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">Card Number</label>
                    <input
                      type="text"
                      value={newCard.number}
                      onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      value={newCard.name}
                      onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                      placeholder="Name on card"
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">Expiry Date</label>
                    <input
                      type="text"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1.5 block uppercase">CVV</label>
                    <input
                      type="password"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield size={12} className="text-green-500" />
                  Your payment information is encrypted and secure
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddCard}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                  >
                    <Check size={14} /> Add Card
                  </button>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Cards List */}
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${
                    method.isDefault
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    {/* Card Visual */}
                    

                    <div className=''>
                      <div className="flex items-center gap-2">
                        {getCardBrand(method.type)}
                        <span className="font-semibold text-gray-800">
                          •••• •••• •••• {method.last4}
                        </span>
                        {method.isDefault && (
                          <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                            <BadgeCheck size={10} /> Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5">{method.name} • Expires {method.expiry}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteCard(method.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Info */}
            
          </div>
        )}

        {/* ==================== BILLING HISTORY TAB ==================== */}
        {activeTab === 'history' && (
          <div className="space-y-4">

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-2xl font-bold text-gray-800">
                  ${billingHistory.filter(h => h.status === 'paid').reduce((acc, h) => acc + h.amount, 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total Paid</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-2xl font-bold text-gray-800">{billingHistory.filter(h => h.status === 'paid').length}</p>
                <p className="text-xs text-gray-500 mt-1">Successful Payments</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-2xl font-bold text-gray-800">{billingHistory.filter(h => h.status === 'failed').length}</p>
                <p className="text-xs text-gray-500 mt-1">Failed Payments</p>
              </div>
            </div>

            {/* Download All */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                <Download size={14} /> Export All
              </button>
            </div>

            {/* History Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-xs font-semibold text-blue-600">Date</th>
                    <th className="p-4 text-xs font-semibold text-blue-600">Description</th>
                    <th className="p-4 text-xs font-semibold text-blue-600">Invoice</th>
                    <th className="p-4 text-xs font-semibold text-blue-600">Amount</th>
                    <th className="p-4 text-xs font-semibold text-blue-600">Status</th>
                    <th className="p-4 text-xs font-semibold text-blue-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {billingHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} className="text-gray-400" />
                          {item.date}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-700 font-medium">{item.description}</td>
                      <td className="p-4 text-xs text-gray-400 font-mono">{item.invoice}</td>
                      <td className="p-4">
                        <span className="font-bold text-gray-800">${item.amount.toFixed(2)}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded font-medium capitalize ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {item.status === 'paid' ? (
                          <button className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
                            <Download size={14} />
                          </button>
                        ) : (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">
                            <RefreshCw size={12} /> Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== CREDIT GRANTS TAB ==================== */}
        {activeTab === 'credits' && (
          <div className="space-y-4">

            {/* Credit Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-2">Total Credits</p>
                <p className="text-2xl font-bold text-gray-800">${totalCredits.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                <p className="text-xs font-semibold text-green-600 uppercase mb-2">Available</p>
                <p className="text-2xl font-bold text-gray-800">${availableCredits.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Used</p>
                <p className="text-2xl font-bold text-gray-800">${usedCredits.toFixed(2)}</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Overall Credit Usage</span>
                <span className="text-gray-500">{Math.round((usedCredits / totalCredits) * 100)}% used</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  style={{ width: `${(usedCredits / totalCredits) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                <span>${usedCredits.toFixed(2)} used</span>
                <span>${availableCredits.toFixed(2)} remaining</span>
              </div>
            </div>

            {/* Credit Cards */}
            <div className="space-y-3">
              {credits.map((credit) => {
                const usedPercent = Math.round((credit.used / credit.amount) * 100);
                const remaining = credit.amount - credit.used;
                
                const colorMap = {
                  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', bar: 'bg-blue-500', icon: 'bg-blue-100' },
                  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', bar: 'bg-green-500', icon: 'bg-green-100' },
                  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', bar: 'bg-purple-500', icon: 'bg-purple-100' }
                };

                const c = colorMap[credit.color] || colorMap.blue;

                return (
                  <div
                    key={credit.id}
                    className={`p-4 rounded-xl border ${c.bg} ${c.border}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.icon}`}>
                          <Gift size={18} className={c.text} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{credit.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                            <Clock size={10} />
                            Expires: {credit.expiry}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">${credit.amount.toFixed(2)}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${getStatusColor(credit.status)}`}>
                          {credit.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">${credit.used.toFixed(2)} used</span>
                        <span className={`font-medium ${c.text}`}>${remaining.toFixed(2)} remaining</span>
                      </div>
                      <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-gray-200">
                        <div
                          className={`h-2 rounded-full ${c.bar}`}
                          style={{ width: `${usedPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">{usedPercent}% used</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Redeem Code */}
            <div className="pt-4 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-500 mb-2 block uppercase">Redeem Promo Code</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code..."
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
                <button className="px-5 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                  Apply
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Credits are automatically applied to your next invoice. Unused credits expire on their respective dates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingSettings;