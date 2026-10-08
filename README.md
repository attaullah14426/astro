# Astro — Birth Chart

Next.js application that integrates with **AstrologyAPI** to calculate and display birth horoscopes.

## Features

- **Birth Details Form**: Input birth date, time, latitude, longitude, timezone, house system, and optional asteroids.
- **API Integration**: Connects securely via a Next.js server route handler to AstrologyAPI.
- **Planetary Positions**: Displays planets with sign, degree, house placement, and retrograde status.
- **Houses & Aspects**: Shows house cusps and planetary aspects.
- **Raw JSON Output**: Developer view for raw response payload.

## Tech Stack

- Next.js (App Router)
- React & TypeScript
- CSS

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```env
ASTROLOGY_API_KEY=your_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
npm run build
npm start
```
