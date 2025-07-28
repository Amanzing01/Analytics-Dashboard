import { Users, BarChart3, Zap, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const MetricsCards = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalRoutines: 0,
    avgRoutinesPerUser: 0,
    avgProductsPerRoutine: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setDashboardStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const metricsData = [
    {
      id: 1,
      title: "Active Users",
      value: (dashboardStats.totalUsers).toLocaleString(),
      icon: Users,
      borderColor: "bg-[#FFA1A1]"
    },
    {
      id: 2,
      title: "Number of Routines",
      value: (dashboardStats.totalRoutines).toLocaleString(),
      icon: BarChart3,
      borderColor: "bg-[#C893FD]"
    },
    {
      id: 3,
      title: "Avg Routines per User",
      value: dashboardStats.avgRoutinesPerUser,
      icon: Zap,
      borderColor: "bg-[#FF718B]"
    },
    {
      id: 4,
      title: "Avg Products of Routine",
      value: dashboardStats.avgProductsPerRoutine,
      icon: ShoppingBag,
      borderColor: "bg-[#93AAFD]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metricsData.map((metric) => {
        const IconComponent = metric.icon;
        return (
          <div
            key={metric.id}
            className={`bg-white rounded-lg shadow-md  border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className={`h-15 ${metric.borderColor} w-2 rounded-lg mr-3`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {metric.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${metric.borderColor} text-black`}>
                <IconComponent size={28} className="stroke-1" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;