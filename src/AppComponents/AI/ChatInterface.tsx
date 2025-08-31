import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
  sender: 'student' | 'ai';
  text: string;
  timestamp: number;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isHistoryView, setIsHistoryView] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // UseEffect hook to load message history from localStorage if available
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Auto-scroll the chat container to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (messageText: string) => {
    const newMessage: Message = {
      sender: 'student',
      text: messageText,
      timestamp: Date.now(),
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Save message history in localStorage
      return updatedMessages;
    });
    setMessageInput(''); // Clear input field
    simulateAIResponse();
  };

  // Simulating AI response with delay
  const simulateAIResponse = () => {
    setIsTyping(true);
    setIsWaitingForResponse(true);

    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        text: 'This is a statically generated **AI response** to your question. `This is a sample Markdown`',
        timestamp: Date.now(),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, aiResponse];
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Save message history in localStorage
        return updatedMessages;
      });
      setIsTyping(false);
      setIsWaitingForResponse(false);
    }, 2000);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="chat-container w-full max-w-lg mx-auto p-4 h-[80vh]">
      {/* Chat History Toggle */}
      {isHistoryView ? (
        <>
          <div className="history-view overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Chat History</h2>

            {/* Display past messages */}
            {messages.length > 0 ? (
              <div className="history-messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${message.sender === 'student' ? 'text-right' : 'text-left'} p-2 mb-2`}
                  >
                    <div
                      className={`message-content p-2 rounded-lg ${message.sender === 'student' ? 'bg-blue-100' : 'bg-gray-200'}`}
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                    <small className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</small>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No messages found.</div>
            )}

          </div>
          <div className="mt-4 flex justify-between sticky bottom-0 bg-white p-4">
            <button
              onClick={() => setIsHistoryView(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Back to Chat
            </button>
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Clear History
            </button>
          </div>
        </>

      ) : (
        <div className="chat-view">
          <div
            ref={chatContainerRef}
            className="chat-history h-96 overflow-y-auto mb-4"
          >

            {/* Display messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'student' ? 'text-right' : 'text-left'} p-2 mb-2`}
              >
                <div
                  className={`message-content p-2 rounded-lg ${message.sender === 'student' ? 'bg-blue-100' : 'bg-gray-200'}`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                <small className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</small>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="typing-indicator text-gray-500 text-sm italic">
                <span>AI is typing...</span>
              </div>
            )}
          </div>

          {/* Message input field */}
          <div className="message-input flex">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l-lg"
              placeholder="Ask a question..."
            />
            <button
              onClick={() => sendMessage(messageInput)}
              disabled={isWaitingForResponse || messageInput.trim() === ''}
              className="p-2 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-300"
            >
              Send
            </button>
          </div>

          {/* View Past History Link */}
          <button
            onClick={() => setIsHistoryView(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            View Past History
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
