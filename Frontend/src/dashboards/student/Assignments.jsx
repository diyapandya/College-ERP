import React from "react";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";

const Assignments = () => {
  const assignments = [
    {
      title: "Binary Search Tree Implementation",
      course: "Data Structures",
      dueDate: "2 days left",
      status: "pending",
      priority: "high",
    },
    {
      title: "Database Normalization Report",
      course: "Database Management",
      dueDate: "5 days left",
      status: "in-progress",
      priority: "medium",
    },
    {
      title: "Network Protocol Analysis",
      course: "Computer Networks",
      dueDate: "1 week left",
      status: "pending",
      priority: "low",
    },
    {
      title: "OS Process Scheduling",
      course: "Operating Systems",
      dueDate: "Submitted",
      status: "completed",
      priority: "completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      case "pending":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-300 bg-red-50";
      case "medium":
        return "border-yellow-300 bg-yellow-50";
      case "low":
        return "border-green-300 bg-green-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Assignments</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
              assignment.priority
            )} hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {assignment.title}
                </h3>
                <p className="text-sm text-gray-600">{assignment.course}</p>
              </div>
              {assignment.status === "completed" ? (
                <CheckCircle
                  size={20}
                  className="text-green-600 flex-shrink-0"
                />
              ) : assignment.priority === "high" ? (
                <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              ) : null}
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{assignment.dueDate}</span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  assignment.status
                )}`}
              >
                {assignment.status.charAt(0).toUpperCase() +
                  assignment.status.slice(1).replace("-", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
