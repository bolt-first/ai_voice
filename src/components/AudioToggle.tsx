import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="text-gray-400 hover:text-white transition-colors"
      title={isEnabled ? 'Disable voice response' : 'Enable voice response'}
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
};