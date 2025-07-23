import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Navigation, 
  Users, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';

const Analytics = () => {
  const stats = [
    {
      title: 'Total Dispatches',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Navigation,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Response Time',
      value: '4.2 min',
      change: '-15%',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      title: 'Routes Optimized',
      value: '98.7%',
      change: '+2.3%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Successful Alerts',
      value: '99.1%',
      change: '+0.5%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-emerald-500'
    }
  ];

  const recentDispatches = [
    { id: 'D1247', type: 'Ambulance', time: '2 min ago', status: 'Active', priority: 'High' },
    { id: 'D1246', type: 'Police', time: '15 min ago', status: 'Completed', priority: 'Medium' },
    { id: 'D1245', type: 'Fire Truck', time: '32 min ago', status: 'Completed', priority: 'High' },
    { id: 'D1244', type: 'Rescue', time: '45 min ago', status: 'Completed', priority: 'Low' },
    { id: 'D1243', type: 'Ambulance', time: '1 hr ago', status: 'Completed', priority: 'High' }
  ];

  const monthlyData = [
    { month: 'Jan', dispatches: 95, responseTime: 5.2 },
    { month: 'Feb', dispatches: 110, responseTime: 4.8 },
    { month: 'Mar', dispatches: 125, responseTime: 4.5 },
    { month: 'Apr', dispatches: 135, responseTime: 4.3 },
    { month: 'May', dispatches: 142, responseTime: 4.2 },
    { month: 'Jun', dispatches: 138, responseTime: 4.1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor system performance and emergency response metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Monthly Performance</h2>
              <BarChart3 className="h-5 w-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 text-sm font-medium text-gray-700">{month.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(month.dispatches / 150) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{month.dispatches}</div>
                    <div className="text-xs text-gray-500">{month.responseTime}min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Dispatches */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Dispatches</h2>
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              {recentDispatches.map((dispatch) => (
                <div key={dispatch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      dispatch.type === 'Ambulance' ? 'bg-red-100 text-red-600' :
                      dispatch.type === 'Police' ? 'bg-blue-100 text-blue-600' :
                      dispatch.type === 'Fire Truck' ? 'bg-orange-100 text-orange-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {dispatch.type.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{dispatch.id}</p>
                      <p className="text-xs text-gray-500">{dispatch.type} • {dispatch.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dispatch.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {dispatch.status}
                    </span>
                    <div className={`text-xs mt-1 ${
                      dispatch.priority === 'High' ? 'text-red-600' :
                      dispatch.priority === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {dispatch.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Health</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">API Services</h3>
              <p className="text-sm text-gray-600">All systems operational</p>
              <div className="mt-2 text-xs text-green-600">99.9% uptime</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h3>
              <p className="text-sm text-gray-600">24 dispatchers online</p>
              <div className="mt-2 text-xs text-blue-600">Peak: 32 users</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Alerts</h3>
              <p className="text-sm text-gray-600">No critical alerts</p>
              <div className="mt-2 text-xs text-purple-600">Last alert: 2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
