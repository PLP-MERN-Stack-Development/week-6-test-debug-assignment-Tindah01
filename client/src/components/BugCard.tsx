import React from 'react';
import { Bug } from '../types/Bug';
import { AlertCircle, User, Clock, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BugCardProps {
  bug: Bug;
  onClick: (bug: Bug) => void;
}

const priorityColors = {
  Low: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Critical: 'bg-red-100 text-red-800 border-red-200',
};

const statusColors = {
  Open: 'bg-blue-100 text-blue-800 border-blue-200',
  'In Progress': 'bg-purple-100 text-purple-800 border-purple-200',
  Resolved: 'bg-green-100 text-green-800 border-green-200',
  Closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const BugCard: React.FC<BugCardProps> = ({ bug, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
      onClick={() => onClick(bug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(bug);
        }
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{bug.title}</h3>
        <div className="flex items-center gap-2 ml-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityColors[bug.priority]}`}>
            {bug.priority}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[bug.status]}`}>
            {bug.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{bug.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{bug.assignedTo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDistanceToNow(bug.createdAt, { addSuffix: true })}</span>
          </div>
        </div>
        {bug.comments.length > 0 && (
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{bug.comments.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};
