import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { Message, ChatResponse } from '../types/chat';

export const transcribeAudio = async (audioBlob: Blob, language: string) => {
  const formData = new FormData();
  formData.append('audio_file', audioBlob);

  const response = await axios.post(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRANSCRIBE}/?lang=${language}`,
    formData
  );
  return response.data.transcription;
};

export const generateResponse = async (
  text: string,
  language: string,
  chatHistory: Message[]
): Promise<ChatResponse> => {
  const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE_RESPONSE}/`, {
    text,
    language,
    chat_history: chatHistory,
  });
  return response.data;
};

export const textToSpeech = async (text: string): Promise<Blob> => {
  const response = await axios.post(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEXT_TO_SPEECH}/`,
    { text },
    { responseType: 'blob' }
  );
  return response.data;
};