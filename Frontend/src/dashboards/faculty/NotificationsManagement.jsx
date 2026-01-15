import { useState, useEffect } from "react";
import { Plus, Send, Trash2, Calendar, Users } from "lucide-react";

const NotificationsManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipients: "All Students",
    priority: "Normal",
  });

  // Initialize from localStorage or use default data
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem(
      "studentPortal_notifications"
    );
    if (savedNotifications) {
      return JSON.parse(savedNotifications);
    }
    return [
      {
        id: 1,
        title: "Class Cancelled - Data Structures",
        message: "Tomorrow's class is cancelled due to technical issues.",
        date: "2026-01-10",
        recipients: "CS-A Section",
        sent: true,
      },
      {
        id: 2,
        title: "Assignment Deadline Extended",
        message:
          "The deadline for Algorithm Assignment has been extended to Jan 25.",
        date: "2026-01-09",
        recipients: "All Students",
        sent: true,
      },
      {
        id: 3,
        title: "Exam Schedule Released",
        message:
          "Midterm examination schedule has been released. Check your portal.",
        date: "2026-01-08",
        recipients: "All Students",
        sent: true,
      },
    ];
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(
      "studentPortal_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    const newNotification = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      date: new Date().toISOString().split("T")[0],
      recipients: formData.recipients,
      sent: true,
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({
      title: "",
      message: "",
      recipients: "All Students",
      priority: "Normal",
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      setNotifications(notifications.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Notifications Management
          </h1>
          <p className="text-gray-600 mt-1">
            Send announcements and notifications to students
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {notification.title}
                  </h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Sent
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{notification.message}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(notification.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {notification.recipients}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Notification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Send New Notification
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Class Cancelled"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your message..."
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send To *
                </label>
                <select
                  name="recipients"
                  value={formData.recipients}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option>All Students</option>
                  <option>CS-A Section</option>
                  <option>CS-B Section</option>
                  <option>Specific Course Students</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Notification</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsManagement;
