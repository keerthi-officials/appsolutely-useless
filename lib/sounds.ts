export const playSound = (type: "click" | "success" | "fail" | "meow"): void => {
  if (typeof window === "undefined") return;

  try {
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case "click":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          400,
          audioContext.currentTime + 0.1,
        );
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1,
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case "success":
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          659,
          audioContext.currentTime + 0.1,
        );
        oscillator.frequency.setValueAtTime(
          784,
          audioContext.currentTime + 0.2,
        );
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3,
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case "fail":
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          100,
          audioContext.currentTime + 0.5,
        );
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.5,
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;

      case "meow":
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          audioContext.currentTime + 0.1,
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          audioContext.currentTime + 0.3,
        );
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3,
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1,
        );
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
  } catch (err) {
    console.warn("Could not play sound", err);
  }
};
