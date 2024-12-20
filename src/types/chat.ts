export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  chat_history: Message[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isRecording: boolean;
  selectedLanguage: string;
  isAudioEnabled: boolean;
}