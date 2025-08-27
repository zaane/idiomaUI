import type { WiktionaryResponse } from '../types/WiktionaryEntry';
import { API_CONFIG, DEFAULT_LANGUAGE } from './apiConfig';

export class WiktionaryApiError extends Error {
  public status?: number;
  public statusText?: string;
  
  constructor(
    message: string,
    status?: number,
    statusText?: string
  ) {
    super(message);
    this.name = 'WiktionaryApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export async function fetchWordDefinitions(
  word: string,
  language: string = DEFAULT_LANGUAGE
): Promise<WiktionaryResponse> {
  if (!word.trim()) {
    throw new WiktionaryApiError('Word cannot be empty');
  }

  const encodedWord = encodeURIComponent(word.trim().toLowerCase());
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WORD_LOOKUP(language, encodedWord)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new WiktionaryApiError(
        `Failed to fetch word definitions: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new WiktionaryApiError('Invalid response format: expected array');
    }

    return data;
  } catch (error) {
    if (error instanceof WiktionaryApiError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new WiktionaryApiError('Network error: Unable to connect to the API');
    }

    throw new WiktionaryApiError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}