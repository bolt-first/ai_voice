import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="absolute bottom-0 right-0 w-[400px] h-[600px] rounded-lg shadow-2xl transition-all duration-300 ease-in-out transform translate-y-0">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#E30613] hover:bg-[#D3A74F] text-white p-4 rounded-full shadow-lg transition-colors duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};