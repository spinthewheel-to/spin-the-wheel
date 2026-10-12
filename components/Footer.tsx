import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>
          Open-Source Random Decision Wheel. Built with Next.js, React, and Tailwind CSS.
        </p>
        <p>
          Released under the MIT License. Free for personal and commercial use.
        </p>
      </div>
    </footer>
  );
};
