import { useState } from 'react';
import './DeckNameInput.css';

interface DeckNameInputProps {
  value: string;
  onChange: (deckName: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DeckNameInput({ 
  value, 
  onChange, 
  placeholder = "Deck name (default: wikideck)",
  disabled = false
}: DeckNameInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="deck-name-input">
      <label htmlFor="deck-name" className="deck-name-input__label">
        Anki Deck:
      </label>
      <div className="deck-name-input__container">
        <input
          id="deck-name"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="deck-name-input__field"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="deck-name-input__clear"
            aria-label="Clear deck name"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}