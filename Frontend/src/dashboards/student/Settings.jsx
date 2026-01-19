import { User, Lock, Bell, Globe, BookOpen } from "lucide-react"

const StudentSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your profile, security, and preferences
        </p>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Profile Information
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Student Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="student@college.edu"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Academic Info (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <input
                type="text"
                value="Computer Engineering"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <input
                type="text"
                value="5"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Division
              </label>
              <input
                type="text"
                value="A"
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= PASSWORD ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Change Password
          </h2>
        </div>

        <div className="space-y-4 max-w-md">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Update Password
          </button>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-4">
          {[
            "Assignment deadlines",
            "Attendance shortage alerts",
            "Exam results published",
            "Eligibility status updates",
            "Parent notification alerts"
          ].map((label, i) => (
            <label key={i} className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-primary-600 border-gray-300 rounded"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ================= LANGUAGE ================= */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Language & Region
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>English</option>
            <option>Hindi</option>
            <option>Gujarati</option>
          </select>

          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>UTC +05:30 (IST)</option>
            <option>UTC +00:00 (GMT)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default StudentSettings
