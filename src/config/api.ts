export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    TRANSCRIBE: '/transcribe',
    GENERATE_RESPONSE: '/generate-response',
    TEXT_TO_SPEECH: '/text-to-speech',
  },
} as const;