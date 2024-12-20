import { useCallback } from 'react';
import { transcribeAudio } from '../services/api';
import { createAudioBlob } from '../utils/audio';

export const useVoiceRecording = (language: string, onTranscription: (text: string) => void) => {
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = createAudioBlob(audioChunks);
        try {
          const transcription = await transcribeAudio(audioBlob, language);
          if (transcription) {
            onTranscription(transcription);
          }
        } catch (error) {
          console.error('Failed to transcribe audio:', error);
        }
      };

      mediaRecorder.start();
      return mediaRecorder;
    } catch (error) {
      console.error('Failed to start recording:', error);
      return null;
    }
  }, [language, onTranscription]);

  return { startRecording };
};