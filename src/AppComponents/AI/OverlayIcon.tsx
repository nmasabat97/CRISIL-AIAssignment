import React, { useState } from 'react';
import { asset } from '../../assets/assets';
import ChatInterface from './ChatInterface';

const OverlayIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 p-3 rounded-full shadow-lg text-white"
      >
        <img src={asset.chatIcon} alt="ai_icon" className="w-10 h-10 object-contain" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Content */}
            <div className='overflow-y-auto'>
              <ChatInterface />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlayIcon;
