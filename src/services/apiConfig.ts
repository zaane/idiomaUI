export const API_CONFIG = {
  BASE_URL: '/api', // Use proxy in development, direct URL in production
  ENDPOINTS: {
    WORD_LOOKUP: (language: string, word: string) => `/${language}/${word}/`,
  },
} as const;

export const DEFAULT_LANGUAGE = 'it'; // Default to Italian as per your example
