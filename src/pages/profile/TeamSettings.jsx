// components/settings/TeamSettings.jsx
import React, { useState } from 'react';
import { Users, Shield } from 'lucide-react';
import TeamMembers from './TeamMembers';
import TeamRoles from './TeamRoles';
import TeamGroups from './TeamGroups';

const TeamSettings = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [groups, setGroups] = useState([
    { id: 1, name: "Admins", memberIds: [1, 2], createdAt: "01 Mar 2026" },
    { id: 2, name: "Content Team", memberIds: [3], createdAt: "05 Mar 2026" },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Owner', color: 'dark', description: 'Full access to everything', permissions: ['all'] },
    { id: 2, name: 'Admin', color: 'medium', description: 'Can manage team and content', permissions: ['manage_team', 'manage_content'] },
    { id: 3, name: 'Editor', color: 'light', description: 'Can edit and publish content', permissions: ['edit_content', 'publish'] },
    { id: 4, name: 'Viewer', color: 'lighter', description: 'Can only view content', permissions: ['view'] }
  ]);

  const [members, setMembers] = useState([
    { id: 1, name: 'Gajendra Singh', email: 'gajendra@webkype.com', role: 'Owner', avatar: 'https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg', isYou: true, joinedAt: 'Jan 2024' },
    { id: 2, name: 'Shakti Pratap', email: 'shakti@webkype.com', role: 'Admin', avatar: 'https://www.caasaa.com/assets/images/shaktisir-caasaa.jpeg', isYou: false, joinedAt: 'Feb 2024' },
    { id: 3, name: 'Mariyam Chandel', email: 'mariyam@webkype.com', role: 'Chief Operating Officer', avatar: 'https://www.caasaa.com/assets/images/mariyammam-caasaa.jpeg', isYou: false, joinedAt: 'Mar 2024' }
  ]);

  const tabs = [
    { id: "members", label: "Team Members", icon: Users, count: members.length },
    { id: "roles", label: "Roles", icon: Shield, count: roles.length },
    { id: "groups", label: "Groups", icon: Users, count: groups.length },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Team Management</h2>
        <p className="text-sm text-gray-500">Manage team members and their roles</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-gray-800 text-gray-800 bg-gray-50'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded text-xs ${
              activeTab === tab.id ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5">
        {activeTab === 'members' && (
          <TeamMembers
            members={members}
            setMembers={setMembers}
            roles={roles}
          />
        )}
        {activeTab === 'roles' && (
          <TeamRoles
            roles={roles}
            setRoles={setRoles}
            members={members}
          />
        )}
        {activeTab === "groups" && (
          <TeamGroups members={members} groups={groups} setGroups={setGroups} />
        )}
      </div>
    </div>
  );
};

export default TeamSettings;