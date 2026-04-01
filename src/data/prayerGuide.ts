export interface PrayerStep {
  title: string;
  arabic?: string;
  transliteration?: string;
  description: string;
}

export interface PrayerGuide {
  name: string;
  arabic: string;
  rakaat: number;
  sunnahBefore?: number;
  sunnahAfter?: number;
  time: string;
  videoId?: string;
  steps: PrayerStep[];
}

export const PRAYER_GUIDES: PrayerGuide[] = [
  {
    name: 'Fajr',
    arabic: 'الفجر',
    rakaat: 2,
    sunnahBefore: 2,
    time: 'Before sunrise',
    videoId: 'YhgSe6DFK-0',
    steps: [
      { title: 'Make Intention (Niyyah)', description: 'Stand facing the Qibla. Make the intention in your heart to pray 2 raka\'at of Fajr.' },
      { title: 'Takbiratul Ihram', arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', description: 'Raise both hands to ear level and say "Allahu Akbar". Place right hand over left on chest.' },
      { title: 'Opening Supplication', arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ', transliteration: 'Subhanaka Allahumma wa bihamdika', description: 'Recite the opening dua silently.' },
      { title: 'Recite Al-Fatiha', arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', description: 'Recite Surah Al-Fatiha. This is obligatory in every raka\'ah.' },
      { title: 'Recite a Surah', description: 'Recite any surah or verses from the Quran after Al-Fatiha. Fajr is recited aloud.' },
      { title: 'Ruku (Bowing)', arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', transliteration: 'Subhana Rabbiyal Azim', description: 'Bow with hands on knees, back straight. Say "Subhana Rabbiyal Azim" three times.' },
      { title: 'Stand from Ruku', arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ', transliteration: 'Sami\'allahu liman hamidah', description: 'Rise saying "Sami\'allahu liman hamidah", then "Rabbana wa lakal hamd".' },
      { title: 'First Sujud (Prostration)', arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', transliteration: 'Subhana Rabbiyal A\'la', description: 'Prostrate with forehead, nose, palms, knees, and toes touching the ground. Say "Subhana Rabbiyal A\'la" three times.' },
      { title: 'Sit between Sujud', description: 'Sit briefly between the two prostrations. Say "Rabbighfir li" (My Lord, forgive me).' },
      { title: 'Second Sujud', description: 'Prostrate again saying "Subhana Rabbiyal A\'la" three times.' },
      { title: 'Second Raka\'ah', description: 'Stand up for the second raka\'ah. Repeat from Al-Fatiha through the two sujud.' },
      { title: 'Tashahhud', arabic: 'التَّحِيَّاتُ لِلَّهِ', transliteration: 'At-tahiyyatu lillah', description: 'Sit and recite At-Tashahhud, pointing index finger.' },
      { title: 'Salawat on the Prophet ﷺ', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', description: 'Recite Salawat Ibrahimiyyah (Durood Ibrahim).' },
      { title: 'Tasleem', arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', transliteration: 'Assalamu alaykum wa rahmatullah', description: 'Turn head right then left, saying "Assalamu alaykum wa rahmatullah" each time.' },
    ],
  },
  {
    name: 'Dhuhr',
    arabic: 'الظهر',
    rakaat: 4,
    sunnahBefore: 4,
    sunnahAfter: 2,
    time: 'After the sun passes zenith',
    videoId: 'zXjFF35J9PE',
    steps: [
      { title: 'Make Intention', description: 'Intend to pray 4 raka\'at of Dhuhr. Dhuhr is prayed silently.' },
      { title: 'First 2 Raka\'at', description: 'Perform the first two raka\'at as normal — Takbir, Fatiha + Surah, Ruku, Sujud each raka\'ah. After the 2nd raka\'ah, sit for Tashahhud.' },
      { title: 'First Tashahhud', description: 'Recite At-Tashahhud only (not the full Salawat). Then stand up for the 3rd raka\'ah.' },
      { title: 'Last 2 Raka\'at', description: 'In the 3rd and 4th raka\'at, recite only Al-Fatiha (no additional surah). Complete ruku and sujud as normal.' },
      { title: 'Final Tashahhud', description: 'After the 4th raka\'ah, sit for the final Tashahhud + Salawat Ibrahimiyyah.' },
      { title: 'Tasleem', description: 'End by turning right then left with "Assalamu alaykum wa rahmatullah".' },
    ],
  },
  {
    name: 'Asr',
    arabic: 'العصر',
    rakaat: 4,
    time: 'Late afternoon',
    videoId: 'DcoNzaTl5ms',
    steps: [
      { title: 'Make Intention', description: 'Intend to pray 4 raka\'at of Asr. Asr is prayed silently.' },
      { title: 'Perform 4 Raka\'at', description: 'Same structure as Dhuhr: 2 raka\'at with Tashahhud, then 2 more raka\'at with only Fatiha, ending with full Tashahhud + Salawat + Tasleem.' },
    ],
  },
  {
    name: 'Maghrib',
    arabic: 'المغرب',
    rakaat: 3,
    sunnahAfter: 2,
    time: 'After sunset',
    videoId: '-7bw8v_MPmY',
    steps: [
      { title: 'Make Intention', description: 'Intend to pray 3 raka\'at of Maghrib. First 2 raka\'at are recited aloud, 3rd silently.' },
      { title: 'First 2 Raka\'at (Aloud)', description: 'Recite Fatiha + Surah aloud. Complete ruku and sujud. Sit for first Tashahhud after 2nd raka\'ah.' },
      { title: 'Third Raka\'ah (Silent)', description: 'Stand and recite only Al-Fatiha silently. Complete ruku and sujud.' },
      { title: 'Final Tashahhud + Tasleem', description: 'Sit for full Tashahhud, Salawat Ibrahimiyyah, then end with Tasleem.' },
    ],
  },
  {
    name: 'Isha',
    arabic: 'العشاء',
    rakaat: 4,
    sunnahAfter: 2,
    time: 'After twilight disappears',
    videoId: 'b0B2TWuqgos',
    steps: [
      { title: 'Make Intention', description: 'Intend to pray 4 raka\'at of Isha. First 2 are aloud, last 2 silent.' },
      { title: 'First 2 Raka\'at (Aloud)', description: 'Recite Fatiha + Surah aloud in each raka\'ah. Complete ruku and sujud. Sit for first Tashahhud.' },
      { title: 'Last 2 Raka\'at (Silent)', description: 'Recite only Fatiha silently. Complete ruku and sujud.' },
      { title: 'Final Tashahhud + Tasleem', description: 'Full Tashahhud, Salawat, then Tasleem right and left.' },
    ],
  },
  {
    name: 'Tahajjud',
    arabic: 'التهجد',
    rakaat: 2,
    time: 'Last third of the night',
    videoId: 'UAv2CnK9xPY',
    steps: [
      { title: 'Make Intention', description: 'Wake up in the last third of the night. Make intention to pray voluntary Tahajjud prayer.' },
      { title: 'Pray in Pairs of 2', description: 'Tahajjud is prayed in sets of 2 raka\'at. You can pray 2, 4, 6, 8, or more raka\'at. Each pair ends with Tasleem.' },
      { title: 'Recite Long Surahs', description: 'It is sunnah to recite longer portions of the Quran during Tahajjud. Take your time in each position.' },
      { title: 'Make Dua', description: 'The last third of the night is the best time for dua. After finishing your prayer, raise your hands and ask Allah for anything.' },
      { title: 'End with Witr', description: 'It is recommended to end your night prayers with Witr — an odd number of raka\'at (1 or 3). Include Dua al-Qunoot in the last raka\'ah.' },
    ],
  },
];
