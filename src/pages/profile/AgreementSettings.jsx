// pages/profile/AgreementSettings.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  FileText,
  Save,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Clock,
  Edit3,
} from "lucide-react";

const AgreementSettings = ({ activePolicy = 'terms' }) => {
  const defaultAgreements = useMemo(
    () => ({
      terms: {
        id: "terms",
        label: "Terms & Conditions",
        title: "Terms & Conditions",
        version: "1.0",
        lastUpdated: "15 Jan 2024",
        isPublished: true,
        requireAcceptance: true,
        content: `Terms & Conditions

1. ACCEPTANCE OF TERMS
By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.

2. USER RESPONSIBILITIES
- You are responsible for maintaining the confidentiality of your account
- You agree to provide accurate information
- You will not use the service for any illegal purposes

3. INTELLECTUAL PROPERTY
All content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.

4. LIMITATION OF LIABILITY
In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages.

5. TERMINATION
We may terminate or suspend your account immediately, without prior notice or liability.

6. CHANGES TO TERMS
We reserve the right to modify or replace these Terms at any time.`,
      },
      privacy: {
        id: "privacy",
        label: "Privacy Policy",
        title: "Privacy Policy",
        version: "2.1",
        lastUpdated: "20 Jan 2024",
        isPublished: true,
        requireAcceptance: true,
        content: `Privacy Policy

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

2. HOW WE USE YOUR INFORMATION
- To provide and maintain our services
- To notify you about changes
- To provide customer support
- To gather analysis or valuable information

3. DATA SHARING
We may share your personal information in the following situations:
- With service providers
- For business transfers
- With your consent

4. DATA SECURITY
We implement appropriate security measures to protect your personal information.

5. YOUR RIGHTS
You have the right to access, update, or delete your personal information at any time.

6. CONTACT US
If you have questions about this Privacy Policy, please contact us.`,
      },
      nda: {
        id: "nda",
        label: "Non-Disclosure Agreement",
        title: "Non-Disclosure Agreement",
        version: "1.0",
        lastUpdated: "01 Jan 2024",
        isPublished: false,
        requireAcceptance: false,
        content: `Non-Disclosure Agreement (NDA)

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information that is proprietary to the Disclosing Party.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
- Hold and maintain the Confidential Information in strict confidence
- Not to use the Confidential Information for any purpose except as permitted
- Not to disclose any Confidential Information to third parties

3. TIME PERIODS
This Agreement shall remain in effect for a period of 2 years from the Effective Date.

4. RETURN OF MATERIALS
Upon termination of this Agreement, the Receiving Party shall return all materials containing Confidential Information.

5. REMEDIES
Both parties acknowledge that any breach may cause irreparable harm and agree that the Disclosing Party shall be entitled to seek equitable relief.

6. MISCELLANEOUS
This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction.`,
      },
      cookie: {
        id: "cookie",
        label: "Cookies Policy",
        title: "Cookies Policy",
        version: "1.2",
        lastUpdated: "05 Jan 2024",
        isPublished: true,
        requireAcceptance: false,
        content: `Cookies Policy

1. WHAT ARE COOKIES
Cookies are small text files that are placed on your computer or mobile device when you visit a website.

2. HOW WE USE COOKIES
We use cookies for the following purposes:
- Essential cookies: Required for the operation of our website
- Analytics cookies: Help us understand how visitors interact with our website
- Functional cookies: Remember your preferences
- Targeting cookies: Record your visit to our website

3. TYPES OF COOKIES WE USE
- Session cookies: Temporary cookies that expire when you close your browser
- Persistent cookies: Remain on your device for a set period

4. MANAGING COOKIES
You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.

5. THIRD-PARTY COOKIES
Some cookies are placed by third-party services that appear on our pages.

6. UPDATES TO THIS POLICY
We may update this Cookie Policy from time to time.`,
      },
    }),
    []
  );

  const [agreements, setAgreements] = useState(defaultAgreements);
  const [activeId, setActiveId] = useState(activePolicy);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync activeId with prop
  useEffect(() => {
    if (activePolicy && agreements[activePolicy]) {
      setActiveId(activePolicy);
    }
  }, [activePolicy, agreements]);

  const active = agreements[activeId];

  const updateActive = (field, value) => {
    setAgreements((prev) => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setAgreements((prev) => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        lastUpdated: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      },
    }));
    setHasChanges(false);
    setIsEditing(false);
    alert(`${active.title} saved successfully!`);
  };

  const handleRemovePolicy = () => {
    const confirmed = window.confirm(`Are you sure you want to remove "${active.label}"? This action cannot be undone.`);
    if (!confirmed) return;

    setAgreements((prev) => {
      const copy = { ...prev };
      delete copy[activeId];
      return copy;
    });

    const remainingKeys = Object.keys(agreements).filter((k) => k !== activeId);
    setActiveId(remainingKeys[0] || "");
  };

  if (!active) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Policy Selected</h3>
        <p className="text-sm text-gray-500">Select a policy from the sidebar to view and edit.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-gray-800">{active.title}</h2>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  active.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {active.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Shield size={14} />
                Version {active.version}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                Updated {active.lastUpdated}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                isEditing
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Edit3 size={16} />
              {isEditing ? 'Cancel Edit' : 'Edit'}
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                hasChanges
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Toggle Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Published Toggle */}
          <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              {active.isPublished ? (
                <Eye size={20} className="text-green-600" />
              ) : (
                <EyeOff size={20} className="text-gray-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800">Published</p>
                <p className="text-xs text-gray-400">Visible to all users</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={!!active.isPublished}
                onChange={() => updateActive("isPublished", !active.isPublished)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  active.isPublished ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    active.isPublished ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </label>

          {/* Require Acceptance Toggle */}
          <label className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Shield size={20} className={active.requireAcceptance ? "text-blue-600" : "text-gray-400"} />
              <div>
                <p className="text-sm font-semibold text-gray-800">Require Acceptance</p>
                <p className="text-xs text-gray-400">Users must accept to continue</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={!!active.requireAcceptance}
                onChange={() => updateActive("requireAcceptance", !active.requireAcceptance)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  active.requireAcceptance ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    active.requireAcceptance ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </label>
        </div>

        {/* Content Editor */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText size={16} />
              Policy Content
            </p>
            <span className="text-xs text-gray-400">
              {active.content.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <div className="p-4">
            {isEditing ? (
              <textarea
                value={active.content}
                onChange={(e) => updateActive("content", e.target.value)}
                rows={16}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none font-mono leading-relaxed"
                placeholder="Enter policy content here..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg min-h-[400px] max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                  {active.content}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Info & Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl flex-1">
            <AlertCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700">
              Changes will be reflected wherever this policy is displayed. Make sure to review
              the content carefully before publishing. All updates are logged for compliance purposes.
            </p>
          </div>

          <button
            onClick={handleRemovePolicy}
            className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Trash2 size={16} />
            Remove Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementSettings;