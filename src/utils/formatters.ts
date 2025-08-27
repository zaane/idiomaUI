export function formatPartOfSpeech(pos: string): string {
  const posMap: Record<string, string> = {
    'adj': 'Adjective',
    'n': 'Noun',
    'v': 'Verb',
    'adv': 'Adverb',
    'prep': 'Preposition',
    'conj': 'Conjunction',
    'interj': 'Interjection',
    'pron': 'Pronoun',
    'det': 'Determiner',
    'num': 'Numeral',
  };

  return posMap[pos.toLowerCase()] || pos.charAt(0).toUpperCase() + pos.slice(1);
}

export function formatPronunciation(pronunciation: string): string {
  return pronunciation.startsWith('/') && pronunciation.endsWith('/') 
    ? pronunciation 
    : `/${pronunciation}/`;
}