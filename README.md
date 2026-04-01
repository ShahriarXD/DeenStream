# 🕌 DeenStream

> **Premium Islamic Lifestyle Companion** – Your all-in-one digital platform for spiritual growth, Islamic knowledge, and community connection.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://deen-essence-glow.vercel.app/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

## 🚀 Live Preview

**👉 [Visit DeenStream Live](https://deen-essence-glow.vercel.app/)**

---

## ✨ Key Features

### 📿 Spiritual Practice

- **🕌 Prayer Times** – Real-time accurate prayer times with intelligent notifications for your location
- **📖 Quran Reader** – Complete Quran with multiple translations, audio recitations, and bookmark functionality
- **📿 Tasbih Counter** – Digital Islamic beads counter for Dhikr with customizable counters
- **🌍 Dhikr Guide** – Curated Islamic remembrance practices and meditations for daily spirituality

### 📚 Islamic Knowledge

- **📚 Hadith Stories** – Inspiring Islamic wisdom, teachings, and stories from authentic sources
- **📖 99 Names of Allah** – Learn and explore the divine attributes with meanings and significance
- **🕋 Prayer Guide** – Step-by-step visual guide on how to perform prayers correctly

### 🤲 Community & Tools

- **🤲 Community Duas** – Share, discover, and join community prayers and supplications
- **💰 Zakat Calculator** – Calculate your Zakat obligations with ease and transparency
- **📍 Qibla Finder** – Find the precise direction of the Kaaba from anywhere in the world
- **📊 Progress Tracker** – Track your spiritual journey and daily devotional milestones

## 🛠️ Tech Stack

| Category               | Technology                                         |
| ---------------------- | -------------------------------------------------- |
| **Frontend Framework** | React 18 with TypeScript for type-safe development |
| **Build Tool**         | Vite – Next-generation frontend build tool         |
| **Styling**            | Tailwind CSS with custom components                |
| **UI Library**         | Shadcn/ui – Premium component library              |
| **Backend & Database** | Supabase (PostgreSQL) with real-time sync          |
| **Authentication**     | Supabase Auth with secure OAuth flows              |
| **State Management**   | Zustand – Lightweight state management             |
| **Animations**         | Framer Motion for smooth interactions              |
| **Testing**            | Vitest (unit) + Playwright (E2E)                   |
| **Deployment**         | Vercel with automatic CI/CD                        |
| **Quality**            | ESLint, Prettier, TypeScript strict mode           |

## 📋 Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **Bun** package manager
- **Git** for version control

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ShahriarXD/DeenStream.git
cd deen-essence-glow
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

For complete Supabase setup instructions, see `SUPABASE_SETUP.md`

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 💻 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Lint code with ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Project Structure

```
src/
├── components/              # Reusable React components
│   ├── ui/                 # Shadcn/ui components
│   ├── AzkarDetailView.tsx
│   ├── DuaDetailView.tsx
│   ├── SurahReader.tsx
│   └── ...
├── pages/                  # Route-based page components
│   ├── AuthPage.tsx
│   ├── DashboardPage.tsx
│   ├── QuranPage.tsx
│   └── ...
├── contexts/               # React Context API providers
│   └── AuthContext.tsx
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── data/                   # Static data and constants
│   ├── duas.ts
│   ├── hadithStories.ts
│   ├── namesOfAllah.ts
│   └── prayerGuide.ts
├── integrations/           # Third-party service integrations
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── stores/                 # Zustand state management
│   └── useAppStore.ts
├── lib/                    # Utility functions and helpers
│   └── utils.ts
├── App.tsx                 # Root component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## 🚀 Deployment

### Vercel Deployment

DeenStream is automatically deployed on **Vercel** with continuous integration:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod
```

**Live:** [https://deen-essence-glow.vercel.app](https://deen-essence-glow.vercel.app/)

### Deployment Features

- ✅ Automatic deployments on `main` branch push
- ✅ Preview URLs for all pull requests
- ✅ Environment variable management
- ✅ Edge caching and image optimization
- ✅ Analytics and performance monitoring

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style

- Follow TypeScript strict mode
- Use ESLint and Prettier for formatting
- Write tests for new features
- Keep components small and reusable

## 📚 Documentation

For detailed setup and configuration:

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) – Database & authentication configuration
- [API_KEY_FIX.md](./API_KEY_FIX.md) – Troubleshoot API key issues

## 👤 Author

**KM SHAHRIAR HOSSAIN**

- GitHub: [@ShahriarXD](https://github.com/ShahriarXD)
- Email: Contact via GitHub profile

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

## ⭐ Show Your Support

If you found DeenStream helpful for your spiritual journey, give it a star! ⭐

---

<div align="center">
  
**[Visit DeenStream Live →](https://deen-essence-glow.vercel.app/)**

Made with ❤️ for the Muslim Community

</div>
