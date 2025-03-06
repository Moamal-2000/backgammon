import { GAME_SOUNDS } from "@/Data/constants";

export function playSound(fileName, extension = "mp3") {
  const soundPath = `/Sounds/Game/${fileName}.${extension}`;
  const sound = new Audio(soundPath);

  sound.play();
  return sound;
}

export function preloadGameSounds() {
  GAME_SOUNDS.forEach((fileName) => {
    const sound = new Audio(`/Sounds/Game/${fileName}.mp3`);
    sound.preload = "auto";
  });
}
