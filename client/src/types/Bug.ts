export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface BugFormData {
  title: string;
  description: string;
  priority: Bug['priority'];
  assignedTo: string;
}

export interface BugFilters {
  status: Bug['status'] | 'All';
  priority: Bug['priority'] | 'All';
  assignedTo: string;
  search: string;
}
