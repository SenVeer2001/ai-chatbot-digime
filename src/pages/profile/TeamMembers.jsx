// components/settings/team/TeamMembers.jsx
import React, { useState } from 'react';
import { Search, Plus, UserMinus, LogOut, Edit3, Check, X, Mail, Send, Eye, Phone, Calendar, User } from 'lucide-react';

const TeamMembers = ({ members, setMembers, roles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editRole, setEditRole] = useState('');

  // Invite Modal States
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('Viewer');

  // View Modal Role State
  const [viewModalRole, setViewModalRole] = useState('');

  const getRoleColor = (roleName) => {
    const colors = {
      Owner: 'bg-gray-200 text-gray-800',
      Admin: 'bg-gray-200 text-gray-700',
      Editor: 'bg-gray-100 text-gray-700',
      Viewer: 'bg-gray-100 text-gray-600'
    };
    return colors[roleName] || 'bg-gray-100 text-gray-600';
  };

  // Email input handlers
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
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
      phone: '+91 XXXXX XXXXX',
      role: selectedRole,
      avatar: null,
      isYou: false,
      joinedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'invited'
    }));

    setMembers([...members, ...newMembers]);
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
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(m => m.id !== memberId));
      setShowViewModal(false);
      setSelectedMember(null);
    }
  };

  const handleUpdateRole = (memberId) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: editRole } : m
    ));
    setEditingMemberId(null);
    setEditRole('');
  };

  const handleViewModalRoleUpdate = () => {
    if (selectedMember && viewModalRole) {
      setMembers(members.map(m => 
        m.id === selectedMember.id ? { ...m, role: viewModalRole } : m
      ));
      setSelectedMember({ ...selectedMember, role: viewModalRole });
      alert('Role updated successfully!');
    }
  };

  const startEditRole = (member) => {
    setEditingMemberId(member.id);
    setEditRole(member.role);
  };

  const openViewModal = (member) => {
    setSelectedMember(member);
    setViewModalRole(member.role);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedMember(null);
    setViewModalRole('');
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
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
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
                            className="hover:text-gray-900 transition-colors"
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
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Invite {emails.length > 0 && `(${emails.length})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-[450px] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Member Details</h2>
              <button 
                onClick={closeViewModal}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
                {/* Avatar */}
                {selectedMember.avatar ? (
                  <img 
                    src={selectedMember.avatar} 
                    alt={selectedMember.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600 border-4 border-gray-100 shadow-md">
                    {selectedMember.name.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Name & Role Badge */}
                <h3 className="text-xl font-bold text-gray-800 mt-4">{selectedMember.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getRoleColor(selectedMember.role)}`}>
                    {selectedMember.role}
                  </span>
                  {selectedMember.isYou && (
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded font-bold">You</span>
                  )}
                  {selectedMember.status === 'invited' && (
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded font-bold">Pending</span>
                  )}
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.phone || '+91 XXXXX XXXXX'}</p>
                  </div>
                </div>

                {/* Active From */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Calendar size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Active From</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.joinedAt || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Change Role Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Change Role</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <select 
                      value={viewModalRole}
                      onChange={(e) => setViewModalRole(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-gray-400 appearance-none cursor-pointer"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-400 w-0 h-0"></div>
                    </div>
                  </div>
                  <button
                    onClick={handleViewModalRoleUpdate}
                    disabled={viewModalRole === selectedMember.role}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      viewModalRole === selectedMember.role
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between">
              <button
                onClick={() => handleRemove(selectedMember.id)}
                disabled={selectedMember.isYou}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedMember.isYou
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <UserMinus size={16} />
                Remove User
              </button>
              <button
                onClick={closeViewModal}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
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
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 uppercase">
                  {member.name.charAt(0)}
                </div>
              )}

              {/* Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{member.name}</span>
                  {member.isYou && (
                    <span className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded font-bold">You</span>
                  )}
                  {member.status === 'invited' && (
                    <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-bold">Pending</span>
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
                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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
                  
                  {/* View Button */}
                  <button
                    onClick={() => openViewModal(member)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    title="View Details"
                  >
                    <Eye size={14} />
                  </button>
                  
                  {/* Edit Role Button */}
                  {/* <button
                    onClick={() => startEditRole(member)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    title="Edit Role"
                  >
                    <Edit3 size={14} />
                  </button> */}
                  
                  {/* Remove Button */}
                  {/* <button
                    onClick={() => handleRemove(member.id)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    title={member.isYou ? "Leave Team" : "Remove Member"}
                  >
                    {member.isYou ? <LogOut size={14} /> : <UserMinus size={14} />}
                  </button> */}
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