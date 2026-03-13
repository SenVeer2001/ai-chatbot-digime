// components/settings/team/TeamMembers.jsx
import React, { useState } from 'react';
import { Search, Plus, UserMinus, LogOut, Edit3, Check, X, Mail, Send } from 'lucide-react';

const TeamMembers = ({ members, setMembers, roles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editRole, setEditRole] = useState('');

  // Invite Modal States
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('Viewer');

  const getRoleColor = (roleName) => {
    const colors = {
      Owner: 'bg-purple-100 text-purple-700',
      Admin: 'bg-blue-100 text-blue-700',
      Editor: 'bg-green-100 text-green-700',
      Viewer: 'bg-gray-100 text-gray-600'
    };
    return colors[roleName] || 'bg-gray-100 text-gray-600';
  };

  // Email input handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(inputValue.trim())) {
        if (!emails.includes(inputValue.trim())) {
          setEmails([...emails, inputValue.trim()]);
        }
        setInputValue('');
      } else {
        alert('Please enter a valid email address');
      }
    } else if (e.key === 'Backspace' && !inputValue && emails.length > 0) {
      // Remove last email on backspace if input is empty
      setEmails(emails.slice(0, -1));
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleInvite = () => {
    if (emails.length === 0) {
      alert('Please add at least one email address');
      return;
    }

    const newMembers = emails.map((email) => ({
      id: Date.now() + Math.random(),
      name: email.split('@')[0],
      email: email,
      role: selectedRole,
      avatar: null,
      isYou: false,
      joinedAt: 'Pending',
      status: 'invited'
    }));

    setMembers([...members, ...newMembers]);
    
    // Reset modal state
    setEmails([]);
    setInputValue('');
    setSelectedRole('Viewer');
    setShowInviteModal(false);
  };

  const handleCloseModal = () => {
    setEmails([]);
    setInputValue('');
    setSelectedRole('Viewer');
    setShowInviteModal(false);
  };

  const handleRemove = (memberId) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const handleUpdateRole = (memberId) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: editRole } : m
    ));
    setEditingMemberId(null);
    setEditRole('');
  };

  const startEditRole = (member) => {
    setEditingMemberId(member.id);
    setEditRole(member.role);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      
      {/* Search & Add */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
        >
          <Plus size={16} /> Invite Member
        </button>
      </div>

      {/* Invite Team Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Invite team members</h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Emails Input Section */}
                <div className="grid grid-cols-4 gap-4 items-start">
                  <div className="col-span-3">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Emails</label>
                    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-200 rounded-lg focus-within:ring-1 focus-within:ring-gray-400 min-h-[42px] bg-white">
                      {emails.map((email) => (
                        <span 
                          key={email} 
                          className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md border border-gray-200"
                        >
                          {email}
                          <button 
                            onClick={() => removeEmail(email)} 
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={emails.length === 0 ? "Enter emails..." : ""}
                        className="flex-1 outline-none text-sm min-w-[120px] bg-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Press Enter to add email</p>
                  </div>

                  {/* Role Selection */}
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Role</label>
                    <div className="relative">
                      <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-gray-400 appearance-none cursor-pointer"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400 w-0 h-0"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invite to Projects Section */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Invite to projects</label>
                  <div className="relative">
                    <select className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 outline-none cursor-not-allowed appearance-none">
                      <option>No projects selected</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400 w-0 h-0"></div>
                    </div>
                  </div>
                </div>

                {/* Email Count Indicator */}
                {emails.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} />
                    <span>{emails.length} email{emails.length > 1 ? 's' : ''} will be invited as <strong className="text-gray-700">{selectedRole}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-10">
                <button 
                  onClick={handleCloseModal}
                  className="px-5 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleInvite}
                  disabled={emails.length === 0}
                  className={`px-5 py-2 text-sm font-bold text-white rounded-lg transition-colors ${
                    emails.length === 0 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-[#101112] hover:bg-black'
                  }`}
                >
                  Invite {emails.length > 0 && `(${emails.length})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-2">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 uppercase">
                  {member.name.charAt(0)}
                </div>
              )}

              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{member.name}</span>
                  {member.isYou && (
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">You</span>
                  )}
                  {member.status === 'invited' && (
                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded font-bold">Pending</span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{member.email}</p>
              </div>
            </div>

            {/* Role & Actions */}
            <div className="flex items-center gap-3">
              {editingMemberId === member.id ? (
                <div className="flex items-center gap-2">
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleUpdateRole(member.id)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setEditingMemberId(null)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                  <button
                    onClick={() => startEditRole(member)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleRemove(member.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                  >
                    {member.isYou ? <LogOut size={14} /> : <UserMinus size={14} />}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No members found
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;