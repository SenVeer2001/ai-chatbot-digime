// components/settings/CompanyDetails.jsx
import React, { useState } from 'react';
import { Building2, MapPin, Globe, Phone, Mail, FileText, Save, Upload, Image, X } from 'lucide-react';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    companyName: 'Webkype',
    website: 'https://techcorp.com',
    email: 'shakti@webkype.com',
    phone: '+91 98765 43210',
    address: 'NX One, Greater Noida ,Uttar Pradesh ',
    city: 'Noida',
    state: 'Uttar Pradesh',
    country: 'India',
    pincode: '560001',
    gst: 'GSTIN123456789',
    pan: 'ABCDE1234F',
    description: 'Leading provider of AI and ML solutions for enterprises.'
  });

  // Static logo URL - replace with your actual logo path
  const [logoUrl] = useState('https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=TC');
  const [hasLogo] = useState(true); // Set to true to show uploaded logo, false to show upload placeholder

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving company details:', formData);
    alert('Company details saved!');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Company Details</h2>
        <p className="text-sm text-gray-500">Manage your organization information</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Company Logo - Static */}
        <div className="flex items-center gap-4">
          {hasLogo ? (
            // Show uploaded logo
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
              <img 
                src={"./webkypeLogo.jpeg"} 
                alt="Company Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            // Show upload placeholder
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Image size={24} className="text-gray-400" />
            </div>
          )}
          
          <div>
            <p className="font-medium text-gray-800">Company Logo</p>
            <p className="text-xs text-gray-400 mb-2">PNG, JPG up to 1MB</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">
                <Upload size={12} /> {hasLogo ? 'Change Logo' : 'Upload Logo'}
              </button>
              {hasLogo && (
                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">
                  <X size={12} /> Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Company Name */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Building2 size={12} /> Webkype
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Website */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Globe size={12} /> Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Mail size={12} /> Company Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Phone size={12} /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <FileText size={12} /> Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <MapPin size={14} /> Address Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 mb-2 block">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <FileText size={14} /> Tax Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">GST Number</label>
              <input
                type="text"
                value={formData.gst}
                onChange={(e) => handleChange('gst', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-2 block">PAN Number</label>
              <input
                type="text"
                value={formData.pan}
                onChange={(e) => handleChange('pan', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;