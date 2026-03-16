// components/settings/team/TeamMembers.jsx
import React, { useState } from 'react';
import { Search, Plus, UserMinus, LogOut, Edit3, Check, X, Mail, Send, Eye, Phone, Calendar, User, Briefcase, ChevronDown } from 'lucide-react';

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
  const [selectedInviteProjects, setSelectedInviteProjects] = useState([]);
  const [emailError, setEmailError] = useState('');

  // View Modal States
  const [viewModalRole, setViewModalRole] = useState('');
  const [viewModalProjects, setViewModalProjects] = useState([]);

  // Available Projects
  const projects = [
    { id: 'aicha', name: 'AICHA™', description: 'AI Chat Assistant' },
    { id: 'digimee', name: 'DigiMee™', description: 'Digital Avatar Platform' },
    { id: 'congen', name: 'ConGen™', description: 'Content Generator' },
    { id: 'aida', name: 'AIDA™', description: 'AI Data Analytics' },
    { id: 'aica-crm', name: 'AICA-CRM™', description: 'AI Customer Relationship' }
  ];

  const getRoleColor = (roleName) => {
    const colors = {
      Owner: 'bg-gray-200 text-gray-800',
      Admin: 'bg-gray-200 text-gray-700',
      Editor: 'bg-gray-100 text-gray-700',
      Viewer: 'bg-gray-100 text-gray-600'
    };
    return colors[roleName] || 'bg-gray-100 text-gray-600';
  };

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Add email to list
  const addEmail = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Clear previous error
    setEmailError('');

    // Validate email
    if (!trimmedEmail) {
      return false;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    // Check for duplicate
    if (emails.includes(trimmedEmail)) {
      setEmailError('This email is already added');
      return false;
    }

    // Check if already a member
    const existingMember = members.find(m => m.email.toLowerCase() === trimmedEmail);
    if (existingMember) {
      setEmailError('This email is already a team member');
      return false;
    }

    // Add email
    setEmails(prev => [...prev, trimmedEmail]);
    setInputValue('');
    return true;
  };

 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        addEmail(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && emails.length > 0) {
      
      setEmails(prev => prev.slice(0, -1));
      setEmailError('');
    } else if (e.key === ',' || e.key === ' ') {
     
      e.preventDefault();
      if (inputValue.trim()) {
        addEmail(inputValue);
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setEmailError(''); 
  };

  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedEmails = pastedText.split(/[\s,;]+/).filter(email => email.trim());
    
    let addedCount = 0;
    let invalidEmails = [];
    
    pastedEmails.forEach(email => {
      if (isValidEmail(email) && !emails.includes(email.toLowerCase())) {
        setEmails(prev => [...prev, email.toLowerCase()]);
        addedCount++;
      } else if (!isValidEmail(email)) {
        invalidEmails.push(email);
      }
    });

    if (invalidEmails.length > 0) {
      setEmailError(`${invalidEmails.length} invalid email(s) were skipped`);
    }
  };
  
  // Remove email from list
  const removeEmail = (emailToRemove) => {
    setEmails(prev => prev.filter(email => email !== emailToRemove));
    setEmailError('');
  };

  // Toggle project selection for invite modal
  const toggleInviteProject = (projectId) => {
    setSelectedInviteProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Toggle project selection for view modal
  const toggleViewProject = (projectId) => {
    setViewModalProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Handle invite button click
  const handleInvite = () => {
    console.log('Invite button clicked');
    console.log('Emails:', emails);
    console.log('Selected Role:', selectedRole);
    console.log('Selected Projects:', selectedInviteProjects);

    if (emails.length === 0) {
      setEmailError('Please add at least one email address');
      return;
    }

    // Create new members
    const newMembers = emails.map((email) => ({
      id: Date.now() + Math.random(),
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      phone: '+91 XXXXX XXXXX',
      role: selectedRole,
      avatar: null,
      isYou: false,
      joinedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'invited',
      projects: [...selectedInviteProjects]
    }));

    console.log('New members to add:', newMembers);

    // Update members
    setMembers(prevMembers => [...prevMembers, ...newMembers]);

    // Reset form
    setEmails([]);
    setInputValue('');
    setSelectedRole('Viewer');
    setSelectedInviteProjects([]);
    setEmailError('');
    setShowInviteModal(false);

    // Show success message
    alert(`Successfully invited ${newMembers.length} member${newMembers.length > 1 ? 's' : ''}!`);
  };

  // Close invite modal
  const handleCloseModal = () => {
    setEmails([]);
    setInputValue('');
    setSelectedRole('Viewer');
    setSelectedInviteProjects([]);
    setEmailError('');
    setShowInviteModal(false);
  };

  // Remove member
  const handleRemove = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(prevMembers => prevMembers.filter(m => m.id !== memberId));
      setShowViewModal(false);
      setSelectedMember(null);
    }
  };

  // Update role inline
  const handleUpdateRole = (memberId) => {
    setMembers(prevMembers => prevMembers.map(m => 
      m.id === memberId ? { ...m, role: editRole } : m
    ));
    setEditingMemberId(null);
    setEditRole('');
  };

  // Update role from view modal
  const handleViewModalRoleUpdate = () => {
    if (selectedMember && viewModalRole) {
      setMembers(prevMembers => prevMembers.map(m => 
        m.id === selectedMember.id ? { ...m, role: viewModalRole } : m
      ));
      setSelectedMember(prev => ({ ...prev, role: viewModalRole }));
      alert('Role updated successfully!');
    }
  };

  // Update projects from view modal
  const handleViewModalProjectsUpdate = () => {
    if (selectedMember) {
      setMembers(prevMembers => prevMembers.map(m => 
        m.id === selectedMember.id ? { ...m, projects: [...viewModalProjects] } : m
      ));
      setSelectedMember(prev => ({ ...prev, projects: [...viewModalProjects] }));
      alert('Projects updated successfully!');
    }
  };

  // Start editing role
  const startEditRole = (member) => {
    setEditingMemberId(member.id);
    setEditRole(member.role);
  };

  // Open view modal
  const openViewModal = (member) => {
    setSelectedMember(member);
    setViewModalRole(member.role);
    setViewModalProjects(member.projects || []);
    setShowViewModal(true);
  };

  // Close view modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedMember(null);
    setViewModalRole('');
    setViewModalProjects([]);
  };

  // Filter members
  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if projects have changed
  const projectsChanged = () => {
    const currentProjects = (selectedMember?.projects || []).sort().join(',');
    const newProjects = viewModalProjects.sort().join(',');
    return currentProjects !== newProjects;
  };

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
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> Invite Member
        </button>
      </div>

      {/* Invite Team Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-[550px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Invite team members</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-5">
                
                {/* Emails Input Section */}
                <div className="grid grid-cols-4 gap-4 items-start">
                  <div className="col-span-3">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Emails <span className="text-gray-400">*</span>
                    </label>
                    <div 
                      className={`flex flex-wrap items-center gap-2 p-2 border rounded-lg min-h-[44px] bg-white transition-colors ${
                        emailError ? 'border-red-300 focus-within:ring-1 focus-within:ring-red-400' : 'border-gray-200 focus-within:ring-1 focus-within:ring-gray-400'
                      }`}
                    >
                      {emails.map((email) => (
                        <span 
                          key={email} 
                          className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md border border-gray-200"
                        >
                          {email}
                          <button 
                            type="button"
                            onClick={() => removeEmail(email)} 
                            className="hover:text-gray-900 transition-colors ml-1"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="email"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        onBlur={() => {
                          if (inputValue.trim()) {
                            addEmail(inputValue);
                          }
                        }}
                        placeholder={emails.length === 0 ? "Enter email address..." : "Add more..."}
                        className="flex-1 outline-none text-sm min-w-[150px] bg-transparent"
                      />
                    </div>
                    {emailError ? (
                      <p className="text-xs text-red-500 mt-1">{emailError}</p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">Press Enter, comma, or space to add email</p>
                    )}
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
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Assign to Projects Section */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Assign to Projects</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                    {projects.map((project) => {
                      const isSelected = selectedInviteProjects.includes(project.id);
                      return (
                        <label
                          key={project.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-gray-200 border-gray-300' 
                              : 'bg-white border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleInviteProject(project.id)}
                            className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">{project.name}</p>
                            <p className="text-xs text-gray-500">{project.description}</p>
                          </div>
                          {isSelected && (
                            <Check size={16} className="text-gray-700 flex-shrink-0" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {selectedInviteProjects.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      {selectedInviteProjects.length} project{selectedInviteProjects.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Summary */}
                {emails.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Mail size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      <strong className="text-gray-800">{emails.length}</strong> member{emails.length > 1 ? 's' : ''} will be invited as <strong className="text-gray-800">{selectedRole}</strong>
                      {selectedInviteProjects.length > 0 && (
                        <span> with access to <strong className="text-gray-800">{selectedInviteProjects.length} project{selectedInviteProjects.length > 1 ? 's' : ''}</strong></span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0 bg-gray-50">
              <button 
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleInvite}
                disabled={emails.length === 0}
                className={`px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors flex items-center gap-2 ${
                  emails.length === 0 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                <Send size={14} />
                Send Invite{emails.length > 0 && ` (${emails.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-900">Member Details</h2>
              <button 
                onClick={closeViewModal}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Profile Section */}
              <div className="flex flex-col items-center mb-6">
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
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Mail size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.phone || '+91 XXXXX XXXXX'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Calendar size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Active From</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedMember.joinedAt || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase size={18} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Assigned Projects</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMember.projects && selectedMember.projects.length > 0 ? (
                        selectedMember.projects.map(projectId => {
                          const project = projects.find(p => p.id === projectId);
                          return project ? (
                            <span 
                              key={projectId}
                              className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-medium"
                            >
                              {project.name}
                            </span>
                          ) : null;
                        })
                      ) : (
                        <span className="text-sm text-gray-400">No projects assigned</span>
                      )}
                    </div>
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
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <button
                    type="button"
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

              {/* Assign Projects Section */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-gray-700">Assign Projects</label>
                  <span className="text-xs text-gray-500">
                    {viewModalProjects.length} of {projects.length} selected
                  </span>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                  {projects.map((project) => {
                    const isSelected = viewModalProjects.includes(project.id);
                    return (
                      <label
                        key={project.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-gray-200 border-gray-300' 
                            : 'bg-white border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleViewProject(project.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{project.name}</p>
                          <p className="text-xs text-gray-500">{project.description}</p>
                        </div>
                        {isSelected && (
                          <Check size={16} className="text-gray-700 flex-shrink-0" />
                        )}
                      </label>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleViewModalProjectsUpdate}
                  disabled={!projectsChanged()}
                  className={`w-full mt-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    !projectsChanged()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Update Project Access
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between flex-shrink-0">
              <button
                type="button"
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
                type="button"
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
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 uppercase">
                  {member.name.charAt(0)}
                </div>
              )}

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
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400">{member.email}</p>
                  {member.projects && member.projects.length > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-500">
                        {member.projects.length} project{member.projects.length > 1 ? 's' : ''}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

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
                    type="button"
                    onClick={() => handleUpdateRole(member.id)}
                    className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    type="button"
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
                    type="button"
                    onClick={() => openViewModal(member)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    title="View Details"
                  >
                    <Eye size={14} />
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