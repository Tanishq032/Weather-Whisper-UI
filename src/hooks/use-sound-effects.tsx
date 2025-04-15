
import { useState, useEffect } from "react";

// Define the sounds we'll use in the app
const SOUND_EFFECTS = {
  click: new Audio("/sounds/click.mp3"),
  toggle: new Audio("/sounds/toggle.mp3"),
  notification: new Audio("/sounds/notification.mp3"),
  switch: new Audio("/sounds/switch.mp3"),
};

export function useSoundEffects() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    return localStorage.getItem("sound-effects") === "true";
  });

  // Update localStorage when the sound effects setting changes
  useEffect(() => {
    localStorage.setItem("sound-effects", enabled.toString());
  }, [enabled]);

  // Initialize all audio elements
  useEffect(() => {
    // Set all audio elements to low volume
    Object.values(SOUND_EFFECTS).forEach(audio => {
      audio.volume = 0.3;
      // Preload the audio files
      audio.load();
    });
  }, []);

  const play = (sound: keyof typeof SOUND_EFFECTS) => {
    if (!enabled) return;
    
    // Stop and reset the audio before playing
    SOUND_EFFECTS[sound].pause();
    SOUND_EFFECTS[sound].currentTime = 0;
    
    // Play the audio
    const playPromise = SOUND_EFFECTS[sound].play();
    
    // Handle potential play() promise rejection
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Audio play error:", error);
      });
    }
  };

  return {
    enabled,
    setEnabled,
    play
  };
}
