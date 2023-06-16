import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

const mocks = vi.hoisted(() => {
  const auth = vi.fn(() => Promise.resolve({ userId: null }));
  const useUser = vi.fn();
  return {
    auth,
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser,
  };
});

vi.mock('@clerk/nextjs', () => {
  return {
    auth: mocks.auth,
    ClerkProvider: mocks.ClerkProvider,
    useUser: mocks.useUser,
  };
});

describe('Homepage', () => {
  test('Home page renders correctly', async () => {
    mocks.auth.mockReturnValue(Promise.resolve({ userId: null }));
    render(await HomePage());
    expect(screen.getByText('get started')).toBeInTheDocument();
  });

  test('Conditional rendering when authenticated', async () => {
    mocks.auth.mockReturnValue(Promise.resolve({ userId: 'fefsfehrf' }));
    mocks.useUser.mockImplementation(() => ({
      isSignedIn: true,
      user: {
        id: 'user_8JkL2mP0zX6d8JkL2mP0zX6dJ',
        fullName: 'Thrall Durotan',
      },
    }));

    const { debug } = render(await HomePage());
    debug();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/journal');
  });

  test('Conditional rendering when not authenticated', async () => {
    mocks.auth.mockReturnValue(Promise.resolve({ userId: null }));
    mocks.useUser.mockImplementation(() => ({
      isSignedIn: false,
      user: null,
    }));

    const { debug } = render(await HomePage());
    debug();
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/new-user');
  });
});
