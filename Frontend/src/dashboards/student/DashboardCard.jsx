import React from "react";

const DashboardCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  bgColor,
  trend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-gray-300 hover:shadow transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2.5 ${bgColor} rounded-lg`}>
              <Icon size={22} className={color} />
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">{title}</h3>
          </div>
          <div className="ml-0">
            <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {trend && (
          <div
            className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
              trend.type === "up"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {trend.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
