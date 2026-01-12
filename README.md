# NASA Near Earth Objects Dashboard

A dashboard that displays Near Earth Objects (NEO) data from NASA's API. Select a date range to see asteroids and their closest approach to Earth.

## Prerequisites

- Node.js 20+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Get a NASA API key (free) from https://api.nasa.gov/ and add it to `server/.env`:

```
NASA_API_KEY=your_api_key_here
```

## Running the Project

Start both the frontend and backend in separate terminals:

**Frontend** (runs on http://localhost:5173):
```bash
npm run dev
```

**Backend** (runs on http://localhost:3000):
```bash
npm run server
```

## API Documentation

Once the server is running, view the interactive API docs at:

http://localhost:3000/docs

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Fastify
- TypeScript
- OpenAPI/Swagger
