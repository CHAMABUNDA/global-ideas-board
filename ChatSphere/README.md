# 🌍 Global Ideas Board

A collaborative platform for sharing and developing ideas aligned with the UN Sustainable Development Goals (SDGs).

## Features

- **Real-time Collaboration**: WebSocket-powered live updates across all users
- **SDG Integration**: Full support for all 17 UN Sustainable Development Goals
- **Progress Tracking**: Four development stages from Concept to Impact
- **Rich Content**: Text, images, tags, and file uploads
- **Interactive Analytics**: Visual charts and heatmaps
- **Search & Filter**: Advanced filtering by SDG, stage, and keywords
- **Comments System**: Threaded discussions on ideas
- **Responsive Design**: Works perfectly on mobile and desktop

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, WebSocket
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tools**: Vite, ESBuild
- **Deployment**: Vercel/Railway ready

## Quick Start

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd global-ideas-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your DATABASE_URL
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add `DATABASE_URL` environment variable
3. Deploy automatically

### Railway
1. Connect GitHub repository to Railway
2. Add `DATABASE_URL` environment variable
3. Deploy automatically

## Environment Variables

```
DATABASE_URL=postgresql://user:password@host:port/database
```

Get a free PostgreSQL database from [Neon](https://neon.tech) or [Railway](https://railway.app).

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run check  # Type check
```

## License

MIT License - feel free to use for personal and commercial projects.