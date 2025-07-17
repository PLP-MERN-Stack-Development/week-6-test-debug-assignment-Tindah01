import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BugForm } from '../../components/BugForm';
import { Bug } from '../../types/Bug';

const mockBug: Bug = {
  id: '1',
  title: 'Test Bug',
  description: 'Test description',
  priority: 'High',
  status: 'Open',
  assignedTo: 'John Doe',
  createdBy: 'Jane Smith',
  createdAt: new Date(),
  updatedAt: new Date(),
  comments: [],
};

describe('BugForm', () => {
  it('renders create form correctly', () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    expect(screen.getByText('Create New Bug')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assigned to/i)).toBeInTheDocument();
  });

  it('renders edit form correctly', () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm bug={mockBug} onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    expect(screen.getByText('Edit Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    const submitButton = screen.getByText(/create bug/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
    
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Bug Title' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New bug description' },
    });
    
    const submitButton = screen.getByText(/create bug/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        title: 'New Bug Title',
        description: 'New bug description',
        priority: 'Medium',
        assignedTo: 'John Doe',
      });
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(onCancelMock).toHaveBeenCalled();
  });

  it('clears errors when user starts typing', async () => {
    const onSubmitMock = vi.fn();
    const onCancelMock = vi.fn();
    
    render(<BugForm onSubmit={onSubmitMock} onCancel={onCancelMock} />);
    
    // Trigger validation errors
    fireEvent.click(screen.getByText(/create bug/i));
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
    
    // Start typing in title field
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Title' },
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    });
  });
});
