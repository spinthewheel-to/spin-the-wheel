"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Trophy, RotateCw, Trash2, X } from "lucide-react";

interface WinnerModalProps {
  winner: string | null;
  onClose: () => void;
  onRemoveWinner: (item: string) => void;
  onSpinAgain: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  winner,
  onClose,
  onRemoveWinner,
  onSpinAgain,
}) => {
  useEffect(() => {
    if (winner) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"],
        });
      } catch {
        // Fallback if canvas-confetti fails
      }
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center border border-slate-100 transform transition-all animate-scale-up">
        {/* Close icon button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
          <Trophy className="w-8 h-8" />
        </div>

        <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
          We Have a Winner!
        </h3>

        <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 break-words">
            {winner}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => {
              onClose();
              onSpinAgain();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all"
          >
            <RotateCw className="w-4 h-4" />
            Spin Again
          </button>
          <button
            onClick={() => {
              onRemoveWinner(winner);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-xl border border-rose-200 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Remove Option
          </button>
        </div>
      </div>
    </div>
  );
};
