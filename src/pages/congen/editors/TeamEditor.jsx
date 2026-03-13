// components/editors/TeamEditor.jsx
import { useState } from 'react';
import { 
  Users, 
  Pencil, 
  Save, 
  X, 
  Plus, 
  Sparkles, 
  Linkedin, 
  Instagram, 
  Twitter,
  Trash2,
  Upload,
  GripVertical,
  Check,
  Search,
  RotateCcw,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const TeamEditor = ({ lesson, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Available experts pool (can be fetched from API)
  const [availableExperts] = useState([
   
   
    {
      id: 101,
      name: "Gajendra Singh",
      role: "AI Specialist",
      course: "AI for Business",
      status: "Active",
      duration: "3 Months",
      active: true,
      image: "https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    },
     {
      id: 102,
      name: "Sumit Sharma",
      role: "Business Strategy Mentor",
      course: "Business Strategy",
      status: "Inactive",
      duration: "Last 2 months",
      active: false,
      image: "https://i.pravatar.cc/150?img=12",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    },
    {
      id: 103,
      name: "Shakti Pratap",
      role: "Career Coach",
      course: "Career Growth",
      status: "Active",
      duration: "14 Months",
      active: true,
      image: "https://www.caasaa.com/assets/images/shaktisir-caasaa.jpeg",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    },
    {
      id: 104,
      name: "Khusal Chopra",
      role: "Data Science Lead",
      course: "Data Science",
      status: "Inactive",
      duration: "Last 6 months",
      active: false,
      image: "https://www.caasaa.com/assets/images/caasaa-team3.webp",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    },
    {
      id: 105,
      name: "Priya Sharma",
      role: "Product Designer",
      course: "UI/UX Design",
      status: "Active",
      duration: "8 Months",
      active: true,
      image: "https://www.caasaa.com/assets/images/caasaa-team3.webp",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    },
    {
      id: 106,
      name: "Rahul Verma",
      role: "Frontend Expert",
      course: "Web Development",
      status: "Active",
      duration: "12 Months",
      active: true,
      image: "https://www.caasaa.com/assets/images/caasaa-team3.webp",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    }
  ]);

  // Team data state
  const [teamData, setTeamData] = useState({
    title: lesson?.title || 'Expert Team',
    subtitle: lesson?.subtitle || 'Selected expert in this module',
    selectedIds: lesson?.selectedIds || [101, 103, 104], // IDs of selected experts
    members: lesson?.members || [
      {
        id: 1,
        name: "Sumit Sharma",
        role: "Product Mentor",
        image: "https://www.caasaa.com/assets/images/caasaa-team3.webp",
        social: { linkedin: "#", instagram: "#", twitter: "#" }
      },
      {
        id: 2,
        name: "Shakti Singh",
        role: "Product Designer & Strategist",
        image: "https://www.caasaa.com/assets/images/shaktisir-caasaa.jpeg",
        social: { linkedin: "#", instagram: "#", twitter: "#" }
      },
      {
        id: 3,
        name: "Gajendra Singh",
        role: "Frontend Engineer & UI Expert",
        image: "https://www.caasaa.com/assets/images/Gajendra-singh-Caasaa.jpg",
        social: { linkedin: "#", instagram: "#", twitter: "#" }
      }
    ]
  });

  const [tempData, setTempData] = useState({ ...teamData });
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleEdit = () => { 
    setTempData({ ...teamData }); 
    setIsEditing(true); 
  };
  
  const handleSave = () => { 
    setTeamData({ ...tempData }); 
    onUpdate?.({ ...lesson, ...tempData }); 
    setIsEditing(false);
    setEditingMemberId(null);
  };
  
  const handleCancel = () => { 
    setTempData({ ...teamData }); 
    setIsEditing(false);
    setEditingMemberId(null);
  };

  // Toggle expert selection from table
  const toggleExpertSelection = (expertId) => {
    const isSelected = tempData.selectedIds.includes(expertId);
    if (isSelected) {
      setTempData({
        ...tempData,
        selectedIds: tempData.selectedIds.filter(id => id !== expertId)
      });
    } else {
      setTempData({
        ...tempData,
        selectedIds: [...tempData.selectedIds, expertId]
      });
    }
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setTempData({ ...tempData, selectedIds: [] });
    } else {
      setTempData({ 
        ...tempData, 
        selectedIds: filteredExperts.map(e => e.id) 
      });
    }
    setSelectAll(!selectAll);
  };

  // Get selected experts for display
  const getSelectedExperts = () => {
    return availableExperts.filter(e => 
      (isEditing ? tempData.selectedIds : teamData.selectedIds).includes(e.id)
    );
  };

  // Add new custom team member
  const addMember = () => {
    const newMember = {
      id: Date.now(),
      name: "New Expert",
      role: "Role Title",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      social: { linkedin: "#", instagram: "#", twitter: "#" }
    };
    setTempData({ 
      ...tempData, 
      members: [...tempData.members, newMember] 
    });
    setEditingMemberId(newMember.id);
  };

  // Remove team member
  const removeMember = (memberId) => {
    setTempData({
      ...tempData,
      members: tempData.members.filter(m => m.id !== memberId)
    });
    if (editingMemberId === memberId) {
      setEditingMemberId(null);
    }
  };

  // Update member field
  const updateMember = (memberId, field, value) => {
    setTempData({
      ...tempData,
      members: tempData.members.map(m => 
        m.id === memberId ? { ...m, [field]: value } : m
      )
    });
  };

  // Update member social
  const updateMemberSocial = (memberId, platform, value) => {
    setTempData({
      ...tempData,
      members: tempData.members.map(m => 
        m.id === memberId ? { 
          ...m, 
          social: { ...m.social, [platform]: value } 
        } : m
      )
    });
  };

  // Drag and Drop
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      return;
    }

    const newMembers = [...tempData.members];
    const draggedMember = newMembers[draggedIndex];
    newMembers.splice(draggedIndex, 1);
    newMembers.splice(dropIndex, 0, draggedMember);

    setTempData({ ...tempData, members: newMembers });
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Filter experts based on search
  const filteredExperts = availableExperts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-100 p-3 bg-gradient-to-r from-blue-50 to-indigo-50">
        <p className="font-medium text-sm text-slate-700 flex items-center gap-2">
          <Users size={16} className="text-blue-500" />
          Expert Team
        </p>
        {!isEditing && (
          <button 
            onClick={handleEdit} 
            className="p-1.5 hover:bg-white/50 rounded-md text-slate-500 hover:text-blue-600"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>

      <div className="p-4">
        {!isEditing ? (
          /* ==================== VIEW MODE ==================== */
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              {/* Table Header */}
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Select Experts</h2>
                  <p className="text-[10px] text-gray-400">
                    {tempData.selectedIds.length} selected from {availableExperts.length} available
                  </p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search expert..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto max-h-[300px] overflow-y-auto thin-scrollbar">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-gray-50/95 backdrop-blur-sm">
                    <tr>
                      <th className="p-3 w-12 text-center">
                        <div className="flex flex-col items-center gap-0 text-blue-400">
                          <input 
                            type="checkbox" 
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            className="rounded border-gray-300 mb-1 text-blue-600" 
                          />
                         
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                          Expert
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                          Course 
                        </div>
                      </th>
                      <th className="p-3">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                          Status 
                        </div>
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-gray-50">
                    {filteredExperts.map((expert) => {
                      const isSelected = tempData.selectedIds.includes(expert.id);
                      return (
                        <tr 
                          key={expert.id} 
                          onClick={() => toggleExpertSelection(expert.id)}
                          className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={() => toggleExpertSelection(expert.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded border-gray-300 text-blue-600" 
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img 
                                src={expert.image} 
                                className="w-9 h-9 rounded-lg object-cover" 
                                alt={expert.name} 
                              />
                              <div>
                                <span className={`font-bold text-xs cursor-pointer hover:underline ${
                                  isSelected ? 'text-blue-600' : 'text-gray-700'
                                }`}>
                                  {expert.name}
                                </span>
                                <p className="text-[10px] text-gray-400">{expert.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-xs text-gray-600 font-medium">
                            {expert.course}
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded w-fit uppercase ${
                                expert.active ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-400'
                              }`}>
                                {expert.status}
                              </span>
                              <span className="text-[10px] text-gray-400 mt-0.5">{expert.duration}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredExperts.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    No experts found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
            {/* Subtitle */}
            <h3 className="text-gray-500 text-sm mb-6">{teamData.subtitle}</h3>
            
            {/* Expert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Selected from pool */}
              {getSelectedExperts().map((expert) => (
                <div 
                  key={expert.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-500 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-5">
                    <h4 className="font-bold text-gray-800 text-sm">{expert.name}</h4>
                    <p className="text-gray-400 text-xs mb-4">{expert.role}</p>
                    <img 
                      src={expert.image} 
                      className="w-full h-48 object-cover rounded-xl mb-4" 
                      alt={expert.name} 
                    />
                    <div className="flex justify-center gap-3 mt-4">
                      <a 
                        href={expert.social.linkedin}
                        className="w-8 h-8 rounded-full border flex items-center justify-center text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
                      >
                        <Linkedin size={16} />
                      </a>
                      <a 
                        href={expert.social.instagram}
                        className="w-8 h-8 rounded-full border flex items-center justify-center  text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
                      >
                        <Instagram size={16} />
                      </a>
                      <a 
                        href={expert.social.twitter}
                        className="w-8 h-8 rounded-full border flex items-center justify-center  text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer transition-colors"
                      >
                        <Twitter size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            
            </div>

            {/* Preview Note */}
            <div className="border-t border-slate-200 pt-4 mt-6">
              <p className="text-xs text-slate-400 text-center">
                💡 Click edit to select experts from the list or add custom team members
              </p>
            </div>
          </>
        ) : (
          /* ==================== EDIT MODE ==================== */
          <>
            {/* Section Settings */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Section Title</label>
                <input
                  type="text"
                  value={tempData.title}
                  onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-400 outline-none"
                  placeholder="Expert Team"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Subtitle</label>
                <input
                  type="text"
                  value={tempData.subtitle}
                  onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-400 outline-none"
                  placeholder="Selected expert in this module"
                />
              </div>
            </div>

            {/* ==================== EXPERT SELECTION TABLE ==================== */}
          

            {/* Selected Experts Preview */}
            {tempData.selectedIds.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-medium text-slate-500 mb-3">
                  Selected from list ({tempData.selectedIds.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getSelectedExperts().map((expert) => (
                    <div 
                      key={expert.id}
                      className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5"
                    >
                      <img 
                        src={expert.image||"./demo.jpeg"} 
                        className="w-6 h-6 rounded-full object-cover" 
                        alt={expert.name} 
                      />
                      <span className="text-xs font-medium text-blue-700">{expert.name}</span>
                      <button 
                        onClick={() => toggleExpertSelection(expert.id)}
                        className="text-blue-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-xs text-slate-400 font-medium">OR ADD CUSTOM EXPERTS</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Custom Team Members Header */}
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">
                Custom Team Members ({tempData.members.length})
              </label>
              <button 
                onClick={addMember}
                className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-200 flex items-center gap-1"
              >
                <Plus size={12} /> Add Custom Expert
              </button>
            </div>

            {/* Custom Expert Cards Grid - Edit Mode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {tempData.members.map((expert, idx) => (
                <div 
                  key={expert.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={() => setDragOverIndex(null)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                  className={`bg-white rounded-xl border overflow-hidden transition-all ${
                    dragOverIndex === idx ? 'border-blue-500 border-2' : 'border-gray-200'
                  } ${editingMemberId === expert.id ? 'ring-2 ring-blue-200' : ''}`}
                >
                  <div className="p-4">
                    {/* Drag Handle & Actions */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-slate-400 cursor-grab active:cursor-grabbing">
                        <GripVertical size={16} />
                      </div>
                      <div className="flex gap-1">
                        {editingMemberId === expert.id ? (
                          <button 
                            onClick={() => setEditingMemberId(null)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check size={14} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => setEditingMemberId(expert.id)}
                            className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                        <button 
                          onClick={() => removeMember(expert.id)}
                          className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {editingMemberId === expert.id ? (
                      /* Individual Member Edit Mode */
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={expert.name}
                          onChange={(e) => updateMember(expert.id, 'name', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm font-bold border border-slate-200 rounded focus:border-blue-400 outline-none"
                          placeholder="Name"
                        />
                        
                        <input
                          type="text"
                          value={expert.role}
                          onChange={(e) => updateMember(expert.id, 'role', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded focus:border-blue-400 outline-none"
                          placeholder="Role / Designation"
                        />

                        <div className="relative">
                          <img 
                            src={expert.image} 
                            className="w-full h-32 object-cover rounded-lg" 
                            alt={expert.name} 
                          />
                          <label className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                            <div className="text-white text-center">
                              <Upload size={20} className="mx-auto mb-1" />
                              <span className="text-xs">Change Image</span>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  updateMember(expert.id, 'image', url);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <input
                          type="text"
                          value={expert.image}
                          onChange={(e) => updateMember(expert.id, 'image', e.target.value)}
                          className="w-full px-2 py-1.5 text-[10px] border border-slate-200 rounded focus:border-blue-400 outline-none"
                          placeholder="Or paste image URL..."
                        />

                        <div className="space-y-2">
                          <p className="text-[10px] font-medium text-slate-500">Social Links</p>
                          <div className="flex items-center gap-2">
                            <Linkedin size={12} className="text-blue-600 flex-shrink-0" />
                            <input
                              type="text"
                              value={expert.social.linkedin}
                              onChange={(e) => updateMemberSocial(expert.id, 'linkedin', e.target.value)}
                              placeholder="LinkedIn URL"
                              className="flex-1 px-2 py-1 text-[10px] border border-slate-200 rounded focus:border-blue-400 outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Instagram size={12} className="text-pink-600 flex-shrink-0" />
                            <input
                              type="text"
                              value={expert.social.instagram}
                              onChange={(e) => updateMemberSocial(expert.id, 'instagram', e.target.value)}
                              placeholder="Instagram URL"
                              className="flex-1 px-2 py-1 text-[10px] border border-slate-200 rounded focus:border-blue-400 outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Twitter size={12} className="text-sky-600 flex-shrink-0" />
                            <input
                              type="text"
                              value={expert.social.twitter}
                              onChange={(e) => updateMemberSocial(expert.id, 'twitter', e.target.value)}
                              placeholder="Twitter URL"
                              className="flex-1 px-2 py-1 text-[10px] border border-slate-200 rounded focus:border-blue-400 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Individual Member View Mode */
                      <>
                        <h4 className="font-bold text-gray-800 text-sm">{expert.name}</h4>
                        <p className="text-gray-400 text-xs mb-3">{expert.role}</p>
                        <img 
                          src={expert.image} 
                          className="w-full h-32 object-cover rounded-lg mb-3" 
                          alt={expert.name} 
                        />
                        <div className="flex gap-2">
                          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-blue-600 border-blue-100">
                            <Linkedin size={12} />
                          </div>
                          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-pink-600 border-pink-100">
                            <Instagram size={12} />
                          </div>
                          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-sky-600 border-sky-100">
                            <Twitter size={12} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Card Placeholder */}
              <div 
                onClick={addMember}
                className="border-2 border-dashed border-blue-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-blue-50/50 hover:border-blue-400 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Plus size={20} className="text-blue-600" />
                </div>
                <p className="text-sm font-medium text-blue-600">Add Custom Expert</p>
                <p className="text-[10px] text-slate-400 mt-1">Click to add manually</p>
              </div>
            </div>

            {/* AI Generate Button */}
            <button className="w-full py-2.5 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 text-sm font-medium hover:bg-blue-50 flex items-center justify-center gap-2 mb-4">
              <Sparkles size={14} /> Generate Team with AI
            </button>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <button 
                onClick={handleCancel} 
                className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1.5"
              >
                <Save size={14} /> Save Team
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamEditor;