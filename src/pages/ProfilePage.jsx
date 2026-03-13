// pages/SettingsPage.jsx
import React, { useState } from 'react';
import { Settings, Building2, Users, ChevronRight, FileText, CreditCard, BarChart3 } from 'lucide-react';
import GeneralSettings from './profile/GeneralSettings';
import CompanyDetails from './profile/CompanyDetails';
import TeamSettings from './profile/TeamSettings';
import Header from '../components/layout/Header';
import AgreementSettings from './profile/AgreementSettings';
import BillingSettings from './profile/BillingSettings';
import UsageDashboard from './profile/UsageDashboard';


const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General', icon: Settings, description: 'Account preferences' },
    { id: 'company', label: 'Company', icon: Building2, description: 'Organization info' },
    { id: 'agreement', label: 'Agreement', icon: FileText, description: 'Legal documents' },
    { id: 'team', label: 'Team', icon: Users, description: 'Members & roles' },
    { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Plans & payments' } ,
    { id: "usage", label: "Usage", icon: BarChart3, description:""} 
  ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <Header title={"Profile"} />
        
       
        <div className="grid grid-cols-12 gap-2 items-start mt-1">
          
          {/* Sidebar Navigation - Sticky */}
          <div className="col-span-12  md:col-span-3 md:sticky md:top-[80px] self-start">
            <div className="bg-[#f9f9f9] rounded-xl border border-gray-200 p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-[#eaeaea] text-gray-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={18} />
                    <span className="text-sm font-medium">{section.label}</span>
                  </div>
                  <ChevronRight size={16} className={activeSection === section.id ? 'text-gray-500' : 'text-gray-400'} />
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-12 md:col-span-9">
            {activeSection === 'general' && <GeneralSettings />}
            {activeSection === 'company' && <CompanyDetails />}
            {activeSection === 'agreement' && <AgreementSettings />}
            {activeSection === 'team' && <TeamSettings />}
            {activeSection === 'billing' && <BillingSettings />}
            {activeSection === "usage" && <UsageDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;