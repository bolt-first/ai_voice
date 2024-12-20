import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { generateResponse, textToSpeech } from '../services/api';
import { playAudio, stopAudio } from '../utils/audio';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    isRecording: false,
    selectedLanguage: 'en',
    isAudioEnabled: true,
  });

  const sendMessage = useCallback(async (text: string) => {
    // Stop any currently playing audio before processing new message
    stopAudio();

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      messages: [...prev.messages, { role: 'user', content: text }],
    }));

    try {
      const response = await generateResponse(text, state.selectedLanguage, state.messages);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, { role: 'assistant', content: response.response }],
        isLoading: false,
      }));

      if (state.isAudioEnabled) {
        const audioBlob = await textToSpeech(response.response);
        playAudio(audioBlob);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to send message',
      }));
    }
  }, [state.messages, state.selectedLanguage, state.isAudioEnabled]);

  const setLanguage = useCallback((language: string) => {
    setState((prev) => ({ ...prev, selectedLanguage: language }));
  }, []);

  const toggleAudio = useCallback(() => {
    setState((prev) => ({ ...prev, isAudioEnabled: !prev.isAudioEnabled }));
    stopAudio();
  }, []);

  return {
    state,
    sendMessage,
    setLanguage,
    toggleAudio,
  };
};