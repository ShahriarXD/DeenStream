import { useState, useRef, useCallback } from 'react';
import { Volume2, Loader2, VolumeX } from 'lucide-react';

interface Props {
  arabic: string;
}

export default function DuaAudioButton({ arabic }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(() => {
    if (playing) {
      speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    setLoading(true);
    const utterance = new SpeechSynthesisUtterance(arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    // Try to find an Arabic voice
    const voices = speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arVoice) utterance.voice = arVoice;

    utterance.onstart = () => { setLoading(false); setPlaying(true); };
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => { setLoading(false); setPlaying(false); };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [arabic, playing]);

  return (
    <button
      onClick={speak}
      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 tap-scale ${
        playing ? 'gradient-gold text-accent-foreground' : 'bg-secondary/40 text-muted-foreground hover:text-gold'
      }`}
      aria-label={playing ? 'Stop audio' : 'Play audio'}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : playing ? (
        <VolumeX size={14} />
      ) : (
        <Volume2 size={14} />
      )}
    </button>
  );
}
