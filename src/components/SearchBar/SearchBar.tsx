import { useState, useRef } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  initialValue?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Enter a word to search...", 
  disabled = false,
  initialValue = ""
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-bar__input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="search-bar__input"
          autoComplete="off"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="search-bar__clear"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="search-bar__submit"
          disabled={disabled}
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </form>
  );
}