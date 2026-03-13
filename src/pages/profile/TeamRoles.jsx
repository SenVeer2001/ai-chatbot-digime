// components/settings/team/TeamRoles.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X, Shield, Users } from 'lucide-react';

const TeamRoles = ({ roles, setRoles, members }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', description: '', color: 'blue' });
  const [editRole, setEditRole] = useState({ name: '', description: '', color: 'blue' });

  const colors = [
    { id: 'blue', class: 'bg-blue-500', light: 'bg-blue-100 text-blue-700' },
    { id: 'green', class: 'bg-green-500', light: 'bg-green-100 text-green-700' },
    { id: 'purple', class: 'bg-purple-500', light: 'bg-purple-100 text-purple-700' },
    { id: 'orange', class: 'bg-orange-500', light: 'bg-orange-100 text-orange-700' },
    { id: 'pink', class: 'bg-pink-500', light: 'bg-pink-100 text-pink-700' },
    { id: 'gray', class: 'bg-gray-500', light: 'bg-gray-100 text-gray-700' }
  ];

  const getRoleColor = (colorId) => {
    const color = colors.find(c => c.id === colorId);
    return color ? color.light : 'bg-gray-100 text-gray-700';
  };

  const getMemberCount = (roleName) => {
    return members.filter(m => m.role === roleName).length;
  };

  const handleAddRole = () => {
    if (!newRole.name.trim()) return;
    
    const role = {
      id: Date.now(),
      name: newRole.name,
      description: newRole.description || `Custom ${newRole.name} role`,
      color: newRole.color,
      permissions: []
    };
    
    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', color: 'blue' });
    setShowAddForm(false);
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (getMemberCount(role.name) > 0) {
      alert('Cannot delete role with assigned members');
      return;
    }
    setRoles(roles.filter(r => r.id !== roleId));
  };

  const startEditRole = (role) => {
    setEditingRoleId(role.id);
    setEditRole({ name: role.name, description: role.description, color: role.color });
  };

  const handleUpdateRole = (roleId) => {
    setRoles(roles.map(r => 
      r.id === roleId ? { ...r, ...editRole } : r
    ));
    setEditingRoleId(null);
  };

  return (
    <div className="space-y-4">
      
      {/* Add Role Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className=" p-4 border-2  border-gray-300 rounded-xl bg-gray-700  text-white transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add New Role
        </button>
      )}

      {/* Add Role Form */}
      {showAddForm && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Shield size={16} className="text-blue-600" /> Create New Role
            </h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
                     
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="Role name"
              className="p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
            <input
              type="text"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder="Description"
              className="p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Select Color</label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setNewRole({ ...newRole, color: color.id })}
                  className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center ${
                    newRole.color === color.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                >
                  {newRole.color === color.id && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddRole}
            className="px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            Create Role
          </button>
        </div>
      )}

      {/* Roles List */}
      <div className="space-y-2">
        {roles.map((role) => (
          <div
            key={role.id}
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl"
          >
            {editingRoleId === role.id ? (
              /* Edit Mode */
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={editRole.name}
                    onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editRole.description}
                    onChange={(e) => setEditRole({ ...editRole, description: e.target.value })}
                    className="p-2 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setEditRole({ ...editRole, color: color.id })}
                      className={`w-6 h-6 rounded-full ${color.class} ${
                        editRole.color === color.id ? 'ring-2 ring-offset-1 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateRole(role.id)}
                    className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingRoleId(null)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(role.color)}`}>
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{role.name}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-medium flex items-center gap-1">
                        <Users size={10} /> {getMemberCount(role.name)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{role.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditRole(role)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <Edit3 size={14} />
                  </button>
                  {role.name !== 'Owner' && getMemberCount(role.name) === 0 && (
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRoles;