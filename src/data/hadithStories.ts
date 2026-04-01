export interface HadithSlide {
  type: 'title' | 'hadith' | 'lesson' | 'action';
  text: string;
  subtext?: string;
}

export interface HadithStory {
  id: string;
  title: string;
  category: string;
  emoji: string;
  gradient: string;
  slides: HadithSlide[];
  source: string;
}

export const HADITH_CATEGORIES = [
  { id: 'faith', label: 'Faith', emoji: '🤲' },
  { id: 'prayer', label: 'Prayer', emoji: '🕌' },
  { id: 'patience', label: 'Patience', emoji: '🌿' },
  { id: 'charity', label: 'Charity', emoji: '💛' },
  { id: 'character', label: 'Character', emoji: '✨' },
  { id: 'knowledge', label: 'Knowledge', emoji: '📖' },
  { id: 'family', label: 'Family', emoji: '🏠' },
  { id: 'repentance', label: 'Repentance', emoji: '🌅' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'brotherhood', label: 'Brotherhood', emoji: '🤝' },
];

const g1 = "from-sky-400/60 to-blue-600/80";
const g2 = "from-blue-500/60 to-indigo-700/80";
const g3 = "from-teal-400/60 to-cyan-600/80";
const g4 = "from-amber-400/50 to-orange-500/70";
const g5 = "from-violet-400/50 to-purple-600/70";
const g6 = "from-rose-400/40 to-pink-500/60";
const g7 = "from-emerald-400/50 to-green-600/70";
const g8 = "from-indigo-400/50 to-blue-700/70";

export const HADITH_STORIES: HadithStory[] = [
  // ── FAITH ──
  {
    id: "deeds-by-intentions", title: "Intentions Matter", category: "faith", emoji: "🤲", gradient: g1, source: "Sahih al-Bukhari 1",
    slides: [
      { type: "title", text: "Intentions Matter", subtext: "The foundation of every deed" },
      { type: "hadith", text: "\"Actions are judged by intentions, and every person will get what they intended.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Every single thing you do — praying, working, eating — its value before Allah depends on why you did it." },
      { type: "action", text: "Before your next action today, pause and renew your intention. Make it for Allah." },
    ],
  },
  {
    id: "remove-harm", title: "Remove Harm", category: "faith", emoji: "🛤️", gradient: g3, source: "Sahih Muslim 35",
    slides: [
      { type: "title", text: "Remove Harm from the Path", subtext: "A small act, a great reward" },
      { type: "hadith", text: "\"Removing something harmful from the road is an act of charity.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Islam teaches that even the smallest good deed counts. Picking up trash from a walkway is worship." },
      { type: "action", text: "Next time you see something harmful on the ground, pick it up. That is your sadaqah for the day." },
    ],
  },
  {
    id: "dhikr-easy", title: "Light on the Tongue", category: "faith", emoji: "💎", gradient: g8, source: "Sahih al-Bukhari 6406",
    slides: [
      { type: "title", text: "Light on the Tongue, Heavy on the Scale", subtext: "Two phrases beloved to Allah" },
      { type: "hadith", text: "\"Two phrases are light on the tongue, heavy on the scales, and beloved to the Most Merciful: SubhanAllahi wa bihamdihi, SubhanAllahil Azeem.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "You do not need hours of worship. Just these two phrases, said with sincerity, weigh heavily on your scale of good deeds." },
      { type: "action", text: "Say SubhanAllahi wa bihamdihi, SubhanAllahil Azeem 10 times right now." },
    ],
  },
  {
    id: "branches-faith", title: "Branches of Faith", category: "faith", emoji: "🌳", gradient: g7, source: "Sahih Muslim 35",
    slides: [
      { type: "title", text: "Branches of Faith", subtext: "Faith is more than belief" },
      { type: "hadith", text: "\"Faith has over seventy branches. The highest is La ilaha illallah. The lowest is removing harm from the path. And modesty is a branch of faith.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Faith is not just in the heart. It shows in your words, actions, and even your shyness from doing wrong." },
      { type: "action", text: "Identify one branch of faith you can strengthen today — kindness, honesty, or modesty." },
    ],
  },
  {
    id: "love-for-brother", title: "Love for Others", category: "faith", emoji: "💙", gradient: g1, source: "Sahih al-Bukhari 13",
    slides: [
      { type: "title", text: "Love for Your Brother", subtext: "The sign of true faith" },
      { type: "hadith", text: "\"None of you truly believes until he loves for his brother what he loves for himself.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "True faith goes beyond rituals. It means genuinely wanting good for others, not just yourself." },
      { type: "action", text: "Think of someone you know. Wish them something good in your heart, then do something to help them." },
    ],
  },
  {
    id: "sweetness-faith", title: "Sweetness of Faith", category: "faith", emoji: "🍯", gradient: g4, source: "Sahih al-Bukhari 16",
    slides: [
      { type: "title", text: "Sweetness of Faith", subtext: "When faith becomes joy" },
      { type: "hadith", text: "\"Three things — whoever has them will taste the sweetness of faith: loving Allah and His Messenger above all else, loving someone only for Allah, and hating to return to disbelief as one hates to be thrown into fire.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Faith is not always a struggle. When you love Allah sincerely, you begin to feel peace and sweetness in worship." },
      { type: "action", text: "Reflect: what do you love most? Ask Allah to make Him and His Messenger the most beloved to you." },
    ],
  },
  {
    id: "allah-mercy", title: "Mercy of Allah", category: "faith", emoji: "🌊", gradient: g3, source: "Sahih Muslim 2752",
    slides: [
      { type: "title", text: "The Mercy of Allah", subtext: "Never lose hope" },
      { type: "hadith", text: "\"Allah divided mercy into 100 parts. He kept 99 with Him and sent down 1 to earth. From that 1 part comes all the compassion creatures show to one another.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "All the love and kindness you see in this world is just 1% of His mercy. Imagine what awaits in the Hereafter." },
      { type: "action", text: "Never despair. No matter what you have done, His mercy is greater. Turn to Him right now." },
    ],
  },

  // ── PRAYER ──
  {
    id: "fajr-protection", title: "Fajr Prayer", category: "prayer", emoji: "🌙", gradient: g2, source: "Sahih Muslim 656",
    slides: [
      { type: "title", text: "The Protection of Fajr", subtext: "Start your day under His care" },
      { type: "hadith", text: "\"Whoever prays Fajr is under the protection of Allah.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Fajr is not just a prayer — it is a shield. Starting your day with Allah means you begin under His care." },
      { type: "action", text: "Set your alarm for Fajr tomorrow. Make it the first thing you do." },
    ],
  },
  {
    id: "prayer-coolness", title: "Coolness of Eyes", category: "prayer", emoji: "👁️", gradient: g1, source: "Sunan an-Nasai 3939",
    slides: [
      { type: "title", text: "Coolness of My Eyes", subtext: "The joy of the Prophet ﷺ" },
      { type: "hadith", text: "\"The coolness of my eyes has been placed in prayer.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Prayer was not a burden for the Prophet ﷺ. It was his comfort, his peace, his joy. It can be yours too." },
      { type: "action", text: "In your next prayer, slow down. Feel every word. Let it become comfort, not routine." },
    ],
  },
  {
    id: "five-prayers-river", title: "River of Purification", category: "prayer", emoji: "🏞️", gradient: g3, source: "Sahih al-Bukhari 528",
    slides: [
      { type: "title", text: "The River of Purification", subtext: "Five daily cleansings" },
      { type: "hadith", text: "\"If there was a river at the door of one of you and he bathed in it five times a day, would any dirt remain? That is the example of the five prayers — Allah wipes away sins with them.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Every prayer washes away your sins. Five times a day, you get a fresh start." },
      { type: "action", text: "Do not miss any of your five prayers today. Each one is a cleansing." },
    ],
  },
  {
    id: "last-third-night", title: "Last Third of Night", category: "prayer", emoji: "🌌", gradient: g2, source: "Sahih al-Bukhari 1145",
    slides: [
      { type: "title", text: "The Last Third of the Night", subtext: "When Allah descends" },
      { type: "hadith", text: "\"Our Lord descends every night to the lowest heaven in the last third and says: Who is calling upon Me that I may answer? Who is asking of Me that I may give? Who is seeking My forgiveness that I may forgive?\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "The most powerful time for dua is the last third of the night. Allah Himself is asking who needs Him." },
      { type: "action", text: "Set an alarm before Fajr. Wake up, pray 2 rakaat, and pour your heart out in dua." },
    ],
  },
  {
    id: "sunnah-prayers", title: "12 Sunnah Prayers", category: "prayer", emoji: "🔑", gradient: g8, source: "Sunan at-Tirmidhi 414",
    slides: [
      { type: "title", text: "A House in Jannah", subtext: "Through 12 sunnah prayers" },
      { type: "hadith", text: "\"Whoever prays 12 voluntary rak'at every day, Allah will build for him a house in Paradise.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Just 12 extra rak'at — 2 before Fajr, 4 before and 2 after Dhuhr, 2 after Maghrib, 2 after Isha. A house in Jannah." },
      { type: "action", text: "Start today. Add just the 2 sunnah before Fajr if you are not already praying them." },
    ],
  },

  // ── PATIENCE ──
  {
    id: "patience-light", title: "Patience is Light", category: "patience", emoji: "🌅", gradient: g4, source: "Sahih Muslim 223",
    slides: [
      { type: "title", text: "Patience is Light", subtext: "The strength within stillness" },
      { type: "hadith", text: "\"Patience is a light.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "When life gets hard, patience does not mean doing nothing. It means trusting His plan while doing your best." },
      { type: "action", text: "The next time something frustrates you, pause. Breathe. Say Alhamdulillah and respond with calm." },
    ],
  },
  {
    id: "patience-first-strike", title: "At First Strike", category: "patience", emoji: "💪", gradient: g6, source: "Sahih al-Bukhari 1283",
    slides: [
      { type: "title", text: "Patience at the First Strike", subtext: "The hardest moment" },
      { type: "hadith", text: "\"True patience is at the first stroke of calamity.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Anyone can be patient after time heals. The real test is your reaction in the first moment of shock." },
      { type: "action", text: "Prepare yourself. When something bad happens, let your first words be Inna lillahi wa inna ilayhi rajiun." },
    ],
  },
  {
    id: "ease-after-hardship", title: "Ease After Hardship", category: "patience", emoji: "🌤️", gradient: g1, source: "Quran 94:5-6",
    slides: [
      { type: "title", text: "Ease After Hardship", subtext: "A divine promise" },
      { type: "hadith", text: "\"Indeed, with hardship comes ease. Indeed, with hardship comes ease.\"", subtext: "— Quran 94:5-6" },
      { type: "lesson", text: "Allah repeats it twice. Not after hardship, but WITH hardship. Relief is already on its way." },
      { type: "action", text: "If you are going through something hard right now, hold on. The ease is already there, even if you cannot see it yet." },
    ],
  },
  {
    id: "trial-believers", title: "Trials of Believers", category: "patience", emoji: "⚖️", gradient: g5, source: "Sunan at-Tirmidhi 2398",
    slides: [
      { type: "title", text: "Trials of the Believers", subtext: "Hardship as a sign of love" },
      { type: "hadith", text: "\"The greatest reward comes from the greatest trial. When Allah loves a people, He tests them.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "If you are being tested, it may be a sign that Allah wants to elevate you. Hardship is not punishment — it can be love." },
      { type: "action", text: "Reframe your current difficulty. See it as a chance to grow closer to Allah." },
    ],
  },
  {
    id: "no-worry-believer", title: "No Loss for Believer", category: "patience", emoji: "🛡️", gradient: g7, source: "Sahih Muslim 2999",
    slides: [
      { type: "title", text: "The Believer Never Loses", subtext: "Every situation is a win" },
      { type: "hadith", text: "\"How wonderful is the affair of the believer! If something good happens, he is grateful — and that is good for him. If something bad happens, he is patient — and that is good for him.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "A believer is always winning. Gratitude in good times, patience in hard times — both are rewarded." },
      { type: "action", text: "Whatever is happening in your life right now, choose the right response: gratitude or patience." },
    ],
  },

  // ── CHARITY ──
  {
    id: "smile-charity", title: "Your Smile", category: "charity", emoji: "😊", gradient: g4, source: "Jami at-Tirmidhi 1956",
    slides: [
      { type: "title", text: "Your Smile is Charity", subtext: "The easiest good deed" },
      { type: "hadith", text: "\"Your smiling in the face of your brother is charity.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "You do not need money to give charity. A genuine smile can brighten someone entire day." },
      { type: "action", text: "Smile at someone today — a stranger, a colleague, a family member." },
    ],
  },
  {
    id: "feeding-hungry", title: "Feed the Hungry", category: "charity", emoji: "🍞", gradient: g4, source: "Sahih al-Bukhari 12",
    slides: [
      { type: "title", text: "Feed the Hungry", subtext: "The best of actions" },
      { type: "hadith", text: "\"The best Islam is that you feed the hungry and spread peace to those you know and those you do not know.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Feeding people is not just charity — it is one of the best expressions of your faith." },
      { type: "action", text: "Share food with someone today. Even offering a snack to a colleague counts." },
    ],
  },
  {
    id: "charity-shade", title: "Shade of Charity", category: "charity", emoji: "☂️", gradient: g3, source: "Sahih Muslim 1003",
    slides: [
      { type: "title", text: "In the Shade of Your Charity", subtext: "Protection on the Day of Judgment" },
      { type: "hadith", text: "\"The believer will be in the shade of his charity on the Day of Judgment.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Every penny you give in charity becomes a shade tree protecting you on the hottest day imaginable." },
      { type: "action", text: "Give something in charity today — even if it is small. Build your shade." },
    ],
  },
  {
    id: "secret-charity", title: "Secret Charity", category: "charity", emoji: "🤫", gradient: g5, source: "Sahih al-Bukhari 1423",
    slides: [
      { type: "title", text: "Charity in Secret", subtext: "When no one sees but Allah" },
      { type: "hadith", text: "\"Seven people will be shaded by Allah… among them: a person who gives charity so secretly that his left hand does not know what his right hand has given.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "The most rewarded charity is the one no one knows about. When you give for Allah alone, the reward is immense." },
      { type: "action", text: "Give something anonymously today. Do not tell anyone." },
    ],
  },
  {
    id: "good-word-charity", title: "A Good Word", category: "charity", emoji: "💬", gradient: g1, source: "Sahih al-Bukhari 2989",
    slides: [
      { type: "title", text: "A Good Word is Charity", subtext: "Your words have value" },
      { type: "hadith", text: "\"Every good word is charity.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "You do not always need money. A kind word, encouragement, or even saying SubhanAllah is charity." },
      { type: "action", text: "Say something kind to someone today. Encourage them, compliment them, or simply greet them warmly." },
    ],
  },
  {
    id: "water-charity", title: "Best Charity", category: "charity", emoji: "💧", gradient: g3, source: "Sunan Abu Dawud 1681",
    slides: [
      { type: "title", text: "The Best Charity", subtext: "Giving water" },
      { type: "hadith", text: "\"The best charity is giving water to drink.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Something as simple as giving water is the highest form of charity. Imagine the reward for providing a well." },
      { type: "action", text: "Offer someone a glass of water today. Or donate to a water well project." },
    ],
  },

  // ── CHARACTER ──
  {
    id: "best-of-you", title: "Best to Family", category: "character", emoji: "🏠", gradient: g5, source: "Sunan Ibn Majah 1977",
    slides: [
      { type: "title", text: "Best to Your Family", subtext: "Where true character shows" },
      { type: "hadith", text: "\"The best of you are those who are best to their families.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Your real character is not shown in public — it is shown at home." },
      { type: "action", text: "Do one unexpected kind thing for a family member today." },
    ],
  },
  {
    id: "control-anger", title: "Control Anger", category: "character", emoji: "🧘", gradient: g6, source: "Sahih al-Bukhari 6114",
    slides: [
      { type: "title", text: "Control Your Anger", subtext: "True strength is restraint" },
      { type: "hadith", text: "\"The strong person is not the one who can wrestle someone else. The strong person is the one who can control himself when he is angry.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Real power is not physical. It is the ability to stay calm when everything inside you wants to explode." },
      { type: "action", text: "If you feel anger rising today, sit down if standing, stay silent, and seek refuge in Allah." },
    ],
  },
  {
    id: "truthfulness", title: "Be Truthful", category: "character", emoji: "✅", gradient: g7, source: "Sahih al-Bukhari 6094",
    slides: [
      { type: "title", text: "Truthfulness Leads to Jannah", subtext: "The path of the righteous" },
      { type: "hadith", text: "\"Truthfulness leads to righteousness, and righteousness leads to Paradise.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Every truth you speak builds a path to Jannah. Every lie builds a path elsewhere. Choose wisely." },
      { type: "action", text: "Be completely truthful today — even in small things." },
    ],
  },
  {
    id: "modesty", title: "Modesty is Good", category: "character", emoji: "🌸", gradient: g6, source: "Sahih Muslim 37",
    slides: [
      { type: "title", text: "Modesty Brings Only Good", subtext: "A beautiful quality" },
      { type: "hadith", text: "\"Modesty does not bring anything except good.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Modesty is not weakness. It is dignity, self-respect, and awareness of Allah in every situation." },
      { type: "action", text: "Practice modesty today — in speech, dress, or behavior." },
    ],
  },
  {
    id: "gentleness", title: "Be Gentle", category: "character", emoji: "🕊️", gradient: g1, source: "Sahih Muslim 2593",
    slides: [
      { type: "title", text: "Gentleness in Everything", subtext: "Beauty through softness" },
      { type: "hadith", text: "\"Allah is Gentle and loves gentleness in all things.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Harshness pushes people away. Gentleness draws them closer — to you and to Islam." },
      { type: "action", text: "Be extra gentle with people today — in your tone, your words, and your actions." },
    ],
  },
  {
    id: "no-harm", title: "Do No Harm", category: "character", emoji: "🚫", gradient: g2, source: "Sunan Ibn Majah 2341",
    slides: [
      { type: "title", text: "Do No Harm", subtext: "A fundamental rule" },
      { type: "hadith", text: "\"There should be no harm and no reciprocal harm.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Do not hurt others. And if someone hurts you, do not retaliate with harm. Break the cycle." },
      { type: "action", text: "If someone wrongs you today, respond with patience instead of revenge." },
    ],
  },
  {
    id: "best-character", title: "Best Character", category: "character", emoji: "🏆", gradient: g4, source: "Sunan at-Tirmidhi 2003",
    slides: [
      { type: "title", text: "Closest to the Prophet ﷺ", subtext: "Through good character" },
      { type: "hadith", text: "\"The dearest and closest of you to me on the Day of Resurrection will be those who are best in character.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Not the most prayers, not the most fasting — the best character. That is what brings you closest to him ﷺ." },
      { type: "action", text: "Work on one character trait today: patience, kindness, honesty, or humility." },
    ],
  },

  // ── KNOWLEDGE ──
  {
    id: "seeking-knowledge", title: "Seek Knowledge", category: "knowledge", emoji: "📚", gradient: g8, source: "Sunan Ibn Majah 224",
    slides: [
      { type: "title", text: "Seek Knowledge", subtext: "An obligation upon every Muslim" },
      { type: "hadith", text: "\"Seeking knowledge is an obligation upon every Muslim.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Learning is not optional in Islam. Pursuing beneficial knowledge is worship." },
      { type: "action", text: "Learn one new thing today. Read an ayah, learn a word of Arabic, or study something beneficial." },
    ],
  },
  {
    id: "path-knowledge", title: "Path to Jannah", category: "knowledge", emoji: "🛣️", gradient: g2, source: "Sahih Muslim 2699",
    slides: [
      { type: "title", text: "Knowledge Leads to Jannah", subtext: "A path made easy" },
      { type: "hadith", text: "\"Whoever takes a path seeking knowledge, Allah will make easy for him a path to Paradise.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Every moment spent learning — attending a class, reading a book, watching a lecture — Allah smooths your road to Jannah." },
      { type: "action", text: "Spend 10 minutes learning something Islamic today. Watch a short lecture or read a hadith." },
    ],
  },
  {
    id: "angels-knowledge", title: "Angels Seek Scholars", category: "knowledge", emoji: "👼", gradient: g5, source: "Sunan Abu Dawud 3641",
    slides: [
      { type: "title", text: "Angels Lower Their Wings", subtext: "For the seeker of knowledge" },
      { type: "hadith", text: "\"The angels lower their wings for the seeker of knowledge, pleased with what he is doing.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "When you sit to learn, angels honor you. The entire creation prays for the one who teaches people good." },
      { type: "action", text: "Sit down and learn something right now. The angels are watching." },
    ],
  },
  {
    id: "share-knowledge", title: "Share What You Know", category: "knowledge", emoji: "📢", gradient: g1, source: "Sahih al-Bukhari 3461",
    slides: [
      { type: "title", text: "Convey Even One Verse", subtext: "Everyone can teach" },
      { type: "hadith", text: "\"Convey from me, even if it is one verse.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "You do not need to be a scholar to share. If you know one ayah, one hadith — share it." },
      { type: "action", text: "Share one beneficial Islamic teaching with someone today." },
    ],
  },

  // ── FAMILY ──
  {
    id: "parents-jannah", title: "Parents are Jannah", category: "family", emoji: "👨‍👩‍👧", gradient: g7, source: "Sunan Ibn Majah 2781",
    slides: [
      { type: "title", text: "Paradise Under Their Feet", subtext: "The status of parents" },
      { type: "hadith", text: "\"Paradise lies at the feet of your mother.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Your mother carried you, raised you, loved you unconditionally. Serving her is your shortcut to Jannah." },
      { type: "action", text: "Call your mother today. Tell her you love her. If she has passed, make dua for her." },
    ],
  },
  {
    id: "kind-to-children", title: "Kind to Children", category: "family", emoji: "👶", gradient: g6, source: "Sahih al-Bukhari 5997",
    slides: [
      { type: "title", text: "Mercy to Children", subtext: "Show them love" },
      { type: "hadith", text: "\"He who does not show mercy to our young ones is not one of us.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Children need your love, your time, your attention. Being merciful to them is a sign of your faith." },
      { type: "action", text: "Spend quality time with a child today. Play with them, teach them, or simply listen." },
    ],
  },
  {
    id: "ties-kinship", title: "Ties of Kinship", category: "family", emoji: "🔗", gradient: g3, source: "Sahih al-Bukhari 5984",
    slides: [
      { type: "title", text: "Maintain Family Ties", subtext: "Even when it is hard" },
      { type: "hadith", text: "\"The one who maintains family ties is not the one who reciprocates. Rather, it is the one who maintains them even when they are cut off.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "True connection means reaching out even when relatives do not reach back. That is real strength." },
      { type: "action", text: "Reach out to a relative you have not spoken to in a while. A simple message counts." },
    ],
  },
  {
    id: "spouse-kindness", title: "Kind to Spouse", category: "family", emoji: "💑", gradient: g6, source: "Sunan at-Tirmidhi 3895",
    slides: [
      { type: "title", text: "Best to Your Spouse", subtext: "The measure of your character" },
      { type: "hadith", text: "\"The best of you is the one who is best to his wife, and I am the best of you to my wives.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Your marriage is not just a contract. It is a mirror of your faith and character." },
      { type: "action", text: "Do something kind for your spouse today — or if unmarried, make dua for a righteous partner." },
    ],
  },

  // ── REPENTANCE ──
  {
    id: "door-repentance", title: "Door is Open", category: "repentance", emoji: "🚪", gradient: g7, source: "Sahih Muslim 2759",
    slides: [
      { type: "title", text: "The Door is Always Open", subtext: "Allah awaits your return" },
      { type: "hadith", text: "\"Allah extends His hand at night to accept the repentance of those who sinned during the day, and extends His hand during the day to accept the repentance of those who sinned at night.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "No matter when you sinned, the door to repentance is open. Allah actively reaches out to forgive you." },
      { type: "action", text: "Make sincere tawbah right now. Allah is waiting for you." },
    ],
  },
  {
    id: "joy-repentance", title: "Allah Rejoices", category: "repentance", emoji: "🎉", gradient: g4, source: "Sahih Muslim 2747",
    slides: [
      { type: "title", text: "Allah Rejoices at Your Return", subtext: "More than you can imagine" },
      { type: "hadith", text: "\"Allah is more delighted with the repentance of His servant than a person who finds his lost camel in a waterless desert.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "When you repent, Allah does not just forgive — He is overjoyed. He loves it when you come back to Him." },
      { type: "action", text: "Do not be ashamed to repent again and again. He never tires of forgiving." },
    ],
  },
  {
    id: "istighfar-relief", title: "Istighfar Brings Relief", category: "repentance", emoji: "🌧️", gradient: g3, source: "Sunan Abu Dawud 1518",
    slides: [
      { type: "title", text: "Relief Through Istighfar", subtext: "A solution to every worry" },
      { type: "hadith", text: "\"Whoever makes istighfar constantly, Allah will give him a way out of every difficulty and relief from every anxiety, and will provide for him from sources he never imagined.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Stressed? Anxious? Stuck? Say Astaghfirullah. It is not just seeking forgiveness — it unlocks provision and ease." },
      { type: "action", text: "Say Astaghfirullah 100 times today. Notice how your heart feels after." },
    ],
  },
  {
    id: "sins-forgiven", title: "Sins Like Sea Foam", category: "repentance", emoji: "🌊", gradient: g1, source: "Sahih Muslim 2691",
    slides: [
      { type: "title", text: "Sins Like Sea Foam", subtext: "Wiped away completely" },
      { type: "hadith", text: "\"Whoever says SubhanAllahi wa bihamdihi 100 times a day will have his sins forgiven, even if they were like the foam of the sea.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "No matter how many sins you have — even if they pile up like ocean foam — this simple dhikr can wipe them all away." },
      { type: "action", text: "Say SubhanAllahi wa bihamdihi 100 times today. It takes just a few minutes." },
    ],
  },

  // ── GRATITUDE ──
  {
    id: "grateful-rich", title: "Gratitude is Wealth", category: "gratitude", emoji: "💰", gradient: g4, source: "Sahih al-Bukhari 6446",
    slides: [
      { type: "title", text: "True Wealth is Gratitude", subtext: "Richness of the soul" },
      { type: "hadith", text: "\"Richness is not having many possessions. Rather, true richness is the richness of the soul.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "You can have everything and feel empty. Or have little and feel rich. It all depends on your heart." },
      { type: "action", text: "List 3 things you are grateful for right now. Feel the richness of contentment." },
    ],
  },
  {
    id: "look-below", title: "Look Below You", category: "gratitude", emoji: "👇", gradient: g7, source: "Sahih Muslim 2963",
    slides: [
      { type: "title", text: "Look at Those Below You", subtext: "The key to contentment" },
      { type: "hadith", text: "\"Look at those below you and do not look at those above you. It is more suitable so that you do not belittle the blessings of Allah.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Comparing yourself to those who have more breeds ingratitude. Looking at those with less breeds thankfulness." },
      { type: "action", text: "Stop comparing yourself to those above you. Look at your blessings and say Alhamdulillah." },
    ],
  },
  {
    id: "thank-people", title: "Thank People", category: "gratitude", emoji: "🙏", gradient: g1, source: "Sunan Abu Dawud 4811",
    slides: [
      { type: "title", text: "Thank the People", subtext: "Gratitude starts with creation" },
      { type: "hadith", text: "\"He who does not thank people does not thank Allah.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Thanking Allah includes thanking the people He sends to help you. Gratitude to people is part of faith." },
      { type: "action", text: "Thank someone today who you normally take for granted. Be specific about what they did." },
    ],
  },
  {
    id: "alhamdulillah-fills", title: "Alhamdulillah", category: "gratitude", emoji: "⚖️", gradient: g8, source: "Sahih Muslim 223",
    slides: [
      { type: "title", text: "Alhamdulillah Fills the Scale", subtext: "A weighty word" },
      { type: "hadith", text: "\"Alhamdulillah fills the scales of good deeds.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "One word — Alhamdulillah — fills your entire scale. Imagine saying it throughout the day." },
      { type: "action", text: "Say Alhamdulillah after every blessing you notice today. Make it a habit." },
    ],
  },

  // ── BROTHERHOOD ──
  {
    id: "muslim-brother", title: "Your Brother", category: "brotherhood", emoji: "🤝", gradient: g2, source: "Sahih al-Bukhari 2442",
    slides: [
      { type: "title", text: "A Muslim is a Brother", subtext: "The bond of Ummah" },
      { type: "hadith", text: "\"A Muslim is a brother of another Muslim. He does not oppress him, nor does he hand him over to an oppressor.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Brotherhood in Islam is not just a word. It means standing up for each other and never causing harm." },
      { type: "action", text: "Stand up for someone today. Defend someone being wronged, even with your words." },
    ],
  },
  {
    id: "greeting-peace", title: "Spread Salam", category: "brotherhood", emoji: "👋", gradient: g1, source: "Sahih Muslim 54",
    slides: [
      { type: "title", text: "Spread the Salam", subtext: "The easiest way to love" },
      { type: "hadith", text: "\"You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something that will make you love each other? Spread the salam among yourselves.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Saying Assalamu Alaykum is not just a greeting — it is a prayer for peace and a builder of love." },
      { type: "action", text: "Greet every Muslim you meet today with a warm Assalamu Alaykum. Watch how it changes the mood." },
    ],
  },
  {
    id: "visiting-sick", title: "Visit the Sick", category: "brotherhood", emoji: "🏥", gradient: g3, source: "Sahih Muslim 2569",
    slides: [
      { type: "title", text: "Visit the Sick", subtext: "Angels pray for you" },
      { type: "hadith", text: "\"When a Muslim visits a sick Muslim, he is in the garden of Paradise until he returns.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Visiting someone who is ill is not just kind — you are literally walking in the gardens of Paradise while doing it." },
      { type: "action", text: "Check on someone who is sick or going through a hard time. A message or visit means the world." },
    ],
  },
  {
    id: "dont-envy", title: "Avoid Envy", category: "brotherhood", emoji: "💚", gradient: g5, source: "Sahih Muslim 2563",
    slides: [
      { type: "title", text: "Do Not Envy One Another", subtext: "Protect your heart" },
      { type: "hadith", text: "\"Do not envy one another, do not inflate prices, do not hate one another, do not turn away from one another, and do not undercut one another. Be slaves of Allah, brothers.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "Envy eats good deeds like fire eats wood. Celebrate what others have and trust in what Allah has for you." },
      { type: "action", text: "When you see someone with something you want, say MashaAllah and make dua for them sincerely." },
    ],
  },
  {
    id: "body-of-believers", title: "One Body", category: "brotherhood", emoji: "🫀", gradient: g6, source: "Sahih Muslim 2586",
    slides: [
      { type: "title", text: "One Body", subtext: "The Ummah is connected" },
      { type: "hadith", text: "\"The believers are like one body. When one limb aches, the whole body responds with sleeplessness and fever.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "When Muslims anywhere suffer, it should affect you. We are one body — their pain is your pain." },
      { type: "action", text: "Make dua for the Ummah today. Feel their struggles as your own." },
    ],
  },
  {
    id: "dua-for-absent", title: "Dua for Others", category: "brotherhood", emoji: "🌙", gradient: g8, source: "Sahih Muslim 2732",
    slides: [
      { type: "title", text: "Dua for Your Brother in Absence", subtext: "An angel says Ameen for you" },
      { type: "hadith", text: "\"The dua of a Muslim for his brother in his absence is answered. At his head is an appointed angel. Every time he makes dua for his brother, the angel says: Ameen, and the same for you.\"", subtext: "— Prophet Muhammad ﷺ" },
      { type: "lesson", text: "When you pray for someone else, an angel prays the same for you. The most selfless dua comes right back to you." },
      { type: "action", text: "Pick 3 people and make sincere dua for them right now. An angel is saying Ameen for you." },
    ],
  },
];
