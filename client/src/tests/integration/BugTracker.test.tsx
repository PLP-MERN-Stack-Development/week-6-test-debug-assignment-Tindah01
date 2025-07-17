import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../../App';

describe('Bug Tracker Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('allows creating a new bug', async () => {
    render(<App />);
    
    // Wait for the app to load
    await waitFor(() => {
      expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
    });
    
    // Click on New Bug button
    fireEvent.click(screen.getByText('New Bug'));
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Integration Test Bug' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is an integration test bug' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/create bug/i));
    
    // Navigate to bugs view
    fireEvent.click(screen.getByText(/bugs/i));
    
    // Check if the bug was created
    await waitFor(() => {
      expect(screen.getByText('Integration Test Bug')).toBeInTheDocument();
    });
  });

  it('allows filtering bugs', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
    });
    
    // Navigate to bugs view
    fireEvent.click(screen.getByText(/bugs/i));
    
    // There should be mock bugs visible
    await waitFor(() => {
      expect(screen.getByText('Login page not responsive on mobile')).toBeInTheDocument();
    });
    
    // Filter by Critical priority
    const priorityFilter = screen.getByLabelText(/priority/i);
    fireEvent.change(priorityFilter, { target: { value: 'Critical' } });
    
    // Should only show critical bugs
    await waitFor(() => {
      expect(screen.getByText('Database connection timeout')).toBeInTheDocument();
      expect(screen.queryByText('Login page not responsive on mobile')).not.toBeInTheDocument();
    });
  });

  it('allows viewing bug details', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
    });
    
    // Navigate to bugs view
    fireEvent.click(screen.getByText(/bugs/i));
    
    // Click on a bug card
    await waitFor(() => {
      expect(screen.getByText('Login page not responsive on mobile')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Login page not responsive on mobile'));
    
    // Check if bug details modal is shown
    await waitFor(() => {
      expect(screen.getByText('Bug Details')).toBeInTheDocument();
      expect(screen.getByText('The login form overflows on mobile devices')).toBeInTheDocument();
    });
  });

  it('allows updating bug status', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
    });
    
    // Navigate to bugs view
    fireEvent.click(screen.getByText(/bugs/i));
    
    // Click on a bug card
    await waitFor(() => {
      expect(screen.getByText('Login page not responsive on mobile')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Login page not responsive on mobile'));
    
    // Change status
    await waitFor(() => {
      const statusSelect = screen.getByDisplayValue('Open');
      fireEvent.change(statusSelect, { target: { value: 'In Progress' } });
    });
    
    // Close modal
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    // Check if status updated in the card
    await waitFor(() => {
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });
  });

  it('shows dashboard with statistics', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
    });
    
    // Should be on dashboard by default
    expect(screen.getByText('Total Bugs')).toBeInTheDocument();
    expect(screen.getByText('Priority Distribution')).toBeInTheDocument();
    expect(screen.getByText('Top Assignees')).toBeInTheDocument();
    expect(screen.getByText('Recent Bugs')).toBeInTheDocument();
  });
});
