import React from "react";
import { Bell, AlertCircle, Info, CheckCircle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      type: "alert",
      icon: AlertCircle,
      title: "Assignment Due Soon",
      message: "Binary Search Tree due in 2 days",
      time: "1 hour ago",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      type: "info",
      icon: Info,
      title: "Class Rescheduled",
      message: "Database Lab moved to Room 301",
      time: "3 hours ago",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Grade Published",
      message: "Operating Systems Mid-term: A+",
      time: "5 hours ago",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      type: "info",
      icon: Bell,
      title: "New Study Material",
      message: "Computer Networks notes uploaded",
      time: "1 day ago",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div
              className={`p-2 ${notification.bgColor} rounded-lg flex-shrink-0`}
            >
              <notification.icon size={18} className={notification.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
