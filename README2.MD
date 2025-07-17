# Bug Tracker Application

A comprehensive bug tracking application built with React, TypeScript, and Vite, featuring extensive testing infrastructure and debugging best practices.

## Features

- **Bug Management**: Create, update, delete, and track bugs
- **Status Tracking**: Open, In Progress, Resolved, Closed
- **Priority Levels**: Low, Medium, High, Critical
- **User Assignment**: Assign bugs to team members
- **Comments System**: Add and view comments on bugs
- **Search & Filter**: Real-time search and advanced filtering
- **Dashboard**: Statistics and analytics overview
- **Responsive Design**: Mobile-friendly interface

## Testing Infrastructure

This project includes comprehensive testing setup:

### Unit Tests
- **Component Tests**: Using React Testing Library and Vitest
- **Hook Tests**: Testing custom hooks like `useBugs`
- **Utility Tests**: Testing helper functions and utilities

### Integration Tests
- **Component Integration**: Testing component interactions
- **State Management**: Testing data flow and state updates
- **User Workflows**: Testing complete user interactions

### End-to-End Tests
- **Cypress Tests**: Full application testing
- **User Scenarios**: Real-world usage patterns
- **Cross-browser Testing**: Ensuring compatibility

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

### Testing

#### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

#### End-to-End Tests
```bash
# Open Cypress test runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run

# Run full E2E test suite
npm run test:e2e
```

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── tests/             # Test files
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── setup.ts       # Test setup configuration
└── App.tsx            # Main application component

cypress/
├── e2e/               # End-to-end tests
├── support/           # Cypress support files
└── cypress.config.ts  # Cypress configuration
```

## Architecture & Best Practices

### Component Design
- **Single Responsibility**: Each component has a focused purpose
- **Prop Interfaces**: Strongly typed component props
- **Accessibility**: ARIA labels and keyboard navigation
- **Error Boundaries**: Graceful error handling

### State Management
- **Custom Hooks**: Centralized state logic
- **Local Storage**: Persistent data storage
- **Immutable Updates**: Predictable state changes

### Testing Strategy
- **Test-Driven Development**: Write tests before implementation
- **Comprehensive Coverage**: Unit, integration, and E2E tests
- **Mock Strategy**: Isolated testing with proper mocking
- **Accessibility Testing**: Ensuring inclusive design

### Debugging Features
- **Error Logging**: Comprehensive error tracking
- **Development Tools**: React DevTools integration
- **Performance Monitoring**: Component rendering optimization
- **Debug Information**: Detailed console logging

## Key Components

### BugCard
Displays bug information in a card format with priority and status indicators.

### BugForm
Modal form for creating and editing bugs with validation.

### BugDetails
Detailed view of a bug with comments, status updates, and actions.

### BugFilters
Advanced filtering and search functionality.

### Dashboard
Statistics and analytics overview with charts and metrics.

## Testing Examples

### Unit Test Example
```typescript
describe('BugCard', () => {
  it('renders bug information correctly', () => {
    render(<BugCard bug={mockBug} onClick={onClickMock} />);
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
  });
});
```

### Integration Test Example
```typescript
it('allows creating a new bug', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('New Bug'));
  // ... test implementation
});
```

### E2E Test Example
```typescript
it('should create a new bug', () => {
  cy.contains('button', 'New Bug').click();
  cy.get('input[id="title"]').type('Test Bug from Cypress');
  cy.contains('button', 'Create Bug').click();
});
```

## Debugging Tips

### Common Issues
1. **State Not Updating**: Check if state mutations are immutable
2. **Tests Failing**: Verify mock implementations and async handling
3. **Performance Issues**: Use React DevTools Profiler
4. **Type Errors**: Ensure proper TypeScript interfaces

### Development Tools
- **React DevTools**: Component inspection and profiling
- **Vitest UI**: Interactive test runner
- **Cypress Test Runner**: Visual E2E testing
- **Browser DevTools**: Network monitoring and debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.
