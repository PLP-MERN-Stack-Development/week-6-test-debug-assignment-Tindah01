import React, { useState } from 'react';
import { Bug } from '../types/Bug';
import { X, Edit, Trash2, MessageCircle, User, Clock, AlertCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { mockUsers } from '../utils/mockData';

interface BugDetailsProps {
  bug: Bug;
  onClose: () => void;
  onEdit: (bug: Bug) => void;
  onDelete: (bugId: string) => void;
  onUpdateStatus: (bugId: string, status: Bug['status']) => void;
  onAddComment: (bugId: string, text: string) => void;
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

export const BugDetails: React.FC<BugDetailsProps> = ({
  bug,
  onClose,
  onEdit,
  onDelete,
  onUpdateStatus,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(bug.id, newComment.trim());
      setNewComment('');
    }
  };

  const handleDelete = () => {
    onDelete(bug.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Bug Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(bug)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit bug"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-red-600"
              title="Delete bug"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{bug.title}</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${priorityColors[bug.priority]}`}>
                {bug.priority} Priority
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <select
                  value={bug.status}
                  onChange={(e) => onUpdateStatus(bug.id, e.target.value as Bug['status'])}
                  className={`px-3 py-1 text-sm font-medium rounded-full border ${statusColors[bug.status]} bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned To</h4>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{bug.assignedTo}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Created By</h4>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{bug.createdBy}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Created</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{formatDistanceToNow(bug.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Last Updated</h4>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{formatDistanceToNow(bug.updatedAt, { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{bug.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Comments ({bug.comments.length})
            </h4>
            
            <div className="space-y-4 mb-4">
              {bug.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Bug</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this bug? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
