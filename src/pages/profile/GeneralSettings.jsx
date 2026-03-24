// components/settings/GeneralSettings.jsx
import React, { useState, useRef } from 'react';
import { User, Mail, Lock, Bell, Globe, Moon, Save, Camera, X, Upload } from 'lucide-react';

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Gajendra Singh',
    email: 'gajendra@company.com',
    phone: '+91 98765 43210',
    language: 'English',
    timezone: 'Asia/Kolkata',
    notifications: true,
    darkMode: false
  });

  // Profile image state
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg");
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only JPG, PNG or GIF files are allowed');
        return;
      }

      setProfileImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('language', formData.language);
    submitData.append('timezone', formData.timezone);
    
    if (profileImage) {
      submitData.append('profileImage', profileImage);
    }

    console.log('Saving:', formData);
    console.log('Profile Image:', profileImage);
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">General Settings</h2>
        <p className="text-sm text-gray-500">Manage your personal account settings</p>
      </div>

      <div className="p-5 space-y-6">
        
        {/* Profile Picture Section */}
        <div className="flex items-start gap-4">
          <div className="relative group">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif"
              className="hidden"
            />
            
            {/* Profile Image or Placeholder */}
            <div 
              onClick={handleImageClick}
              className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-all"
            >
              {imagePreview ? (
                <img 
                  src={imagePreview || "https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {formData.name.charAt(0)}
                </div>
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>

            
            {imagePreview && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-800 shadow-md"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex-1">
            <p className="font-medium text-gray-800">Profile Picture</p>
            <p className="text-xs text-gray-400 mb-3">JPG, PNG or GIF. Max 2MB</p>
            
           
            <div className="flex gap-2">
              <button
                onClick={handleImageClick}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Upload size={14} />
                Upload Photo
              </button>
              
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <X size={14} />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <User size={12} /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Mail size={12} /> Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
           
          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <User size={12} /> Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Language */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Globe size={12} /> Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          {/* Timezone */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Globe size={12} /> Timezone
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;