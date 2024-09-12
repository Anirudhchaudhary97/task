import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../app/login/page';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Mock the Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock js-cookie
jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
}));

describe('Login Component', () => {
  const validUser = { username: 'admin', password: 'password123' };

  it('renders login form correctly', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('logs in successfully with valid credentials', () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: validUser.username },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: validUser.password },
    });

    fireEvent.click(screen.getByText(/Login/i));

    expect(Cookies.set).toHaveBeenCalledWith('auth', expect.any(String), { expires: 1 });
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('shows error with invalid credentials', () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'wrongUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongPassword' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText(/Invalid username or password/i)).toBeInTheDocument();
  });
});
