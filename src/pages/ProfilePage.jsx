import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Building2, 
  FileText, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  Save,
  ArrowLeft,
  Upload,
  Check,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import Header from '../components/layout/Header';
import { useApp } from '../hooks/useApp';


const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState('');

  
  
  // Get user from localStorage or context
   const { user } = useApp();

  // General tab state
  const [profileImage, setProfileImage] = useState(null);
  const [generalForm, setGeneralForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    website: ''
  });

  // Company details state
  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    companyCountry: '',
    industry: '',
    companySize: '',
    taxId: ''
  });




  const [agreements, setAgreements] = useState({
  // Open/Close states
  slaOpen: false,
  termsOpen: false,
  privacyOpen: false,
  dpaOpen: false,
  
  // Accepted states
  slaAccepted: false,
  termsAccepted: false,
  privacyAccepted: false,
  dataProcessingAccepted: false,
  marketingAccepted: false
});
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'company', label: 'Company Details', icon: Building2 },
    { id: 'agreement', label: 'Agreement', icon: FileText }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Header user={user} title={"Profile "}/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 text-green-700 flex items-center gap-2">
            <Check size={18} />
            {saveStatus}
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            {/* Profile Image */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  <Camera size={16} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{generalForm.firstName} {generalForm.lastName}</h3>
                <p className="text-sm text-gray-500">{generalForm.email}</p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Change Photo
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={generalForm.firstName}
                    onChange={(e) => setGeneralForm({ ...generalForm, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={generalForm.lastName}
                    onChange={(e) => setGeneralForm({ ...generalForm, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>

                
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={generalForm.email}
                  onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              </div>


                <div className="grid md:grid-cols-3 gap-6">

                 <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={generalForm.phone}
                  onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={generalForm.location}
                    onChange={(e) => setGeneralForm({ ...generalForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe size={16} className="inline mr-2" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={generalForm.website}
                    onChange={(e) => setGeneralForm({ ...generalForm, website: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>


              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={generalForm.bio}
                  onChange={(e) => setGeneralForm({ ...generalForm, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write a short bio about yourself..."
                />
              </div>

           
            </div>
          </div>
        )}

        {/* Company Details Tab */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
              <p className="text-sm text-gray-500">Add your company details for billing and invoicing</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyForm.companyName}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={companyForm.industry}
                    onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                  <input
                    type="email"
                    value={companyForm.companyEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Phone</label>
                  <input
                    type="tel"
                    value={companyForm.companyPhone}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                <input
                  type="text"
                  value={companyForm.companyAddress}
                  onChange={(e) => setCompanyForm({ ...companyForm, companyAddress: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={companyForm.companyCity}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyCity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                  <input
                    type="text"
                    value={companyForm.companyState}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyState: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={companyForm.companyZip}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyZip: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    value={companyForm.companyCountry}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyCountry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="in">India</option>
                    <option value="au">Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select
                    value={companyForm.companySize}
                    onChange={(e) => setCompanyForm({ ...companyForm, companySize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / VAT Number</label>
                <input
                  type="text"
                  value={companyForm.taxId}
                  onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tax ID or VAT number"
                />
              </div>
            </div>
          </div>
        )}

        {/* Agreement Tab */}
      {activeTab === 'agreement' && (
  <div className="space-y-6">

    {/* SLA Agreement */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="slaOpen"
              checked={agreements.slaOpen}
              onChange={(e) => setAgreements({ 
                ...agreements, 
                slaOpen: e.target.checked,
                slaAccepted: e.target.checked ? agreements.slaAccepted : false 
              })}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="slaOpen" className="text-base font-semibold text-gray-900 cursor-pointer">
              Service Level Agreement (SLA)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Click to review and accept the Service Level Agreement for our AI chatbot services.
            </p>
          </div>
          <div className={`transform transition-transform ${agreements.slaOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expandable SLA Content */}
      {agreements.slaOpen && (
        <div className="border-t border-gray-200">
          {/* SLA Content */}
          <div className="p-6 bg-gray-50 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-4">SERVICE LEVEL AGREEMENT</h4>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">1. Service Availability</h5>
                <p>The Provider guarantees 99.9% uptime for the AI chatbot service, excluding scheduled maintenance windows. Scheduled maintenance will be communicated at least 48 hours in advance.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">2. Response Time</h5>
                <p>The AI chatbot will respond to user queries within 2 seconds under normal operating conditions. Peak load times may result in response times of up to 5 seconds.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">3. Support Services</h5>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Critical Issues (P1): Response within 1 hour, resolution within 4 hours</li>
                  <li>High Priority (P2): Response within 4 hours, resolution within 24 hours</li>
                  <li>Medium Priority (P3): Response within 8 hours, resolution within 72 hours</li>
                  <li>Low Priority (P4): Response within 24 hours, resolution within 7 days</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">4. Data Security</h5>
                <p>All data transmitted through the service is encrypted using TLS 1.3. Data at rest is encrypted using AES-256 encryption. The Provider complies with GDPR, CCPA, and SOC 2 Type II requirements.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">5. Service Credits</h5>
                <p>In the event of service level breaches, the following credits apply:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li>99.0% - 99.9% uptime: 10% service credit</li>
                  <li>95.0% - 99.0% uptime: 25% service credit</li>
                  <li>Below 95.0% uptime: 50% service credit</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">6. Limitations</h5>
                <p>This SLA does not apply to service disruptions caused by factors outside the Provider's reasonable control, including force majeure events, customer-side network issues, or misuse of the service.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">7. Term and Termination</h5>
                <p>This SLA is effective upon acceptance and remains in effect for the duration of the service subscription. Either party may terminate with 30 days written notice.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">8. Modifications</h5>
                <p>The Provider reserves the right to modify this SLA with 30 days prior notice. Continued use of the service after modifications constitutes acceptance of the updated terms.</p>
              </div>
            </div>
          </div>

          {/* I Understood Checkbox */}
          <div className="p-6 bg-blue-50 border-t border-blue-100">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="slaAccepted"
                checked={agreements.slaAccepted}
                onChange={(e) => setAgreements({ ...agreements, slaAccepted: e.target.checked })}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="slaAccepted" className="text-sm font-medium text-gray-900 cursor-pointer">
                I have read and understood the Service Level Agreement
              </label>
            </div>
            
            {agreements.slaAccepted && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <Check size={16} />
                <span className="text-sm font-medium">SLA Agreement accepted</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Terms of Service */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="termsOpen"
              checked={agreements.termsOpen}
              onChange={(e) => setAgreements({ 
                ...agreements, 
                termsOpen: e.target.checked,
                termsAccepted: e.target.checked ? agreements.termsAccepted : false 
              })}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="termsOpen" className="text-base font-semibold text-gray-900 cursor-pointer">
              Terms of Service
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Click to review and accept the Terms of Service.
            </p>
          </div>
          <div className={`transform transition-transform ${agreements.termsOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expandable Terms Content */}
      {agreements.termsOpen && (
        <div className="border-t border-gray-200">
          <div className="p-6 bg-gray-50 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-4">TERMS OF SERVICE</h4>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h5>
                <p>By accessing or using our AI chatbot services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">2. Use of Service</h5>
                <p>You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">3. Intellectual Property</h5>
                <p>The service and its original content, features, and functionality are owned by the Provider and are protected by international copyright, trademark, and other intellectual property laws.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">4. User Content</h5>
                <p>You retain ownership of any content you submit to the service. By submitting content, you grant us a license to use, modify, and display such content for the purpose of providing the service.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">5. Limitation of Liability</h5>
                <p>The Provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
              </div>
            </div>
          </div>

          {/* I Understood Checkbox */}
          <div className="p-6 bg-blue-50 border-t border-blue-100">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={agreements.termsAccepted}
                onChange={(e) => setAgreements({ ...agreements, termsAccepted: e.target.checked })}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="termsAccepted" className="text-sm font-medium text-gray-900 cursor-pointer">
                I have read and understood the Terms of Service
              </label>
            </div>
            
            {agreements.termsAccepted && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <Check size={16} />
                <span className="text-sm font-medium">Terms of Service accepted</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Privacy Policy */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="privacyOpen"
              checked={agreements.privacyOpen}
              onChange={(e) => setAgreements({ 
                ...agreements, 
                privacyOpen: e.target.checked,
                privacyAccepted: e.target.checked ? agreements.privacyAccepted : false 
              })}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="privacyOpen" className="text-base font-semibold text-gray-900 cursor-pointer">
              Privacy Policy
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Click to review and accept the Privacy Policy.
            </p>
          </div>
          <div className={`transform transition-transform ${agreements.privacyOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expandable Privacy Content */}
      {agreements.privacyOpen && (
        <div className="border-t border-gray-200">
          <div className="p-6 bg-gray-50 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-4">PRIVACY POLICY</h4>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">1. Information We Collect</h5>
                <p>We collect information you provide directly, such as account information, chat logs, and usage data. We also collect certain information automatically through cookies and similar technologies.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">2. How We Use Your Information</h5>
                <p>We use collected information to provide, maintain, and improve our services, to communicate with you, and to protect our users and services.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">3. Data Retention</h5>
                <p>We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">4. Your Rights</h5>
                <p>You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data.</p>
              </div>
            </div>
          </div>

          {/* I Understood Checkbox */}
          <div className="p-6 bg-blue-50 border-t border-blue-100">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="privacyAccepted"
                checked={agreements.privacyAccepted}
                onChange={(e) => setAgreements({ ...agreements, privacyAccepted: e.target.checked })}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="privacyAccepted" className="text-sm font-medium text-gray-900 cursor-pointer">
                I have read and understood the Privacy Policy
              </label>
            </div>
            
            {agreements.privacyAccepted && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <Check size={16} />
                <span className="text-sm font-medium">Privacy Policy accepted</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Data Processing Agreement */}
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="dpaOpen"
              checked={agreements.dpaOpen}
              onChange={(e) => setAgreements({ 
                ...agreements, 
                dpaOpen: e.target.checked,
                dataProcessingAccepted: e.target.checked ? agreements.dataProcessingAccepted : false 
              })}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="dpaOpen" className="text-base font-semibold text-gray-900 cursor-pointer">
              Data Processing Agreement (DPA)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Click to review and accept the Data Processing Agreement for GDPR compliance.
            </p>
          </div>
          <div className={`transform transition-transform ${agreements.dpaOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Expandable DPA Content */}
      {agreements.dpaOpen && (
        <div className="border-t border-gray-200">
          <div className="p-6 bg-gray-50 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-gray-900 mb-4">DATA PROCESSING AGREEMENT</h4>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">1. Subject Matter</h5>
                <p>This DPA governs the processing of personal data by the Processor on behalf of the Controller in connection with the AI chatbot services.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">2. Duration</h5>
                <p>This DPA shall remain in effect for the duration of the service agreement between the parties.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">3. Nature and Purpose</h5>
                <p>Personal data will be processed for the purpose of providing AI chatbot services, including conversation handling, analytics, and service improvement.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">4. Types of Personal Data</h5>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>User identification data</li>
                  <li>Chat conversation content</li>
                  <li>Usage analytics data</li>
                  <li>Technical access logs</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">5. Sub-processors</h5>
                <p>The Processor shall not engage any sub-processor without prior written consent from the Controller. A list of approved sub-processors will be maintained.</p>
              </div>

              <div>
                <h5 className="font-semibold text-gray-800 mb-2">6. Security Measures</h5>
                <p>The Processor implements appropriate technical and organizational measures to ensure a level of security appropriate to the risk.</p>
              </div>
            </div>
          </div>

          {/* I Understood Checkbox */}
          <div className="p-6 bg-blue-50 border-t border-blue-100">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="dpaAccepted"
                checked={agreements.dataProcessingAccepted}
                onChange={(e) => setAgreements({ ...agreements, dataProcessingAccepted: e.target.checked })}
                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="dpaAccepted" className="text-sm font-medium text-gray-900 cursor-pointer">
                I have read and understood the Data Processing Agreement
              </label>
            </div>
            
            {agreements.dataProcessingAccepted && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <Check size={16} />
                <span className="text-sm font-medium">DPA accepted</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Agreement Status Summary */}
    <div className={`rounded-2xl border p-6 ${
      agreements.slaAccepted && agreements.termsAccepted && agreements.privacyAccepted && agreements.dataProcessingAccepted
        ? 'bg-green-50 border-green-200'
        : 'bg-amber-50 border-amber-200'
    }`}>
      <div className="flex items-start gap-3">
        {agreements.slaAccepted && agreements.termsAccepted && agreements.privacyAccepted && agreements.dataProcessingAccepted ? (
          <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h4 className={`font-semibold ${
            agreements.slaAccepted && agreements.termsAccepted && agreements.privacyAccepted && agreements.dataProcessingAccepted
              ? 'text-green-900'
              : 'text-amber-900'
          }`}>
            Agreement Status
          </h4>
          <div className="mt-2 space-y-1">
            <p className={`text-sm flex items-center gap-2 ${agreements.slaAccepted ? 'text-green-700' : 'text-gray-500'}`}>
              {agreements.slaAccepted ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-400"></span>}
              Service Level Agreement
            </p>
            <p className={`text-sm flex items-center gap-2 ${agreements.termsAccepted ? 'text-green-700' : 'text-gray-500'}`}>
              {agreements.termsAccepted ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-400"></span>}
              Terms of Service
            </p>
            <p className={`text-sm flex items-center gap-2 ${agreements.privacyAccepted ? 'text-green-700' : 'text-gray-500'}`}>
              {agreements.privacyAccepted ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-400"></span>}
              Privacy Policy
            </p>
            <p className={`text-sm flex items-center gap-2 ${agreements.dataProcessingAccepted ? 'text-green-700' : 'text-gray-500'}`}>
              {agreements.dataProcessingAccepted ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-gray-400"></span>}
              Data Processing Agreement
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
)}
      </main>
    </div>
  );
};

export default ProfilePage;