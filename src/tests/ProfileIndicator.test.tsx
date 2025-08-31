import { render, screen } from '@testing-library/react';
import ProfileIndicator from '../ReusableComponents/ProfileIndicator';

describe('ProfileIndicator', () => {
  test('renders progress bar container', () => {
    render(<ProfileIndicator progress={50} />);
    const container = screen.getByText(/50% Complete/i);
    expect(container).toBeInTheDocument();
  });

  test('shows correct percentage text', () => {
    render(<ProfileIndicator progress={75} />);
    expect(screen.getByText(/75% Complete/)).toBeInTheDocument();
  });

  test('progress bar width matches the prop', () => {
    const { container } = render(<ProfileIndicator progress={30} />);
    const progressBar = container.querySelector('.bg-green-500') as HTMLElement;
    expect(progressBar.style.width).toBe('30%');
  });
});
