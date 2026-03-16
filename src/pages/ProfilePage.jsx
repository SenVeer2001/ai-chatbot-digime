// pages/ProfilePage.jsx
import React, { useState } from 'react';
import { Settings, Building2, Users, ChevronRight, ChevronDown, FileText, CreditCard, BarChart3, FolderOpen, HelpCircle } from 'lucide-react';
import GeneralSettings from './profile/GeneralSettings';
import CompanyDetails from './profile/CompanyDetails';
import TeamSettings from './profile/TeamSettings';
import Header from '../components/layout/Header';
import AgreementSettings from './profile/AgreementSettings';
import BillingSettings from './profile/BillingSettings';
import UsageDashboard from './profile/UsageDashboard';
import HelpSupport from './profile/HelpSupport';
import DocumentsSection from './profile/DocumentsSection';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [activeSubSection, setActiveSubSection] = useState('terms');
  const [expandedMenus, setExpandedMenus] = useState(['agreement']); // Keep agreement expanded by default

  const sections = [
    { id: 'general', label: 'General', icon: Settings, description: 'Account preferences' },
    { id: 'company', label: 'Company', icon: Building2, description: 'Organization info' },
    { id: 'documents', label: 'Documents', icon: FolderOpen, description: 'Upload & manage files' },
    { id: 'team', label: 'Team', icon: Users, description: 'Members & roles' },
    { id: 'billing', label: 'Billing', icon: CreditCard, description: 'Plans & payments' },
    { id: 'usage', label: 'Usage', icon: BarChart3, description: 'Usage analytics' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, description: 'FAQ & tickets' },
      {
      id: 'agreement',
      label: 'Agreement',
      icon: FileText,
      description: 'Legal documents',
      hasSubmenu: true,
      subItems: [
        { id: 'terms', label: 'Terms & Conditions' },
        { id: 'privacy', label: 'Privacy Policy' },
        { id: 'nda', label: 'Non-Disclosure Agreement' },
        { id: 'cookie', label: 'Cookies Policy' },
      ]
    },
  ];

  const toggleSubmenu = (sectionId) => {
    setExpandedMenus(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSectionClick = (section) => {
    if (section.hasSubmenu) {
      toggleSubmenu(section.id);
      // Also set the section as active and select first sub-item
      setActiveSection(section.id);
      if (section.subItems && section.subItems.length > 0) {
        setActiveSubSection(section.subItems[0].id);
      }
    } else {
      setActiveSection(section.id);
      setActiveSubSection('');
    }
  };

  const handleSubItemClick = (sectionId, subItemId) => {
    setActiveSection(sectionId);
    setActiveSubSection(subItemId);
  };

  const isMenuExpanded = (sectionId) => expandedMenus.includes(sectionId);

  return (
    <div className="p-4 ">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <Header title={"Profile"} />

        <div className="grid grid-cols-12 gap-4 items-start mt-4">


          <div className="col-span-12 md:col-span-3 md:sticky md:top-[80px] self-start">
            <div className="bg-[#f9f9f9] rounded-xl border border-gray-200 p-2 shadow-sm">
              {sections.map((section) => (
                <div key={section.id}>
                  {/* Main Menu Item */}
                  <button
                    onClick={() => handleSectionClick(section)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${activeSection === section.id
                        ? 'bg-[#eaeaea] text-gray-600'
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon size={18} />
                      <span className="text-sm font-medium">{section.label}</span>
                    </div>

                    {section.hasSubmenu ? (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isMenuExpanded(section.id) ? 'rotate-180' : ''
                          } ${activeSection === section.id ? 'bg-[#eaeaea] text-gray-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className={activeSection === section.id ? 'text-gray-600' : 'text-gray-600'}
                      />
                    )}
                  </button>

                  {/* Submenu Items */}
                  {section.hasSubmenu && isMenuExpanded(section.id) && (
                    <div className="ml-5 pl-4 border-l-2 border-gray-400 mt-1 mb-2 space-y-1">
                      {section.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleSubItemClick(section.id, subItem.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg  text-left transition-all text-sm ${activeSection === section.id && activeSubSection === subItem.id
                              ? 'bg-[#eaeaea] text-gray-600'
                              : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id && activeSubSection === subItem.id
                              ? 'bg-gray-600'
                              : 'bg-gray-300'
                            }`} />
                          <span>{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-12 md:col-span-9">
            {activeSection === 'general' && <GeneralSettings />}
            {activeSection === 'company' && <CompanyDetails />}
            {activeSection === 'team' && <TeamSettings />}
            {activeSection === 'billing' && <BillingSettings />}
            {activeSection === 'usage' && <UsageDashboard />}
            {activeSection === 'help' && <HelpSupport />}
            {activeSection === 'documents' && <DocumentsSection />}
            {activeSection === 'agreement' && <AgreementSettings activePolicy={activeSubSection} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;