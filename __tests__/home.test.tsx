import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: 'fefsfehrf' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_8JkL2mP0zX6d8JkL2mP0zX6dJ',
        fullName: 'Thrall Durotan',
      },
    }),
  };
});

test('Home page renders correctly', async () => {
  render(await HomePage());
  expect(screen.getByText('get started')).toBeInTheDocument();
});
