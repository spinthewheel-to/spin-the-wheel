# Spin The Wheel - Random Decision Maker

[![Official Website](https://img.shields.io/badge/Official%20Website-SpinTheWheel.to-blue)](https://spinthewheel.to/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Official Live Application:** [https://spinthewheel.to](https://spinthewheel.to/)  
> Experience the full-featured, free online random picker wheel for classroom activities, giveaways, raffles, and decision-making.

---

An interactive, responsive, and open-source random picker wheel web application inspired by [SpinTheWheel.to](https://spinthewheel.to/). Built with **Next.js 14 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Live Demo & Official Platform

You can try the live production version with extended themes, multi-language support, and custom sound profiles directly at:

👉 **[https://spinthewheel.to](https://spinthewheel.to/)**

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
- **Official Service:** [SpinTheWheel.to](https://spinthewheel.to/)

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your system.

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/spinthewheel-to/spin-the-wheel.git
cd spin-the-wheel
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
│   ├── Footer.tsx           # Page footer with backlinks
│   ├── Header.tsx           # Top navigation and official link
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

## Official Links

- **Website:** [https://spinthewheel.to](https://spinthewheel.to/)
- **Repository:** [https://github.com/spinthewheel-to/spin-the-wheel](https://github.com/spinthewheel-to/spin-the-wheel)

---

## License

This project is licensed under the [MIT License](LICENSE).
