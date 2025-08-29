import { useCallback, useState } from 'react';
import { useWiktionarySearch } from './hooks/useWiktionarySearch';
import { SearchBar } from './components/SearchBar';
import { WordList } from './components/WordList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { syncAnki } from './services/ankiApi';
import './App.css'

function App() {
  const { query, results, loading, error, searchWord, clearResults } = useWiktionarySearch();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

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

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    setSyncMessage(null);

    try {
      const result = await syncAnki();
      
      if (result.error) {
        setSyncMessage(`Sync Error: ${result.error}`);
      } else {
        setSyncMessage('Sync Complete!');
      }
    } catch {
      setSyncMessage('Failed to sync with Anki');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 3000);
    }
  }, []);

  return (
    <div className="app">
      <div className="page_container">
      <header className="app__header">
        <h1 className="app__title">wiktionary for free</h1>
        <p className="app__subtitle">
            (even though it's already free)
        </p>
        
        <button
          className="app__sync-button"
          onClick={handleSync}
          disabled={isSyncing}
          title="Sync Anki"
        >
          {isSyncing ? '...' : '🔄'}
        </button>
        
        {syncMessage && (
          <div className={`app__sync-message ${syncMessage.includes('Error') ? 'app__sync-message--error' : 'app__sync-message--success'}`}>
            {syncMessage}
          </div>
        )}
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
        <p>thank you wiktionary</p>
      </footer>
      </div>
    </div>
  )
}

export default App
