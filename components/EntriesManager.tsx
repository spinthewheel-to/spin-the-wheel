"use client";

import React, { useState } from "react";
import { Plus, Shuffle, ArrowDownAZ, Trash2, RotateCcw, ListFilter } from "lucide-react";

interface EntriesManagerProps {
  entries: string[];
  onChangeEntries: (newEntries: string[]) => void;
  disabled?: boolean;
}

const DEFAULT_SAMPLES = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
];

export const EntriesManager: React.FC<EntriesManagerProps> = ({
  entries,
  onChangeEntries,
  disabled = false,
}) => {
  const [newEntryText, setNewEntryText] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState(entries.join("\n"));

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEntryText.trim();
    if (trimmed) {
      onChangeEntries([...entries, trimmed]);
      setNewEntryText("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    onChangeEntries(updated);
  };

  const handleShuffle = () => {
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    onChangeEntries(shuffled);
  };

  const handleSort = () => {
    const sorted = [...entries].sort((a, b) => a.localeCompare(b));
    onChangeEntries(sorted);
  };

  const handleClear = () => {
    onChangeEntries([]);
  };

  const handleResetDefaults = () => {
    onChangeEntries(DEFAULT_SAMPLES);
  };

  const toggleBulkMode = () => {
    if (isBulkMode) {
      // Save bulk text to entries
      const parsed = bulkText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      onChangeEntries(parsed);
      setIsBulkMode(false);
    } else {
      setBulkText(entries.join("\n"));
      setIsBulkMode(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 flex flex-col h-full">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-800">Entries</h2>
          <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
            {entries.length}
          </span>
        </div>

        <button
          onClick={toggleBulkMode}
          disabled={disabled}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline disabled:opacity-50"
        >
          {isBulkMode ? "Save List" : "Bulk Edit"}
        </button>
      </div>

      {/* Main Content Area */}
      {isBulkMode ? (
        <div className="flex-1 flex flex-col mt-4">
          <textarea
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            disabled={disabled}
            placeholder="Enter one item per line..."
            rows={12}
            className="w-full flex-1 p-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono"
          />
          <button
            onClick={toggleBulkMode}
            className="mt-3 w-full py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            Apply Changes
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col mt-4">
          {/* Add input form */}
          <form onSubmit={handleAddSingle} className="flex gap-2 mb-3">
            <input
              type="text"
              value={newEntryText}
              onChange={(e) => setNewEntryText(e.target.value)}
              disabled={disabled}
              placeholder="Add new option..."
              className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={disabled || !newEntryText.trim()}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl transition flex items-center justify-center"
              aria-label="Add entry"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-1.5 mb-3 flex-wrap">
            <button
              onClick={handleShuffle}
              disabled={disabled || entries.length < 2}
              title="Shuffle entries"
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition disabled:opacity-40"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Shuffle
            </button>
            <button
              onClick={handleSort}
              disabled={disabled || entries.length < 2}
              title="Sort Alphabetically"
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition disabled:opacity-40"
            >
              <ArrowDownAZ className="w-3.5 h-3.5" />
              Sort
            </button>
            <button
              onClick={handleResetDefaults}
              disabled={disabled}
              title="Reset default options"
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={handleClear}
              disabled={disabled || entries.length === 0}
              title="Clear all"
              className="px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-1 transition ml-auto disabled:opacity-40"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>

          {/* Items list with scroll */}
          <div className="flex-1 overflow-y-auto max-h-[380px] space-y-1.5 pr-1">
            {entries.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No entries added yet. Type an option above to begin!
              </div>
            ) : (
              entries.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100/80 rounded-lg group transition border border-slate-100"
                >
                  <span className="text-sm font-medium text-slate-800 truncate mr-2">
                    {item}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    disabled={disabled}
                    className="text-slate-400 hover:text-rose-500 opacity-60 group-hover:opacity-100 transition p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
