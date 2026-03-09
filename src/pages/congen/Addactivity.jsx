import React, { useState } from "react";
import { Video, BookOpen, HelpCircle, Users, MessageSquare, X } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function AddActivityPopup({ isOpen, onClose }) {
  const [selected, setSelected] = useState(null);
  const [activityName, setActivityName] = useState("");

  if (!isOpen) return null;

  const activities = [
    { id: "video", icon: Video, label: "Video Activity" },
    { id: "reading", icon: BookOpen, label: "Reading Material" },
    { id: "quiz", icon: HelpCircle, label: "Quiz" },
    { id: "group", icon: Users, label: "Group Activity" },
    { id: "discussion", icon: MessageSquare, label: "Discussion" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[480px] rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Activity</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          <p className="text-sm font-medium mb-3 text-gray-700">
            Select Activity Type
          </p>

          {/* Activity Icons */}
          <div className="flex gap-3 mb-4">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  data-tooltip-id="activity-tooltip"
                  data-tooltip-content={item.label}
                  onClick={() => setSelected(item.id)}
                  className={`w-12 h-12 flex items-center justify-center rounded-lg border 
                  transition
                  ${
                    selected === item.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                </button>
              );
            })}
          </div>

          <Tooltip id="activity-tooltip" place="top" />

          {/* Input */}
          <input
            type="text"
            placeholder="Activity Name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Description */}
          <p className="text-xs text-red-500 mt-3">
            ConGen will create an activity of selected type the module, and you
            can edit, reorder, delete, or update it anytime manually or via AI
          </p>

          {/* Button */}
          <div className="flex justify-end mt-5">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700">
              Add Activity
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}