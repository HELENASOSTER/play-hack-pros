import { useCallback } from 'react';

export const useAudio = () => {
  const playSound = useCallback((type: 'whoosh' | 'click' | 'ding' | 'confetti') => {
    // Create audio context for browser compatibility
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    switch (type) {
      case 'whoosh':
        // Smooth transition sound
        playTone(200, 0.3, 'sine', 0.05);
        setTimeout(() => playTone(150, 0.2, 'sine', 0.03), 100);
        break;
      
      case 'click':
        // Satisfying click
        playTone(800, 0.1, 'square', 0.08);
        setTimeout(() => playTone(600, 0.05, 'square', 0.04), 50);
        break;
      
      case 'ding':
        // Success notification
        playTone(523, 0.2, 'sine', 0.1); // C5
        setTimeout(() => playTone(659, 0.2, 'sine', 0.1), 100); // E5
        setTimeout(() => playTone(784, 0.3, 'sine', 0.1), 200); // G5
        break;
      
      case 'confetti':
        // Celebration sequence
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((note, index) => {
          setTimeout(() => playTone(note, 0.2, 'sine', 0.08), index * 100);
        });
        break;
      
      default:
        break;
    }
  }, []);

  return { playSound };
};