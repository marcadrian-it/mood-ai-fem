import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

describe('Homepage', () => {
  test('Home page renders correctly', async () => {
    render(await HomePage());
    expect(screen.getByText('get started')).toBeInTheDocument();
  });

  test('Conditional rendering when authenticated', async () => {
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

    render(await HomePage());
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/journal');
  });

  test('Conditional rendering when not authenticated', async () => {
    vi.mock('@clerk/nextjs', () => {
      return {
        auth: () => new Promise((resolve) => resolve({ userId: null })),
        ClerkProvider: ({ children }) => <div>{children}</div>,
        useUser: () => ({
          isSignedIn: false,
          user: null,
        }),
      };
    });

    render(await HomePage());
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/new-user');
  });
});
