import React, { useMemo, useState } from "react";
import {
  FileText,
  Save,
  Check,
  Trash2,
  AlertCircle,
} from "lucide-react";

const AgreementSettings = () => {
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
        content:
          "Terms & Conditions\n\n1. Acceptance of terms...\n2. User responsibilities...\n3. Limitations...\n",
      },
      privacy: {
        id: "privacy",
        label: "Privacy Policy",
        title: "Privacy Policy",
        version: "1.0",
        lastUpdated: "20 Jan 2024",
        isPublished: true,
        requireAcceptance: true,
        content:
          "Privacy Policy\n\n1. What we collect...\n2. How we use data...\n3. Data sharing...\n",
      },
      nda: {
        id: "nda",
        label: "Non‑Disclosure Agreement",
        title: "Non‑Disclosure Agreement",
        version: "1.0",
        lastUpdated: "01 Jan 2024",
        isPublished: false,
        requireAcceptance: false,
        content:
          "NDA\n\n1. Confidential information...\n2. Obligations...\n3. Duration...\n",
      },
      cookie: {
        id: "cookie",
        label: "Cookies Policy",
        title: "Cookies Policy",
        version: "1.0",
        lastUpdated: "05 Jan 2024",
        isPublished: true,
        requireAcceptance: false,
        content:
          "Cookies Policy\n\n1. What are cookies...\n2. How we use cookies...\n3. Manage cookies...\n",
      },
    }),
    []
  );

  const [agreements, setAgreements] = useState(defaultAgreements);

  // active submenu selection
  const [activeId, setActiveId] = useState("terms");

  const active = agreements[activeId];

  const updateActive = (field, value) => {
    setAgreements((prev) => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        [field]: value,
      },
    }));
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
    alert(`${active.title} saved`);
  };

  const handleRemovePolicy = () => {
    const confirmed = window.confirm(`Remove "${active.label}"?`);
    if (!confirmed) return;

    setAgreements((prev) => {
      const copy = { ...prev };
      delete copy[activeId];
      return copy;
    });

    // pick next available submenu
    const remainingKeys = Object.keys(agreements).filter((k) => k !== activeId);
    setActiveId(remainingKeys[0] || "");
  };

  const menuItems = Object.values(agreements);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Agreements & Policies</h2>
        <p className="text-sm text-gray-500">
          Select a policy from the left and update its content.
        </p>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT SUBMENU */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <FileText size={12} /> Policies
                </p>
              </div>

              <div className="p-2 space-y-1">
                {menuItems.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-white text-gray-700"
                      }`}
                    >
                      <span className="text-sm font-semibold">{item.label}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.isPublished ? "Live" : "Hidden"}
                      </span>
                    </button>
                  );
                })}

                {menuItems.length === 0 && (
                  <div className="p-6 text-center text-sm text-gray-400">
                    No policies available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-8">
            {!active ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
                Select a policy from the left.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Top meta */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{active.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Version <span className="font-semibold text-gray-600">{active.version}</span> •
                        Updated{" "}
                        <span className="font-semibold text-gray-600">{active.lastUpdated}</span>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleRemovePolicy}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 flex items-center gap-2"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Save size={16} /> Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={!!active.isPublished}
                      onChange={() => updateActive("isPublished", !active.isPublished)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Published</p>
                      <p className="text-xs text-gray-400">
                        Show this policy on your public pages.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={!!active.requireAcceptance}
                      onChange={() =>
                        updateActive("requireAcceptance", !active.requireAcceptance)
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Require acceptance</p>
                      <p className="text-xs text-gray-400">
                        Users must accept this policy before continuing.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Content editor */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                    <p className="text-sm font-semibold text-blue-700">
                      Policy Content
                    </p>
                  </div>

                  <div className="p-4">
                    <textarea
                      value={active.content}
                      onChange={(e) => updateActive("content", e.target.value)}
                      rows={12}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {active.content.split(/\s+/).filter(Boolean).length} words
                    </p>
                  </div>
                </div>

                {/* Info box */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    After saving, your updates will be used wherever this policy is displayed.
                    Review carefully before publishing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementSettings;