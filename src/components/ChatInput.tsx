import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-white border-t">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#E30613] min-h-[44px]"
        rows={1}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={`p-3 rounded-lg ${
          isRecording ? 'bg-red-500' : 'bg-gray-100'
        } text-gray-700 hover:bg-gray-200 transition-colors`}
        disabled={disabled}
      >
        {isRecording ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      <button
        type="submit"
        className="p-3 rounded-lg bg-[#E30613] text-white hover:bg-[#cc0511] transition-colors disabled:opacity-50"
        disabled={!message.trim() || disabled}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};