"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WheelCanvas } from "@/components/WheelCanvas";
import { EntriesManager } from "@/components/EntriesManager";
import { WinnerModal } from "@/components/WinnerModal";
import { History, List, Sparkles } from "lucide-react";

const INITIAL_ENTRIES = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
];

const PRESETS = [
  {
    name: "Yes or No",
    items: ["Yes", "No", "Maybe", "Definitely", "Ask Again"],
  },
  {
    name: "Numbers (1-6)",
    items: ["1", "2", "3", "4", "5", "6"],
  },
  {
    name: "Lunch Ideas",
    items: ["Pizza", "Sushi", "Burger", "Salad", "Tacos", "Noodles"],
  },
  {
    name: "Days of Week",
    items: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Weekend"],
  },
];

interface SpinRecord {
  winner: string;
  time: string;
}

export default function Home() {
  const [entries, setEntries] = useState<string[]>(INITIAL_ENTRIES);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<SpinRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"entries" | "history">("entries");

  const handleSpinStart = () => {
    if (isSpinning || entries.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
  };

  const handleSpinEnd = (winningItem: string) => {
    setIsSpinning(false);
    setWinner(winningItem);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setHistory((prev) => [{ winner: winningItem, time: timeStr }, ...prev]);
  };

  const handleRemoveWinner = (winningItem: string) => {
    setEntries((prev) => {
      const idx = prev.indexOf(winningItem);
      if (idx !== -1) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev;
    });
  };

  const applyPreset = (items: string[]) => {
    if (isSpinning) return;
    setEntries(items);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Presets shortcut bar */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.items)}
              disabled={isSpinning}
              className="px-3 py-1 bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-700 text-xs font-medium rounded-full border border-slate-200 transition shrink-0 shadow-2xs"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Wheel on Left, Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wheel Section */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 flex flex-col items-center justify-center">
            <WheelCanvas
              items={entries}
              isSpinning={isSpinning}
              onSpinStart={handleSpinStart}
              onSpinEnd={handleSpinEnd}
            />
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Tab Navigation */}
            <div className="flex bg-slate-200/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("entries")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === "entries"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                Entries ({entries.length})
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
                  activeTab === "history"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Results ({history.length})
              </button>
            </div>

            {/* Tab Panels */}
            {activeTab === "entries" ? (
              <EntriesManager
                entries={entries}
                onChangeEntries={setEntries}
                disabled={isSpinning}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 min-h-[420px] flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h2 className="font-semibold text-slate-800 text-sm">
                    Recent Winners
                  </h2>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1">
                  {history.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      No spin results yet. Spin the wheel to record winners!
                    </div>
                  ) : (
                    history.map((record, index) => (
                      <div
                        key={`${record.winner}-${index}`}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                      >
                        <span className="font-semibold text-slate-800 text-sm">
                          {record.winner}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {record.time}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Winner Pop-up Celebration */}
      <WinnerModal
        winner={winner}
        onClose={() => setWinner(null)}
        onRemoveWinner={handleRemoveWinner}
        onSpinAgain={handleSpinStart}
      />
    </div>
  );
}
