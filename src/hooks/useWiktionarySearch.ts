import { useState, useEffect, useCallback } from 'react';
import type { WiktionaryEntry } from '../types/WiktionaryEntry';
import { fetchWordDefinitions, WiktionaryApiError } from '../services/wiktionaryApi';
import { isValidSearchQuery, sanitizeSearchQuery } from '../utils/validation';
import { DEFAULT_LANGUAGE } from '../services/apiConfig';

interface UseWiktionarySearchResult {
  query: string;
  results: WiktionaryEntry[];
  loading: boolean;
  error: string | null;
  searchWord: (word: string, language?: string) => void;
  clearResults: () => void;
}

export function useWiktionarySearch(debounceMs: number = 300): UseWiktionarySearchResult {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WiktionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWord = useCallback((word: string, language: string = DEFAULT_LANGUAGE) => {
    const sanitizedWord = sanitizeSearchQuery(word);
    setQuery(sanitizedWord);
  }, []);

  const clearResults = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setLoading(false);
  }, []);

  // Debounced search effect - removed searchWord from dependencies
  useEffect(() => {
    if (!query) {
      setResults([]);
      setError(null);
      return;
    }

    const performSearch = async () => {
      if (!isValidSearchQuery(query)) {
        setResults([]);
        setError(query.length === 0 ? null : 'Search query is too long');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchWordDefinitions(query, DEFAULT_LANGUAGE);
        setResults(data);
        
        if (data.length === 0) {
          setError('No definitions found for this word');
        }
      } catch (err) {
        if (err instanceof WiktionaryApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performSearch, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]); // Only depend on query and debounceMs

  return {
    query,
    results,
    loading,
    error,
    searchWord,
    clearResults,
  };
}