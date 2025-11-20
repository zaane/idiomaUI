import { useState } from 'react';
import type { WiktionaryEntry } from '../../types/WiktionaryEntry';
import { formatPartOfSpeech, formatPronunciation } from '../../utils/formatters';
import { addFlashcard, syncAnki } from '../../services/ankiApi';
import './WordEntry.css';

interface WordEntryProps {
  entry: WiktionaryEntry;
  deckName: string;
}

export function WordEntry({ entry, deckName }: WordEntryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGloss, setEditedGloss] = useState(entry.gloss);

  const handleAddToAnki = async () => {
    setIsAdding(true);
    setMessage(null);

    try {
      const result = await addFlashcard(entry.word, entry.gloss, deckName);
      
      if (result.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        const targetDeck = deckName.trim() || 'wikideck';
        setMessage(`Added to ${targetDeck}!`);
        
        // Auto-sync after successful card addition
        try {
          await syncAnki();
        } catch {
          // Sync failure doesn't affect the main success message
        }
      }
    } catch {
      setMessage('Failed to connect to Anki');
    } finally {
      setIsAdding(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditedGloss(entry.gloss);
  };

  const handleEditSave = () => {
    // For now, just update the local state
    // In a real app, you'd save to backend here
    setIsEditing(false);
    entry.gloss = editedGloss; // Direct mutation for demo
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedGloss(entry.gloss);
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
        <div className="word-entry__gloss-container">
          {isEditing ? (
            <div className="word-entry__gloss-edit">
              <textarea
                className="word-entry__gloss-input"
                value={editedGloss}
                onChange={(e) => setEditedGloss(e.target.value)}
                autoFocus
              />
              <div className="word-entry__gloss-actions">
                <button
                  className="word-entry__gloss-save"
                  onClick={handleEditSave}
                >
                  ✓
                </button>
                <button
                  className="word-entry__gloss-cancel"
                  onClick={handleEditCancel}
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <p className="word-entry__gloss">
              {entry.gloss}
              <button
                className="word-entry__gloss-edit-btn"
                onClick={handleEditStart}
                title="Edit definition"
              >
                ✏️
              </button>
            </p>
          )}
        </div>
        
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