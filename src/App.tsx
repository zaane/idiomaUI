import { useCallback, useState } from 'react';
import { useWiktionarySearch } from './hooks/useWiktionarySearch';
import { SearchBar } from './components/SearchBar';
import { DeckNameInput } from './components/DeckNameInput';
import { WordList } from './components/WordList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css'

function App() {
  const { query, results, loading, error, searchWord, clearResults } = useWiktionarySearch();
  const [deckName, setDeckName] = useState('');

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      searchWord(searchQuery);
    } else {
      clearResults();
    }
  }, [searchWord, clearResults]);

  const handleClearError = useCallback(() => {
    clearResults();
  }, [clearResults]);

  const handleDeckNameChange = useCallback((newDeckName: string) => {
    setDeckName(newDeckName);
  }, []);

  return (
    <div className="app">
      <div className="page_container">
      <header className="app__header">
        <h1 className="app__title">wiktionary</h1>
        <p className="app__subtitle">
            flash card generator
        </p>
      </header>

      <main className="app__main">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for a word (e.g., buono)..."
        />
        
        <DeckNameInput
          value={deckName}
          onChange={handleDeckNameChange}
        />

        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={handleClearError}
          />
        )}

        {!loading && !error && results.length > 0 && (
          <WordList entries={results} searchQuery={query} deckName={deckName} />
        )}
      </main>

      <footer className="app__footer">
        <p>buon apprendimento!</p>
      </footer>
      </div>
    </div>
  )
}

export default App
