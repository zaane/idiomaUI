import { useCallback } from 'react';
import { useWiktionarySearch } from './hooks/useWiktionarySearch';
import { SearchBar } from './components/SearchBar';
import { WordList } from './components/WordList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css'

function App() {
  const { query, results, loading, error, searchWord, clearResults } = useWiktionarySearch();

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

  return (
    <div className="app">
      <div className="page_container">
      <header className="app__header">
        <h1 className="app__title">Wiktionary Search</h1>
        <p className="app__subtitle">
          Discover word definitions, pronunciations, and more
        </p>
      </header>

      <main className="app__main">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for a word (e.g., buono)..."
        />

        {loading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={handleClearError}
          />
        )}

        {!loading && !error && results.length > 0 && (
          <WordList entries={results} searchQuery={query} />
        )}
      </main>

      <footer className="app__footer">
        <p>Powered by Wiktionary API</p>
      </footer>
      </div>
    </div>
  )
}

export default App
