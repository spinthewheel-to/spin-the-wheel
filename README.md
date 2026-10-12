# Spin The Wheel - Random Decision Maker

An interactive, responsive, and open-source random picker wheel web application built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- **Interactive 2D Canvas Wheel:** High-DPI retina display rendering with smooth physics-based rotation and customizable segments.
- **Synthesized Audio Effects:** Realistic mechanical wheel tick sounds and victory fanfare generated dynamically using the Web Audio API (zero external audio file dependencies).
- **Winner Celebration:** Confetti particle explosion and dedicated winner announcement dialog.
- **Flexible Entries Management:**
  - Add individual options or bulk paste multiline lists.
  - Shuffle and sort entries alphabetically.
  - Remove winning items on the fly.
  - Quick presets (Yes/No, Numbers 1-6, Lunch ideas, Days of week).
- **Results History:** Automatically records each spin winner with accurate timestamps.
- **Clean & Responsive UI:** Fully optimized for mobile, tablet, and desktop viewports.

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/your-username/spin-the-wheel-app.git
cd spin-the-wheel-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

---

## Project Structure

```text
├── app/
│   ├── globals.css          # Tailwind CSS styles and animations
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Main page container and state
├── components/
│   ├── EntriesManager.tsx   # Options management & toolbar
│   ├── Footer.tsx           # Page footer
│   ├── Header.tsx           # Top navigation and sound controls
│   ├── WheelCanvas.tsx      # HTML5 Canvas wheel renderer
│   └── WinnerModal.tsx      # Winner pop-up dialog with confetti
├── lib/
│   ├── audio.ts             # Web Audio API sound generator
│   └── colors.ts            # Segment color palettes
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## License

This project is licensed under the [MIT License](LICENSE).
