import { BarChart3, Download, TrendingUp, Users } from "lucide-react";

const Reports = () => {
  const reportTypes = [
    {
      id: 1,
      title: "Attendance Report",
      description: "Generate detailed attendance reports",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Performance Report",
      description: "Student performance analytics",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Assignment Report",
      description: "Assignment submission statistics",
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Course Report",
      description: "Course-wise detailed reports",
      icon: Download,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Generate and download various reports
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div
              className={`${report.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <report.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {report.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button className="w-full px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium">
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Reports
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                title: "Attendance Report - January 2026",
                date: "2026-01-10",
                size: "2.4 MB",
              },
              {
                title: "Performance Analysis - CS Department",
                date: "2026-01-08",
                size: "1.8 MB",
              },
              {
                title: "Assignment Statistics - Q1",
                date: "2026-01-05",
                size: "3.2 MB",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Download className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
