import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BugCard } from '../../components/BugCard';
import { Bug } from '../../types/Bug';

const mockBug: Bug = {
  id: '1',
  title: 'Test Bug',
  description: 'This is a test bug description',
  priority: 'High',
  status: 'Open',
  assignedTo: 'John Doe',
  createdBy: 'Jane Smith',
  createdAt: new Date('2025-01-15T10:30:00Z'),
  updatedAt: new Date('2025-01-15T10:30:00Z'),
  comments: [
    {
      id: '1',
      text: 'Test comment',
      author: 'Test Author',
      createdAt: new Date('2025-01-15T11:00:00Z'),
    },
  ],
};

describe('BugCard', () => {
  it('renders bug information correctly', () => {
    const onClickMock = vi.fn();
    
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('This is a test bug description')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Comment count
  });

  it('calls onClick when card is clicked', () => {
    const onClickMock = vi.fn();
    
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(onClickMock).toHaveBeenCalledWith(mockBug);
  });

  it('handles keyboard navigation', () => {
    const onClickMock = vi.fn();
    
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    
    expect(onClickMock).toHaveBeenCalledWith(mockBug);
  });

  it('applies correct priority styling', () => {
    const onClickMock = vi.fn();
    
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    
    const priorityElement = screen.getByText('High');
    expect(priorityElement).toHaveClass('bg-orange-100', 'text-orange-800');
  });

  it('displays correct time format', () => {
    const onClickMock = vi.fn();
    
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    
    // Should show relative time
    expect(screen.getByText(/ago/)).toBeInTheDocument();
  });
});
