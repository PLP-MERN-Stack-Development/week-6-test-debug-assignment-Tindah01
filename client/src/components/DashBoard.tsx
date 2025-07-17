import React from 'react';
import { Bug } from '../types/Bug';
import { AlertCircle, CheckCircle, Clock, Users, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  bugs: Bug[];
}

export const Dashboard: React.FC<DashboardProps> = ({ bugs }) => {
  const stats = {
    total: bugs.length,
    open: bugs.filter(bug => bug.status === 'Open').length,
    inProgress: bugs.filter(bug => bug.status === 'In Progress').length,
    resolved: bugs.filter(bug => bug.status === 'Resolved').length,
    closed: bugs.filter(bug => bug.status === 'Closed').length,
    critical: bugs.filter(bug => bug.priority === 'Critical').length,
    high: bugs.filter(bug => bug.priority === 'High').length,
  };

  const recentBugs = bugs
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const assigneeStats = bugs.reduce((acc, bug) => {
    acc[bug.assignedTo] = (acc[bug.assignedTo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topAssignees = Object.entries(assigneeStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bugs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Critical</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${stats.total > 0 ? (stats.critical / stats.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{stats.critical}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">High</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${stats.total > 0 ? (stats.high / stats.total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{stats.high}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Assignees</h3>
          <div className="space-y-3">
            {topAssignees.map(([assignee, count]) => (
              <div key={assignee} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-900">{assignee}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bugs</h3>
        <div className="space-y-3">
          {recentBugs.map((bug) => (
            <div key={bug.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{bug.title}</h4>
                <p className="text-xs text-gray-500">{bug.assignedTo}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${{
                  'Critical': 'bg-red-100 text-red-800',
                  'High': 'bg-orange-100 text-orange-800',
                  'Medium': 'bg-yellow-100 text-yellow-800',
                  'Low': 'bg-green-100 text-green-800',
                }[bug.priority]}`}>
                  {bug.priority}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${{
                  'Open': 'bg-blue-100 text-blue-800',
                  'In Progress': 'bg-purple-100 text-purple-800',
                  'Resolved': 'bg-green-100 text-green-800',
                  'Closed': 'bg-gray-100 text-gray-800',
                }[bug.status]}`}>
                  {bug.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
