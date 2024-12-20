import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LanguageSelector } from './LanguageSelector';
import { AudioToggle } from './AudioToggle';
import { useChat } from '../hooks/useChat';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { stopAudio } from '../utils/audio';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { state, sendMessage, setLanguage, toggleAudio } = useChat();
  const { startRecording } = useVoiceRecording(state.selectedLanguage, sendMessage);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleStartRecording = async () => {
    // Stop any playing audio before starting recording
    stopAudio();
    
    mediaRecorderRef.current = await startRecording();
    if (mediaRecorderRef.current) {
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black">
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold">THEBOT AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <AudioToggle isEnabled={state.isAudioEnabled} onToggle={toggleAudio} />
          <LanguageSelector selectedLanguage={state.selectedLanguage} onLanguageChange={setLanguage} />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {state.messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        isRecording={isRecording}
        disabled={state.isLoading}
      />
    </div>
  );
};

export default ChatWindow;