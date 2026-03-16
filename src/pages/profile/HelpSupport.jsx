// pages/profile/HelpSupport.jsx
import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Paperclip,
  Send,
  Search,
  Trash2,
  Eye
} from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to Settings > Security > Change Password. Enter your current password and then your new password twice to confirm. You will receive an email confirmation once the password is changed successfully.'
    },
    {
      id: 2,
      category: 'Account',
      question: 'How can I update my profile information?',
      answer: 'Navigate to Settings > General to update your profile information including name, email, phone number, and profile picture. All changes are saved automatically.'
    },
    {
      id: 3,
      category: 'Billing',
      question: 'How do I upgrade my subscription plan?',
      answer: 'Go to Settings > Billing > Plans and select the plan you want to upgrade to. You can compare features and pricing before making a decision. Your new plan will be active immediately after payment.'
    },
    {
      id: 4,
      category: 'Billing',
      question: 'Can I get a refund for my subscription?',
      answer: 'We offer a 14-day money-back guarantee for all new subscriptions. To request a refund, please contact our support team with your account details and reason for the refund.'
    },
    {
      id: 5,
      category: 'Technical',
      question: 'Why is my upload failing?',
      answer: 'Upload failures can occur due to file size limits (max 50MB), unsupported file formats, or network issues. Please check your file meets our requirements and try again. If the issue persists, contact support.'
    },
    {
      id: 6,
      category: 'Technical',
      question: 'How do I integrate with third-party services?',
      answer: 'Go to Settings > Integrations to connect your account with supported third-party services. Follow the authentication flow for each service and grant the necessary permissions.'
    },
    {
      id: 7,
      category: 'Team',
      question: 'How do I add team members?',
      answer: 'Navigate to Settings > Team > Invite Member. Enter the email addresses of the people you want to invite and select their roles. They will receive an invitation email to join your team.'
    },
    {
      id: 8,
      category: 'Security',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Settings > Security > Two-Factor Authentication. You can choose between SMS or authenticator app. Follow the setup instructions and save your backup codes in a secure location.'
    }
  ];

  // Tickets Data
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      subject: 'Unable to export reports',
      category: 'Technical Issue',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16',
      messages: [
        { from: 'user', text: 'I am unable to export my monthly reports. The download button is not working.', time: '2024-01-15 10:30' },
        { from: 'support', text: 'Thank you for reaching out. Can you please tell us which browser you are using?', time: '2024-01-16 09:15' }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Billing discrepancy',
      category: 'Billing',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-12',
      messages: [
        { from: 'user', text: 'I was charged twice for my subscription this month.', time: '2024-01-10 14:20' },
        { from: 'support', text: 'We apologize for the inconvenience. Our billing team is looking into this.', time: '2024-01-11 11:00' },
        { from: 'support', text: 'We have identified the issue and a refund has been initiated.', time: '2024-01-12 16:45' }
      ]
    },
    {
      id: 'TKT-003',
      subject: 'Feature request: Dark mode',
      category: 'Feature Request',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-05',
      lastUpdate: '2024-01-08',
      messages: [
        { from: 'user', text: 'Would love to have a dark mode option for the dashboard.', time: '2024-01-05 09:00' },
        { from: 'support', text: 'Great suggestion! We have added this to our roadmap for Q2 2024.', time: '2024-01-08 10:30' }
      ]
    }
  ]);

  // New Ticket Form
  const [newTicket, setNewTicket] = useState({
    category: '',
    subcategory: '',
    subject: '',
    description: '',
    attachments: []
  });

  const categories = [
    { id: 'technical', label: 'Technical Issue', subcategories: ['Bug Report', 'Performance Issue', 'Integration Problem'] },
    { id: 'billing', label: 'Billing', subcategories: ['Payment Issue', 'Refund Request', 'Invoice Query'] },
    { id: 'account', label: 'Account', subcategories: ['Login Issue', 'Profile Update', 'Security Concern'] },
    { id: 'feature', label: 'Feature Request', subcategories: ['New Feature', 'Improvement', 'Integration Request'] },
    { id: 'other', label: 'Other', subcategories: ['General Query', 'Feedback', 'Other'] }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-gray-200 text-gray-700';
      case 'in-progress': return 'bg-gray-300 text-gray-700';
      case 'resolved': return 'bg-gray-100 text-gray-600';
      case 'closed': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gray-300 text-gray-800';
      case 'medium': return 'bg-gray-200 text-gray-700';
      case 'low': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle size={14} />;
      case 'in-progress': return <Clock size={14} />;
      case 'resolved': return <CheckCircle size={14} />;
      default: return <HelpCircle size={14} />;
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setNewTicket(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (index) => {
    setNewTicket(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitTicket = () => {
    if (!newTicket.category || !newTicket.subject || !newTicket.description) {
      alert('Please fill all required fields');
      return;
    }

    const ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      messages: [
        { from: 'user', text: newTicket.description, time: new Date().toLocaleString() }
      ]
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ category: '', subcategory: '', subject: '', description: '', attachments: [] });
    setShowTicketModal(false);
    alert('Ticket created successfully!');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Help & Support</h2>
        <p className="text-sm text-gray-500">Find answers or get help from our support team</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 px-6 py-4 text-sm rounded-md font-semibold transition-colors relative ${
              activeTab === 'faq'
                ? 'text-gray-200 bg-gray-800'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={18} />
              FAQ
            </div>
            {activeTab === 'faq' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 px-6 py-4 text-sm rounded-md font-semibold transition-colors relative ${
              activeTab === 'tickets'
                ? 'text-gray-200 bg-gray-800'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              My Tickets
              {tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length > 0 && (
                <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length}
                </span>
              )}
            </div>
            {activeTab === 'tickets' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* FAQ Categories */}
            <div className="space-y-4">
              {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-bold text-gray-700">{category}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {categoryFaqs.map((faq) => (
                      <div key={faq.id}>
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-800 pr-4">{faq.question}</span>
                          {expandedFaq === faq.id ? (
                            <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === faq.id && (
                          <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-200">
                            <p className="pt-3">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support CTA */}
            <div className="bg-gray-800 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">Can't find what you're looking for?</h3>
                  <p className="text-sm text-gray-300">Our support team is here to help you 24/7</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('tickets');
                    setShowTicketModal(true);
                  }}
                  className="px-5 py-2.5 bg-white text-gray-800 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {tickets.length} total tickets
                </span>
              </div>
              <button
                onClick={() => setShowTicketModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                <Plus size={16} />
                New Ticket
              </button>
            </div>

            {/* Tickets List */}
            {selectedTicket ? (
              // Ticket Detail View
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <X size={18} className="text-gray-500" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-400">{selectedTicket.id}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(selectedTicket.status)}`}>
                          {getStatusIcon(selectedTicket.status)}
                          {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800">{selectedTicket.subject}</h3>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.toUpperCase()}
                  </span>
                </div>

                <div className="p-5 max-h-[400px] overflow-y-auto space-y-4">
                  {selectedTicket.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-xl p-4 ${
                        msg.from === 'user'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-2 ${msg.from === 'user' ? 'text-gray-400' : 'text-gray-400'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                      />
                      <button className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Tickets List View
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{ticket.subject}</h4>
                        <p className="text-xs text-gray-500">
                          {ticket.category} • Created {ticket.createdAt} • Last update {ticket.lastUpdate}
                        </p>
                      </div>
                      <ChevronDown size={18} className="text-gray-400 rotate-[-90deg]" />
                    </div>
                  </div>
                ))}

                {tickets.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No tickets yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Create a ticket to get help from our support team</p>
                    <button
                      onClick={() => setShowTicketModal(true)}
                      className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Create Your First Ticket
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md w-full max-w-[540px] max-h-[640px] shadow-2xl relative overflow-x-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowTicketModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:bg-gray-100 p-1 rounded-full z-10"
            >
              <X size={20} />
            </button>

            {/* Header Illustration Area */}
            <div className="bg-gray-100 h-36 flex items-center justify-center relative border-b border-gray-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <MessageSquare size={30} className="text-gray-600" />
                </div>
                <p className="text-sm font-medium text-gray-600">We're here to help!</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">How can we help?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Please describe your issue and we'll get back to you as soon as possible.
                Check our <span className="text-gray-700 font-semibold cursor-pointer hover:underline" onClick={() => { setShowTicketModal(false); setActiveTab('faq'); }}>FAQ section</span> for quick answers.
              </p>

              <div className="space-y-4">
                {/* Category Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                  <select 
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value, subcategory: '' })}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.label}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] text-gray-500 pointer-events-none" size={18} />
                </div>

                {/* Subcategory Dropdown */}
                {newTicket.category && (
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subcategory</label>
                    <select 
                      value={newTicket.subcategory}
                      onChange={(e) => setNewTicket({ ...newTicket, subcategory: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                      <option value="">Select a subcategory</option>
                      {categories.find(c => c.label === newTicket.category)?.subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-[38px] text-gray-500 pointer-events-none" size={18} />
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Brief summary of your issue"
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                  <textarea 
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Please include as much info as possible..." 
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <input
                    type="file"
                    id="ticket-attachment"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label 
                    htmlFor="ticket-attachment"
                    className="flex items-center gap-2 text-gray-700 font-bold text-[13px] hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer w-fit"
                  >
                    <Paperclip size={16} className="rotate-45" />
                    Add a screenshot or video (recommended)
                  </label>

                  {newTicket.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {newTicket.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600 truncate">{file.name}</span>
                          <button
                            onClick={() => removeAttachment(idx)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <X size={14} className="text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <button 
                onClick={() => setShowTicketModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitTicket}
                disabled={!newTicket.category || !newTicket.subject || !newTicket.description}
                className={`px-6 py-2 font-bold rounded-lg text-sm transition-colors ${
                  newTicket.category && newTicket.subject && newTicket.description
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;