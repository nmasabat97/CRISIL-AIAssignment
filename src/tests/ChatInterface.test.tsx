import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatInterface from '../AppComponents/AI/ChatInterface';

jest.mock('react-markdown', () => {
    return ({ children }: any) => <div>{children}</div>;
  });
  
describe('ChatInterface', () => {
  beforeEach(() => {
    // Avoiding test bleed
    localStorage.clear();
  });

  test('renders the chat interface with input and send button', () => {
    render(<ChatInterface />);
    expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
    expect(screen.getByText(/send/i)).toBeInTheDocument();
  });

  test('ChatInterface matches snapshot', () => {
    const { asFragment } = render(<ChatInterface />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('toggles chat history view and clears messages', async () => {
    render(<ChatInterface />);

    // Send a message first
    fireEvent.change(screen.getByPlaceholderText(/ask a question/i), {
      target: { value: 'Test Message' },
    });
    fireEvent.click(screen.getByText(/send/i));

    // Wait for it to appear
    await screen.findByText('Test Message');

    // Go to history view
    fireEvent.click(screen.getByText(/view past history/i));
    expect(screen.getByText(/chat history/i)).toBeInTheDocument();

    // Clear history
    fireEvent.click(screen.getByText(/clear history/i));
    expect(screen.getByText(/no messages found/i)).toBeInTheDocument();

    // Go back to chat
    fireEvent.click(screen.getByText(/back to chat/i));
    expect(screen.getByPlaceholderText(/ask a question/i)).toBeInTheDocument();
  });
});
