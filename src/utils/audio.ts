let currentAudio: HTMLAudioElement | null = null;

export const createAudioBlob = (chunks: BlobPart[]): Blob => {
  return new Blob(chunks, { type: 'audio/wav' });
};

export const playAudio = (audioBlob: Blob): void => {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  
  const audio = new Audio(URL.createObjectURL(audioBlob));
  currentAudio = audio;
  audio.play();
};

export const stopAudio = (): void => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
};