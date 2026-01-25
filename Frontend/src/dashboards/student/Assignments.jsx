import { useEffect, useState } from "react";
import { Clock, AlertCircle, CheckCircle, BookOpen } from "lucide-react";
import api from "../../api/axios";

/* ================= HELPERS ================= */

const getDaysLeft = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  const diff = due - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return "Overdue";
  if (days === 0) return "Due Today";
  if (days === 1) return "1 day left";

  return `${days} days left`;
};

const getStatus = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  if (due < now) return "overdue";
  return "pending";
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50";

    case "overdue":
      return "text-red-600 bg-red-50";

    case "pending":
      return "text-orange-600 bg-orange-50";

    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getPriority = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (days <= 2) return "high";
  if (days <= 5) return "medium";

  return "low";
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "border-red-400 bg-red-50";

    case "medium":
      return "border-yellow-400 bg-yellow-50";

    case "low":
      return "border-green-400 bg-green-50";

    default:
      return "border-gray-300 bg-white";
  }
};

/* ================= COMPONENT ================= */

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/student/assignments");

      setAssignments(res.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load assignments"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-gray-500">
        Loading assignments...
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm text-center text-red-500">
        <AlertCircle className="mx-auto mb-2" />
        {error}

        <button
          onClick={fetchAssignments}
          className="block mx-auto mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="
        p-6
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-gray-900">
          Assignments
        </h2>

        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
          View All →
        </button>

      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-3">

        {assignments.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No assignments available
          </div>
        )}

        {assignments.map((item) => {
          const daysLeft = getDaysLeft(item.dueDate);
          const status = getStatus(item.dueDate);
          const priority = getPriority(item.dueDate);

          return (
            <div
              key={item._id}
              className={`
                p-4
                rounded-xl
                border-l-4
                ${getPriorityColor(priority)}
                hover:shadow-md
                transition
                cursor-pointer
              `}
            >
              {/* TOP */}
              <div className="flex items-start justify-between mb-2">

                <div className="flex-1">

                  <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.subject}
                  </p>

                </div>

                {/* ICON */}
                {status === "overdue" ? (
                  <AlertCircle
                    size={20}
                    className="text-red-600"
                  />
                ) : status === "completed" ? (
                  <CheckCircle
                    size={20}
                    className="text-green-600"
                  />
                ) : null}

              </div>

              {/* BOTTOM */}
              <div className="flex items-center justify-between mt-3">

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{daysLeft}</span>
                </div>

                <span
                  className={`
                    px-3
                    py-1
                    text-xs
                    font-medium
                    rounded-full
                    ${getStatusColor(status)}
                  `}
                >
                  {status.toUpperCase()}
                </span>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Assignments;
