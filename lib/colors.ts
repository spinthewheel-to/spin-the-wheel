export const DEFAULT_PALETTE = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#14B8A6", // Teal
  "#6366F1", // Indigo
  "#84CC16", // Lime
  "#D946EF", // Fuchsia
];

export function getSegmentColor(index: number, total: number): string {
  if (total <= DEFAULT_PALETTE.length) {
    // If adjacent segments would match at end wrap-around
    if (index === total - 1 && index % DEFAULT_PALETTE.length === 0) {
      return DEFAULT_PALETTE[1];
    }
    return DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
  }
  // Generate HSL dynamically for large lists
  const hue = Math.floor((360 / total) * index);
  return `hsl(${hue}, 75%, 55%)`;
}
