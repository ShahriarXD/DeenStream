export interface DuaItem {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
}

export interface DuaCategory {
  id: string;
  title: string;
  emoji: string;
  duas: DuaItem[];
}

export const DUA_CATEGORIES: DuaCategory[] = [
  {
    id: 'sleep',
    title: 'Before & After Sleep',
    emoji: '🌙',
    duas: [
      { id: 1, arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', transliteration: 'Bismika Allahumma amutu wa ahya', translation: 'In Your name, O Allah, I die and I live.', reference: 'Bukhari' },
      { id: 2, arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', transliteration: 'Alhamdulillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur', translation: 'Praise be to Allah who gave us life after death and to Him is the resurrection.', reference: 'Bukhari' },
      { id: 3, arabic: 'اللَّهُمَّ بِاسْـمِكَ أَحْيَا وَبِاسْـمِكَ أَمُوتُ', transliteration: 'Allahumma bismika ahya wa bismika amut', translation: 'O Allah, in Your name I live and in Your name I die.', reference: 'Bukhari & Muslim' },
    ],
  },
  {
    id: 'toilet',
    title: 'Entering & Leaving Toilet',
    emoji: '🚿',
    duas: [
      { id: 4, arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', transliteration: 'Allahumma inni a\'udhu bika minal-khubuthi wal-khaba\'ith', translation: 'O Allah, I seek refuge with You from evil and evil ones.', reference: 'Bukhari & Muslim' },
      { id: 5, arabic: 'غُفْرَانَكَ', transliteration: 'Ghufranaka', translation: 'I ask You (Allah) for forgiveness.', reference: 'Abu Dawud & Tirmidhi' },
    ],
  },
  {
    id: 'prayer',
    title: 'Before & After Prayer',
    emoji: '🕌',
    duas: [
      { id: 6, arabic: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ', transliteration: 'Allahumma ba\'id bayni wa bayna khatayaya kama ba\'adta baynal-mashriqi wal-maghrib', translation: 'O Allah, put a great distance between me and my sins, as great as the distance between East and West.', reference: 'Bukhari & Muslim' },
      { id: 7, arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah, Astaghfirullah, Astaghfirullah', translation: 'I seek the forgiveness of Allah (3 times after prayer).', reference: 'Muslim' },
      { id: 8, arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', transliteration: 'Allahumma antas-salamu wa minkas-salamu tabarakta ya dhal-jalali wal-ikram', translation: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.', reference: 'Muslim' },
    ],
  },
  {
    id: 'home',
    title: 'Entering & Leaving Home',
    emoji: '🏠',
    duas: [
      { id: 9, arabic: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا', transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala Rabbina tawakkalna', translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.', reference: 'Abu Dawud' },
      { id: 10, arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', transliteration: 'Bismillah, tawakkaltu \'alallah, la hawla wa la quwwata illa billah', translation: 'In the name of Allah, I place my trust in Allah, there is no power except with Allah.', reference: 'Abu Dawud & Tirmidhi' },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    emoji: '✈️',
    duas: [
      { id: 11, arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ', transliteration: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun', translation: 'Glory be to Him who has subjected this to us, and we could never have it. And to our Lord we shall return.', reference: 'Az-Zukhruf 43:13-14' },
      { id: 12, arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى', transliteration: 'Allahumma inna nas\'aluka fi safarina hadha al-birra wat-taqwa', translation: 'O Allah, we ask You in this journey for righteousness and piety.', reference: 'Muslim' },
    ],
  },
  {
    id: 'food',
    title: 'Before & After Eating',
    emoji: '🍽️',
    duas: [
      { id: 13, arabic: 'بِسْمِ اللَّهِ', transliteration: 'Bismillah', translation: 'In the name of Allah.', reference: 'Abu Dawud & Tirmidhi' },
      { id: 14, arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', transliteration: 'Alhamdulillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin', translation: 'Praise be to Allah who fed us, gave us drink, and made us Muslims.', reference: 'Abu Dawud & Tirmidhi' },
      { id: 15, arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', transliteration: 'Bismillahi wa \'ala barakatillah', translation: 'In the name of Allah and with the blessing of Allah.', reference: 'Abu Dawud' },
    ],
  },
  {
    id: 'mosque',
    title: 'Entering & Leaving Mosque',
    emoji: '🕋',
    duas: [
      { id: 16, arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', transliteration: 'Allahummaf-tah li abwaba rahmatik', translation: 'O Allah, open for me the gates of Your mercy.', reference: 'Muslim' },
      { id: 17, arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', transliteration: 'Allahumma inni as\'aluka min fadlik', translation: 'O Allah, I ask You from Your bounty.', reference: 'Muslim' },
    ],
  },
  {
    id: 'morning-evening',
    title: 'Morning & Evening',
    emoji: '🌅',
    duas: [
      { id: 18, arabic: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ', transliteration: 'Asbahna \'ala fitratil-Islam wa \'ala kalimatil-ikhlas', translation: 'We have begun a new day upon the natural religion of Islam, upon the word of sincerity.', reference: 'Ahmad' },
      { id: 19, arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur', translation: 'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.', reference: 'Tirmidhi' },
    ],
  },
  {
    id: 'distress',
    title: 'In Times of Distress',
    emoji: '💔',
    duas: [
      { id: 20, arabic: 'لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ', transliteration: 'La ilaha illa anta subhanaka inni kuntu minaz-zalimin', translation: 'There is no god but You, Glory be to You. Indeed, I have been of the wrongdoers.', reference: 'Al-Anbiya 21:87' },
      { id: 21, arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', transliteration: 'Hasbunallahu wa ni\'mal-wakil', translation: 'Allah is sufficient for us, and He is the best disposer of affairs.', reference: 'Al Imran 3:173' },
    ],
  },
];

export interface AzkarItem {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  reference?: string;
}

export interface AzkarCategory {
  id: string;
  title: string;
  emoji: string;
  items: AzkarItem[];
}

export const AZKAR_CATEGORIES: AzkarCategory[] = [
  {
    id: 'after-prayer',
    title: 'After Prayer',
    emoji: '🤲',
    items: [
      { id: 1, arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness of Allah.', count: 3, reference: 'Muslim' },
      { id: 2, arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', translation: 'Glory be to Allah.', count: 33, reference: 'Muslim' },
      { id: 3, arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', translation: 'Praise be to Allah.', count: 33, reference: 'Muslim' },
      { id: 4, arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', translation: 'Allah is the Greatest.', count: 33, reference: 'Muslim' },
      { id: 5, arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', transliteration: 'La ilaha illallahu wahdahu la sharika lah', translation: 'There is no god but Allah alone with no partner.', count: 1, reference: 'Muslim' },
      { id: 6, arabic: 'آيَةُ الْكُرْسِيِّ', transliteration: 'Ayatul Kursi', translation: 'Recite Ayatul Kursi after each prayer.', count: 1, reference: 'An-Nasa\'i' },
    ],
  },
  {
    id: 'rizq',
    title: 'For Rizq (Sustenance)',
    emoji: '💰',
    items: [
      { id: 7, arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ', transliteration: 'Allahumma-kfini bihalalika \'an haramika wa aghnini bifadlika \'amman siwak', translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.', count: 7, reference: 'Tirmidhi' },
      { id: 8, arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah. (Istighfar opens doors of rizq)', count: 100, reference: 'Nuh 71:10-12' },
    ],
  },
  {
    id: 'knowledge',
    title: 'For Knowledge',
    emoji: '📚',
    items: [
      { id: 9, arabic: 'رَبِّ زِدْنِي عِلْمًا', transliteration: 'Rabbi zidni \'ilma', translation: 'My Lord, increase me in knowledge.', count: 7, reference: 'Ta-Ha 20:114' },
      { id: 10, arabic: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي', transliteration: 'Allahumma-nfa\'ni bima \'allamtani wa \'allimni ma yanfa\'uni', translation: 'O Allah, benefit me by that which You have taught me, and teach me that which will benefit me.', count: 3, reference: 'Ibn Majah' },
    ],
  },
  {
    id: 'debt',
    title: 'Relief from Debt',
    emoji: '🔓',
    items: [
      { id: 11, arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ', transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wa a\'udhu bika minal-\'ajzi wal-kasal, wa a\'udhu bika minal-jubni wal-bukhl, wa a\'udhu bika min ghalabatid-dayni wa qahrir-rijal', translation: 'O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from cowardice and stinginess, from being overcome by debt and overpowered by men.', count: 3, reference: 'Bukhari' },
    ],
  },
  {
    id: 'forgiveness',
    title: 'Seeking Forgiveness',
    emoji: '🕊️',
    items: [
      { id: 12, arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ', transliteration: 'Astaghfirullaha al-\'Azim alladhi la ilaha illa huwa al-Hayyu al-Qayyumu wa atubu ilayh', translation: 'I seek the forgiveness of Allah the Mighty, whom there is none worthy of worship except Him, the Living, the Sustainer, and I turn to Him in repentance.', count: 3, reference: 'Abu Dawud & Tirmidhi' },
      { id: 13, arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory be to Allah and His is the praise. (Sins forgiven even if like sea foam)', count: 100, reference: 'Bukhari & Muslim' },
    ],
  },
  {
    id: 'protection',
    title: 'Protection',
    emoji: '🛡️',
    items: [
      { id: 14, arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim', translation: 'In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, All-Knowing.', count: 3, reference: 'Abu Dawud & Tirmidhi' },
      { id: 15, arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', transliteration: 'A\'udhu bikalimatiLlahit-tammati min sharri ma khalaq', translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.', count: 3, reference: 'Muslim' },
    ],
  },
];
