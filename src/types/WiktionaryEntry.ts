export interface WiktionaryEntry {
  etymology_number: number | null;
  id: number;
  pronunciation: string;
  word: string;
  gloss: string;
  pos: string;
  form_of: string | null;
}

export type WiktionaryResponse = WiktionaryEntry[];

export interface SearchState {
  query: string;
  results: WiktionaryEntry[];
  loading: boolean;
  error: string | null;
}

export interface EtymologyGroup {
  etymologyNumber: number | null;
  entries: WiktionaryEntry[];
}