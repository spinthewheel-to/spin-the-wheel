"use client";

import React, { useState } from "react";
import { Disc, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { soundManager } from "@/lib/audio";

export const Header: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    soundManager.enabled = nextState;
    setSoundEnabled(nextState);
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="https://spinthewheel.to/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 bg-blue-600 group-hover:bg-blue-700 transition rounded-xl flex items-center justify-center text-white shadow-sm">
            <Disc className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-tight">
              Spin The Wheel
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Free Random Decision Maker & Picker
            </p>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute audio" : "Unmute audio"}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Official Website Backlink */}
          <a
            href="https://spinthewheel.to/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
          >
            <span>Official Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
