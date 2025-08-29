import { useState } from 'react';
import type { WiktionaryEntry } from '../../types/WiktionaryEntry';
import { formatPartOfSpeech, formatPronunciation } from '../../utils/formatters';
import { addFlashcard } from '../../services/ankiApi';
import './WordEntry.css';

interface WordEntryProps {
  entry: WiktionaryEntry;
}

export function WordEntry({ entry }: WordEntryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToAnki = async () => {
    setIsAdding(true);
    setMessage(null);

    try {
      const result = await addFlashcard(entry.word, entry.gloss);
      
      if (result.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage('Added to Anki!');
      }
    } catch {
      setMessage('Failed to connect to Anki');
    } finally {
      setIsAdding(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="word-entry">
      <div className="word-entry__header">
        <h3 className="word-entry__word">{entry.word}</h3>
        <div className="word-entry__meta">
          <span className="word-entry__pos">
            {formatPartOfSpeech(entry.pos)}
          </span>
          {entry.pronunciation && (
            <span className="word-entry__pronunciation">
              {formatPronunciation(entry.pronunciation)}
            </span>
          )}
        </div>
      </div>
      
      <div className="word-entry__content">
        <p className="word-entry__gloss">{entry.gloss}</p>
        
        {entry.form_of && (
          <div className="word-entry__form-info">
            <span className="word-entry__form-label">Form of:</span>
            <span className="word-entry__form-value">{entry.form_of}</span>
          </div>
        )}

        {message && (
          <div className={`word-entry__message ${message.startsWith('Error') ? 'word-entry__message--error' : 'word-entry__message--success'}`}>
            {message}
          </div>
        )}
      </div>
      
      <button
        className="word-entry__anki-button"
        onClick={handleAddToAnki}
        disabled={isAdding}
        title="Add to Anki"
      >
        {isAdding ? '...' : '+'}
      </button>
    </div>
  );
}