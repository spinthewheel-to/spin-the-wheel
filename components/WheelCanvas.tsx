"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { getSegmentColor } from "@/lib/colors";
import { soundManager } from "@/lib/audio";

interface WheelCanvasProps {
  items: string[];
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (winner: string) => void;
  duration?: number;
}

export const WheelCanvas: React.FC<WheelCanvasProps> = ({
  items,
  isSpinning,
  onSpinStart,
  onSpinEnd,
  duration = 5500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickSegmentRef = useRef<number>(-1);

  const total = items.length;
  const arc = total > 0 ? (2 * Math.PI) / total : 0;

  // Redraw canvas at specific rotation angle
  const drawWheel = useCallback(
    (angle: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const size = canvas.width / dpr;
      const center = size / 2;
      const radius = center - 20;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (total === 0) {
        ctx.fillStyle = "#94a3b8";
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Add items to spin", center, center);
        ctx.restore();
        return;
      }

      // Outer drop shadow ring
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 6;
      ctx.beginPath();
      ctx.arc(center, center, radius + 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();

      // Draw segments
      for (let i = 0; i < total; i++) {
        const segAngle = angle + i * arc;

        ctx.beginPath();
        ctx.fillStyle = getSegmentColor(i, total);
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, segAngle, segAngle + arc, false);
        ctx.lineTo(center, center);
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(segAngle + arc / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";

        const fontSize = Math.max(12, Math.min(20, Math.floor(280 / total)));
        ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 3;

        // Truncate long text
        const maxTextLength = Math.floor(radius * 0.65);
        let text = items[i];
        if (ctx.measureText(text).width > maxTextLength) {
          while (ctx.measureText(text + "...").width > maxTextLength && text.length > 1) {
            text = text.slice(0, -1);
          }
          text += "...";
        }

        ctx.fillText(text, radius - 24, 0);
        ctx.restore();
      }

      // Center Hub
      ctx.beginPath();
      ctx.arc(center, center, 48, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(center, center, 42, 0, 2 * Math.PI);
      ctx.fillStyle = "#1e293b";
      ctx.fill();

      // Hub Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 0;
      ctx.fillText(isSpinning ? "SPINNING" : "SPIN", center, center);

      // Top Pointer / Ticker
      ctx.save();
      ctx.translate(center, 12);
      ctx.beginPath();
      ctx.moveTo(-16, 0);
      ctx.lineTo(16, 0);
      ctx.lineTo(0, 28);
      ctx.closePath();
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    },
    [items, total, arc, isSpinning]
  );

  // Initialize canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const displaySize = 440;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    canvas.style.width = `${displaySize}px`;
    canvas.style.height = `${displaySize}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    drawWheel(currentAngleRef.current);
  }, [drawWheel]);

  // Handle spinning animation
  useEffect(() => {
    if (!isSpinning || total === 0) return;

    const startAngle = currentAngleRef.current;
    // 5 to 8 full rotations + random extra angle
    const extraRotations = (5 + Math.random() * 3) * 2 * Math.PI;
    const targetAngle = startAngle + extraRotations;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth custom ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3.5);
      const angle = startAngle + (targetAngle - startAngle) * easeOut;

      currentAngleRef.current = angle;
      drawWheel(angle);

      // Calculate current segment passing the top pointer (at 3*PI/2)
      const pointerAngle = (3 * Math.PI) / 2;
      const normalizedAngle = (pointerAngle - (angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const currentSegment = Math.floor(normalizedAngle / arc);

      if (currentSegment !== lastTickSegmentRef.current) {
        soundManager.playTick();
        lastTickSegmentRef.current = currentSegment;
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished: determine winner
        const winnerIndex = currentSegment % total;
        soundManager.playWin();
        onSpinEnd(items[winnerIndex]);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSpinning, total, arc, duration, items, drawWheel, onSpinEnd]);

  const handleCenterClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSpinning || total === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const center = rect.width / 2;
    const dist = Math.sqrt((x - center) ** 2 + (y - center) ** 2);

    // If clicked inside or near wheel
    if (dist <= center) {
      onSpinStart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative select-none max-w-full">
        <canvas
          ref={canvasRef}
          onClick={handleCenterClick}
          className="cursor-pointer transition-transform duration-200 active:scale-[0.99] rounded-full max-w-[90vw] max-h-[90vw]"
        />
      </div>
      <button
        onClick={onSpinStart}
        disabled={isSpinning || total === 0}
        className="mt-6 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:cursor-not-allowed transform active:scale-95"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </button>
    </div>
  );
};
