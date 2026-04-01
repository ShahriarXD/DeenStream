# DeenStream

Premium Islamic lifestyle app with prayer times, Quran, tasbih, zakat calculator, hadith stories, and community duas.

## Features

- 🕌 **Prayer Times** - Accurate prayer times with notifications
- 📖 **Quran** - Complete Quran with translations and recitations
- 📿 **Tasbih** - Digital Islamic beads counter
- 💰 **Zakat Calculator** - Calculate your Zakat obligations
- 📚 **Hadith Stories** - Inspiring Islamic wisdom and teachings
- 🤲 **Community Duas** - Share and discover community prayers
- 🌍 **Dhikr Guide** - Islamic remembrance and meditation
- 📍 **Qibla Finder** - Find the direction of Kaaba from anywhere
- 📊 **Progress Tracker** - Track your spiritual journey
- 📖 **99 Names of Allah** - Learn the divine attributes
- 🕋 **Prayer Guide** - How to perform prayers correctly

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite
- **UI Components**: Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Testing**: Vitest, Playwright
- **State Management**: Zustand
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

See `SUPABASE_SETUP.md` for complete Supabase configuration.

```env
VITE_SUPABASE_URL=https://exlxztehrxcyevssnciq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs...
VITE_SUPABASE_PROJECT_ID=exlxztehrxcyevssnciq
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## Deployment

Deployed on Vercel. Push to main branch to trigger automatic deployment.

```bash
npm run build
vercel deploy --prod
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (routes)
├── data/               # Static data and constants
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations (Supabase)
├── contexts/           # React contexts (Auth)
├── stores/             # Zustand state management
└── lib/                # Utility functions
```

## Contributing

This is a personal project. For suggestions or issues, contact the author.

## Author

**KM SHAHRIAR HOSSAIN**

## License

MIT License - feel free to use this project for personal or educational purposes.

## Support

For setup issues, check the documentation files:

- `SUPABASE_SETUP.md` - Supabase configuration guide
- `API_KEY_FIX.md` - Fix common API key errors
