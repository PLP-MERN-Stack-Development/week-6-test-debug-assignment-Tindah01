import React, { useState, useMemo } from 'react';
import { Bug, BugFilters, BugFormData } from './types/Bug';
import { useBugs } from './hooks/useBugs';
import { BugCard } from './components/BugCard';
import { BugForm } from './components/BugForm';
import { BugDetails } from './components/BugDetails';
import { BugFilters as BugFiltersComponent } from './components/BugFilters';
import { Dashboard } from './components/Dashboard';
import { Plus, Bug as BugIcon, BarChart3, List, Loader2 } from 'lucide-react';

function App() {
  const { bugs, loading, createBug, updateBug, deleteBug, addComment, getBugById } = useBugs();
  const [activeView, setActiveView] = useState<'dashboard' | 'bugs'>('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [editingBug, setEditingBug] = useState<Bug | null>(null);
  const [filters, setFilters] = useState<BugFilters>({
    status: 'All',
    priority: 'All',
    assignedTo: '',
    search: '',
  });

  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      const matchesStatus = filters.status === 'All' || bug.status === filters.status;
      const matchesPriority = filters.priority === 'All' || bug.priority === filters.priority;
      const matchesAssignee = !filters.assignedTo || bug.assignedTo === filters.assignedTo;
      const matchesSearch = !filters.search || 
        bug.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        bug.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesPriority && matchesAssignee && matchesSearch;
    });
  }, [bugs, filters]);

  const handleCreateBug = (formData: BugFormData) => {
    createBug(formData);
    setShowForm(false);
  };

  const handleUpdateBug = (formData: BugFormData) => {
    if (editingBug) {
      updateBug(editingBug.id, formData);
      setEditingBug(null);
      setSelectedBug(null);
    }
  };

  const handleUpdateStatus = (bugId: string, status: Bug['status']) => {
    const updatedBug = updateBug(bugId, { status });
    if (updatedBug) {
      setSelectedBug(updatedBug);
    }
  };

  const handleAddComment = (bugId: string, text: string) => {
    addComment(bugId, text);
    const updatedBug = getBugById(bugId);
    if (updatedBug) {
      setSelectedBug(updatedBug);
    }
  };

  const handleBugClick = (bug: Bug) => {
    setSelectedBug(bug);
  };

  const handleEditBug = (bug: Bug) => {
    setEditingBug(bug);
    setSelectedBug(null);
  };

  const handleDeleteBug = (bugId: string) => {
    deleteBug(bugId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading bug tracker...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BugIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Bug Tracker</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeView === 'dashboard' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView('bugs')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeView === 'bugs' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                  Bugs ({bugs.length})
                </button>
              </nav>
              
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Bug
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' ? (
          <Dashboard bugs={bugs} />
        ) : (
          <div>
            <BugFiltersComponent 
              filters={filters} 
              onFiltersChange={setFilters}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBugs.map((bug) => (
                <BugCard
                  key={bug.id}
                  bug={bug}
                  onClick={handleBugClick}
                />
              ))}
            </div>
            
            {filteredBugs.length === 0 && (
              <div className="text-center py-12">
                <BugIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs found</h3>
                <p className="text-gray-500">
                  {bugs.length === 0 
                    ? "Get started by creating your first bug report." 
                    : "Try adjusting your filters or search terms."
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {showForm && (
        <BugForm
          onSubmit={handleCreateBug}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBug && (
        <BugForm
          bug={editingBug}
          onSubmit={handleUpdateBug}
          onCancel={() => setEditingBug(null)}
        />
      )}

      {selectedBug && (
        <BugDetails
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
          onEdit={handleEditBug}
          onDelete={handleDeleteBug}
          onUpdateStatus={handleUpdateStatus}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default App;
