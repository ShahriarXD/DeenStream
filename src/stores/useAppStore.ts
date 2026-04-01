import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

interface DayProgress {
  date: string;
  prayersCompleted: number;
  prayersDone: Record<PrayerName, boolean>;
  quranMinutes: number;
  tasbihTotal: number;
  dhikrCompleted: boolean;
}

interface AppState {
  // Location
  location: { lat: number; lng: number } | null;
  calculationMethod: number;

  // Quran
  lastReadSurah: number;
  lastReadAyah: number;
  quranFontSize: number;

  // Tasbih
  tasbihCount: number;
  tasbihMode: 33 | 99 | 0;
  tasbihLifetime: number;

  // Streak
  currentStreak: number;
  lastActiveDate: string;

  // Progress
  todayProgress: DayProgress;
  weeklyHistory: DayProgress[];

  // Settings
  accentIntensity: number; // 0-100
  prayerReminderMinutes: number;
  nightModeEnabled: boolean;

  // Ambient audio
  ambientPlaying: boolean;
  ambientTrack: string;

  // Actions
  setLocation: (loc: { lat: number; lng: number }) => void;
  setCalculationMethod: (method: number) => void;
  setLastRead: (surah: number, ayah: number) => void;
  setQuranFontSize: (size: number) => void;
  setTasbihCount: (count: number) => void;
  setTasbihMode: (mode: 33 | 99 | 0) => void;
  resetTasbih: () => void;
  incrementTasbihLifetime: () => void;
  togglePrayer: (prayer: PrayerName) => void;
  addQuranMinutes: (mins: number) => void;
  markDhikrCompleted: () => void;
  updateStreak: () => void;
  setAccentIntensity: (v: number) => void;
  setPrayerReminderMinutes: (v: number) => void;
  setNightModeEnabled: (v: boolean) => void;
  setAmbientPlaying: (v: boolean) => void;
  setAmbientTrack: (t: string) => void;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

const EMPTY_PRAYERS: Record<PrayerName, boolean> = { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false };

function emptyDay(date: string): DayProgress {
  return { date, prayersCompleted: 0, prayersDone: { ...EMPTY_PRAYERS }, quranMinutes: 0, tasbihTotal: 0, dhikrCompleted: false };
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      location: null,
      calculationMethod: 2,
      lastReadSurah: 1,
      lastReadAyah: 1,
      quranFontSize: 22,
      tasbihCount: 0,
      tasbihMode: 33,
      tasbihLifetime: 0,
      currentStreak: 0,
      lastActiveDate: '',
      todayProgress: emptyDay(getToday()),
      weeklyHistory: [],
      accentIntensity: 70,
      prayerReminderMinutes: 10,
      nightModeEnabled: false,
      ambientPlaying: false,
      ambientTrack: 'quran',

      setLocation: (loc) => set({ location: loc }),
      setCalculationMethod: (method) => set({ calculationMethod: method }),
      setLastRead: (surah, ayah) => set({ lastReadSurah: surah, lastReadAyah: ayah }),
      setQuranFontSize: (size) => set({ quranFontSize: size }),
      setTasbihCount: (count) => set({ tasbihCount: count }),
      setTasbihMode: (mode) => set({ tasbihMode: mode }),
      resetTasbih: () => set({ tasbihCount: 0 }),
      incrementTasbihLifetime: () => {
        const state = get();
        const today = getToday();
        const tp = state.todayProgress.date === today ? state.todayProgress : emptyDay(today);
        set({
          tasbihLifetime: state.tasbihLifetime + 1,
          todayProgress: { ...tp, date: today, tasbihTotal: tp.tasbihTotal + 1 },
        });
      },
      togglePrayer: (prayer: PrayerName) => {
        const state = get();
        const today = getToday();
        const tp = state.todayProgress.date === today ? state.todayProgress : emptyDay(today);
        const prayersDone = { ...EMPTY_PRAYERS, ...tp.prayersDone, [prayer]: !tp.prayersDone?.[prayer] };
        const prayersCompleted = Object.values(prayersDone).filter(Boolean).length;
        set({ todayProgress: { ...tp, date: today, prayersDone, prayersCompleted } });
      },
      addQuranMinutes: (mins) => {
        const state = get();
        const today = getToday();
        const tp = state.todayProgress.date === today ? state.todayProgress : emptyDay(today);
        set({ todayProgress: { ...tp, date: today, quranMinutes: tp.quranMinutes + mins } });
      },
      markDhikrCompleted: () => {
        const state = get();
        const today = getToday();
        const tp = state.todayProgress.date === today ? state.todayProgress : emptyDay(today);
        set({ todayProgress: { ...tp, date: today, dhikrCompleted: true } });
      },
      updateStreak: () => {
        const state = get();
        const today = getToday();
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (state.lastActiveDate === today) return;

        let newStreak = 1;
        if (state.lastActiveDate === yesterday) {
          newStreak = state.currentStreak + 1;
        }

        // Archive today if needed
        const history = [...state.weeklyHistory];
        if (state.todayProgress.date !== today && state.todayProgress.date) {
          history.push(state.todayProgress);
          if (history.length > 7) history.shift();
        }

        set({
          currentStreak: newStreak,
          lastActiveDate: today,
          weeklyHistory: history,
          todayProgress: state.todayProgress.date === today ? state.todayProgress : emptyDay(today),
        });
      },
      setAccentIntensity: (v) => set({ accentIntensity: v }),
      setPrayerReminderMinutes: (v) => set({ prayerReminderMinutes: v }),
      setNightModeEnabled: (v) => set({ nightModeEnabled: v }),
      setAmbientPlaying: (v) => set({ ambientPlaying: v }),
      setAmbientTrack: (t) => set({ ambientTrack: t }),
    }),
    { name: 'deenstream-storage' }
  )
);
