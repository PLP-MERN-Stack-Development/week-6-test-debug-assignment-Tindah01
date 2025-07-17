import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBugs } from '../../hooks/useBugs';

// Mock the storage utilities
vi.mock('../../utils/storage', () => ({
  saveBugs: vi.fn(),
  loadBugs: vi.fn(() => []),
}));

// Mock the mock data
vi.mock('../../utils/mockData', () => ({
  generateMockBugs: vi.fn(() => [
    {
      id: '1',
      title: 'Test Bug',
      description: 'Test description',
      priority: 'High',
      status: 'Open',
      assignedTo: 'John Doe',
      createdBy: 'Jane Smith',
      createdAt: new Date('2025-01-15T10:30:00Z'),
      updatedAt: new Date('2025-01-15T10:30:00Z'),
      comments: [],
    },
  ]),
}));

describe('useBugs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with mock data when no saved data exists', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      // Wait for the effect to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.bugs).toHaveLength(1);
    expect(result.current.bugs[0].title).toBe('Test Bug');
    expect(result.current.loading).toBe(false);
  });

  it('creates a new bug', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const newBugData = {
      title: 'New Bug',
      description: 'New bug description',
      priority: 'Medium' as const,
      assignedTo: 'Jane Doe',
    };
    
    act(() => {
      result.current.createBug(newBugData);
    });
    
    expect(result.current.bugs).toHaveLength(2);
    expect(result.current.bugs[1].title).toBe('New Bug');
    expect(result.current.bugs[1].status).toBe('Open');
  });

  it('updates an existing bug', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const bugId = result.current.bugs[0].id;
    
    act(() => {
      result.current.updateBug(bugId, { status: 'Resolved' });
    });
    
    expect(result.current.bugs[0].status).toBe('Resolved');
  });

  it('deletes a bug', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const bugId = result.current.bugs[0].id;
    
    act(() => {
      result.current.deleteBug(bugId);
    });
    
    expect(result.current.bugs).toHaveLength(0);
  });

  it('adds a comment to a bug', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const bugId = result.current.bugs[0].id;
    
    act(() => {
      result.current.addComment(bugId, 'Test comment');
    });
    
    expect(result.current.bugs[0].comments).toHaveLength(1);
    expect(result.current.bugs[0].comments[0].text).toBe('Test comment');
  });

  it('gets bug by id', async () => {
    const { result } = renderHook(() => useBugs());
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const bugId = result.current.bugs[0].id;
    const foundBug = result.current.getBugById(bugId);
    
    expect(foundBug).toBeDefined();
    expect(foundBug?.title).toBe('Test Bug');
  });
});
