import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { App } from './App';
import { FakeAuthStore } from './FakeAuthStore';

jest.mock('react-native-app-auth');

jest.mock('@react-native-spotify/core-logger', () => ({
  log: {
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

describe('App with AuthStoreContext', () => {
  it('affiche le token courant dans TokenDisplay', async () => {
    const expectedToken = 'fake-token-123';
    const store = new FakeAuthStore(expectedToken);

    render(<App authStore={store as never} />);

    const line = await screen.findByText(/🪪 Token actuel/i);

    const text = Array.isArray(line.props.children)
      ? line.props.children.join('')
      : String(line.props.children);

    expect(text).toContain(expectedToken);
  });
});
