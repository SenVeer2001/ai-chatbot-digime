// components/settings/billing/UsageDashboard.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Download, ChevronDown, Calendar } from "lucide-react";

const UsageDashboard = () => {
  const mainData = [
    { date: "Feb 25", spend: 0.06 },
    { date: "Feb 26", spend: 0.01 },
    { date: "Feb 27", spend: 0.002 },
    { date: "Feb 28", spend: 0.005 },
    { date: "Mar 1", spend: 0.001 },
    { date: "Mar 12", spend: 0.001 },
  ];

  const tokenData = [
    { x: 0, y: 10 },
    { x: 5, y: 2 },
    { x: 10, y: 1 },
    { x: 15, y: 1 },
    { x: 20, y: 1 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2">
        <p className="text-[11px] text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-bold text-gray-800">${payload[0].value}</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Top Header */}
      <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Usage</h2>

        <div className="flex flex-wrap items-center gap-2">
          <button className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50">
            All projects
          </button>
          <button className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-full text-gray-700 flex items-center gap-2 hover:bg-gray-50">
            <Calendar size={14} /> 02/25/26 - 03/12/26 <ChevronDown size={14} />
          </button>
          <button className="text-xs font-bold flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <Download size={14} className="rotate-180" /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Chart */}
        <div className="flex-1 p-6 lg:border-r border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-500 font-semibold">Total Spend</p>
              <h3 className="text-2xl font-bold text-gray-900">$0.07</h3>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-xs text-gray-500 font-semibold flex items-center gap-1 hover:text-gray-700">
                Group by <ChevronDown size={12} />
              </button>
              <span className="bg-gray-100 text-gray-700 text-[10px] px-2 py-1 rounded font-bold border border-gray-200">
                1d
              </span>
            </div>
          </div>

          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mainData} margin={{ top: 20
                , right: 0, left: -30, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#9CA3AF" }}
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                <ReferenceLine y={0.06} stroke="#6B7280" strokeDasharray="3 2" />
                <Bar dataKey="spend" fill="#374151" radius={[6, 6, 0, 0]} barSize={34} />
              </BarChart>
            </ResponsiveContainer>

            <span className="absolute top-4 left-0 text-[10px] text-gray-600 font-bold">$0.06</span>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col divide-y divide-gray-100">
          {/* Budget */}
          <div className="p-6">
            <p className="text-xs text-gray-500 font-semibold mb-1">March budget</p>
            <h4 className="text-lg font-bold text-gray-900">
              $0.00 <span className="text-gray-300">/ $120</span>
            </h4>

            <div className="w-full bg-gray-100 h-2 rounded-full mt-4 relative overflow-hidden">
              <div className="h-2 bg-gray-700 rounded-full" style={{ width: "0%" }} />
              <div className="absolute right-4 -top-1 w-0.5 h-4 bg-gray-800" />
            </div>

            <p className="text-[11px] text-gray-400 mt-4">
              Resets in 19 days.{" "}
              <span className="text-gray-700 font-semibold underline cursor-pointer hover:text-gray-900">Edit budget</span>
            </p>
          </div>

          {/* Tokens */}
          <div className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total tokens</p>
            <h4 className="text-lg font-bold text-gray-900">44,029</h4>

            <div className="h-12 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tokenData}>
                  <Line type="monotone" dataKey="y" stroke="#374151" strokeWidth={2} dot={false} />
                  <ReferenceLine x={20} isFront stroke="#374151" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Requests */}
          <div className="p-6">
            <p className="text-xs text-gray-500 font-semibold">Total requests</p>
            <h4 className="text-lg font-bold text-gray-900">283</h4>

            <div className="h-12 w-full mt-2 flex items-end gap-1">
              {[40, 70, 20, 10, 30, 5, 2, 2, 2].map((h, i) => (
                <div
                  key={i}
                  className="bg-gray-700 w-2 rounded-t-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageDashboard;