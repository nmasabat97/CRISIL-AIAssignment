import { render, screen } from '@testing-library/react';
import Indicator from '../ReusableComponents/Indicator';

describe('Indicator', () => {
  test('renders progress bar container', () => {
    render(<Indicator progress={50} unhide={true}/>);
    const container = screen.getByText(/50% Complete/i);
    expect(container).toBeInTheDocument();
  });

  test('shows correct percentage text', () => {
    render(<Indicator progress={75} unhide={true}/>);
    expect(screen.getByText(/75% Complete/)).toBeInTheDocument();
  });

  test('progress bar width matches the prop', () => {
    const { container } = render(<Indicator progress={30} unhide={true}/>);
    const progressBar = container.querySelector('.bg-green-500') as HTMLElement;
    expect(progressBar.style.width).toBe('30%');
  });
});
