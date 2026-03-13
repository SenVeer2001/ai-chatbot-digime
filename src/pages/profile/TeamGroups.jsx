// components/settings/team/TeamGroups.jsx
import React, { useMemo, useState } from "react";
import { Plus, Search, Users, Trash2, Edit3, Check, X, UserPlus } from "lucide-react";

const TeamGroups = ({ members, groups, setGroups }) => {
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  const [newGroup, setNewGroup] = useState({
    name: "",
    memberIds: [],
  });

  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editName, setEditName] = useState("");

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
    );
  }, [members, search]);

  const toggleNewMember = (id) => {
    setNewGroup((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(id)
        ? prev.memberIds.filter((x) => x !== id)
        : [...prev.memberIds, id],
    }));
  };

  const createGroup = () => {
    if (!newGroup.name.trim()) return;

    setGroups((prev) => [
      {
        id: Date.now(),
        name: newGroup.name.trim(),
        memberIds: newGroup.memberIds,
        createdAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      },
      ...prev,
    ]);

    setNewGroup({ name: "", memberIds: [] });
    setCreating(false);
    setSearch("");
  };

  const deleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    if (editingGroupId === groupId) {
      setEditingGroupId(null);
      setEditName("");
    }
  };

  const startEdit = (group) => {
    setEditingGroupId(group.id);
    setEditName(group.name);
  };

  const saveEdit = (groupId) => {
    if (!editName.trim()) return;
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name: editName.trim() } : g))
    );
    setEditingGroupId(null);
    setEditName("");
  };

  const toggleGroupMember = (groupId, memberId) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const exists = g.memberIds.includes(memberId);
        return {
          ...g,
          memberIds: exists
            ? g.memberIds.filter((x) => x !== memberId)
            : [...g.memberIds, memberId],
        };
      })
    );
  };

  const getMember = (id) => members.find((m) => m.id === id);

  return (
    <div className="space-y-4">
      {/* Create Group CTA */}
      {!creating ? (
        <button
          onClick={() => setCreating(true)}
          className="w-full p-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={18} /> Create New Group
        </button>
      ) : (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Users size={16} className="text-blue-600" /> New Group
            </h3>
            <button
              onClick={() => {
                setCreating(false);
                setNewGroup({ name: "", memberIds: [] });
              }}
              className="p-1.5 rounded-lg hover:bg-white/60 text-gray-500"
            >
              <X size={16} />
            </button>
          </div>

          {/* Group name */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-2 uppercase">
              Group Name
            </label>
            <input
              value={newGroup.name}
              onChange={(e) => setNewGroup((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Content Team / Admins / QA"
              className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          {/* Member picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase">
                Add Members
              </label>
              <span className="text-[11px] text-gray-500">
                Selected: <span className="font-semibold">{newGroup.memberIds.length}</span>
              </span>
            </div>

            <div className="relative mb-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="max-h-56 overflow-y-auto space-y-2 pr-1 thin-scrollbar">
              {filteredMembers.map((m) => {
                const checked = newGroup.memberIds.includes(m.id);
                return (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer ${
                      checked ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleNewMember(m.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center uppercase">
                        {m.name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {m.role}
                    </span>
                  </label>
                );
              })}
              {!filteredMembers.length && (
                <div className="text-center text-sm text-gray-400 py-6">
                  No members found.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setCreating(false);
                setNewGroup({ name: "", memberIds: [] });
              }}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={createGroup}
              className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Group
            </button>
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="space-y-2">
        {groups.map((g) => (
          <div key={g.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Group Header */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-3">
              <div className="min-w-0">
                {editingGroupId === g.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(g.id)}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingGroupId(null);
                        setEditName("");
                      }}
                      className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-gray-800 truncate">{g.name}</p>
                    <p className="text-xs text-gray-400">
                      {g.memberIds.length} members • Created {g.createdAt}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingGroupId !== g.id && (
                  <button
                    onClick={() => startEdit(g)}
                    className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                    title="Rename"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
                <button
                  onClick={() => deleteGroup(g.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  title="Delete group"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Members chips + quick add/remove */}
            <div className="p-4 space-y-3">
              {/* Current members */}
              <div className="flex flex-wrap gap-2">
                {g.memberIds.map((id) => {
                  const m = getMember(id);
                  if (!m) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                        {m.name?.[0] || "U"}
                      </div>
                      <span className="text-xs font-semibold text-blue-700">{m.name}</span>
                      <button
                        onClick={() => toggleGroupMember(g.id, id)}
                        className="text-blue-400 hover:text-red-500"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
                {g.memberIds.length === 0 && (
                  <p className="text-sm text-gray-400">No members in this group.</p>
                )}
              </div>

              {/* Quick add members (minimal) */}
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-blue-600 flex items-center gap-2 select-none">
                  <UserPlus size={16} />
                  Add/Remove members
                </summary>

                <div className="mt-3 max-h-56 overflow-y-auto space-y-2 pr-1 thin-scrollbar">
                  {members.map((m) => {
                    const checked = g.memberIds.includes(m.id);
                    return (
                      <label
                        key={m.id}
                        className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer ${
                          checked ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleGroupMember(g.id, m.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center uppercase">
                            {m.name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                            <p className="text-xs text-gray-400">{m.email}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {m.role}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>
        ))}

        {!groups.length && (
          <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
            <p className="text-sm font-semibold text-gray-700">No groups yet</p>
            <p className="text-sm text-gray-400 mt-1">Create a group to organize members.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamGroups;