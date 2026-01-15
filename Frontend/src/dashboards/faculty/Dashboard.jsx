import {
  Users,
  BookOpen,
  FileText,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      label: "Total Students",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      trend: "+12%",
    },
    {
      label: "Active Courses",
      value: "24",
      icon: BookOpen,
      color: "bg-green-500",
      trend: "+3",
    },
    {
      label: "Assignments",
      value: "45",
      icon: FileText,
      color: "bg-purple-500",
      trend: "8 pending",
    },
    {
      label: "Avg. Attendance",
      value: "85%",
      icon: TrendingUp,
      color: "bg-orange-500",
      trend: "+5%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New assignment submitted by John Doe",
      time: "5 min ago",
      type: "assignment",
    },
    {
      id: 2,
      title: "Attendance marked for CS-101",
      time: "1 hour ago",
      type: "attendance",
    },
    {
      id: 3,
      title: "Result published for Midterm Exam",
      time: "2 hours ago",
      type: "result",
    },
    {
      id: 4,
      title: "Timetable updated for Week 5",
      time: "3 hours ago",
      type: "timetable",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "Data Structures",
      time: "10:00 AM",
      room: "Room 301",
      students: 45,
    },
    {
      id: 2,
      course: "Algorithms",
      time: "2:00 PM",
      room: "Room 205",
      students: 38,
    },
    {
      id: 3,
      course: "Web Development",
      time: "4:00 PM",
      room: "Lab 102",
      students: 30,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Here's your overview and quick insights.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-2">{stat.trend}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Today's Classes</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{cls.course}</h3>
                  <p className="text-sm text-gray-600">
                    {cls.room} • {cls.students} students
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary-600">{cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="pb-4 border-b border-gray-100 last:border-0"
              >
                <p className="text-sm text-gray-800 font-medium">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <FileText className="w-8 h-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Create Assignment
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Award className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Add Results
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Update Timetable
            </span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Users className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Mark Attendance
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
