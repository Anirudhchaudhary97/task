import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../app/dashboard/page';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

describe('Dashboard Component', () => {
  it('redirects to login if not authenticated', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    Cookies.get.mockReturnValue(null); // No auth cookie

    render(<Dashboard />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('renders dashboard for authenticated user', () => {
    Cookies.get.mockReturnValue('validToken'); // Mock a valid auth cookie

    render(<Dashboard />);

    expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument();
  });
});
