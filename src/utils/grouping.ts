import type { WiktionaryEntry, EtymologyGroup } from '../types/WiktionaryEntry';

export function groupByEtymology(entries: WiktionaryEntry[]): EtymologyGroup[] {
  const groups = new Map<number | null, WiktionaryEntry[]>();

  entries.forEach(entry => {
    const key = entry.etymology_number;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(entry);
  });

  return Array.from(groups.entries()).map(([etymologyNumber, entries]) => ({
    etymologyNumber,
    entries,
  })).sort((a, b) => {
    if (a.etymologyNumber === null) return 1;
    if (b.etymologyNumber === null) return -1;
    return a.etymologyNumber - b.etymologyNumber;
  });
}