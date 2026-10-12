import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>
          Open-Source Random Decision Wheel inspired by{" "}
          <a
            href="https://spinthewheel.to/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            SpinTheWheel.to
          </a>
          . Built with Next.js, React, and Tailwind CSS.
        </p>
        <p>
          Released under the MIT License. Free for personal and commercial use.
        </p>
      </div>
    </footer>
  );
};
