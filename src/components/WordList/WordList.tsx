import type { WiktionaryEntry } from '../../types/WiktionaryEntry';
import { EtymologyGroup } from '../EtymologyGroup';
import { groupByEtymology } from '../../utils/grouping';
import './WordList.css';

interface WordListProps {
  entries: WiktionaryEntry[];
  searchQuery?: string;
  deckName: string;
}

export function WordList({ entries, searchQuery, deckName }: WordListProps) {
  if (entries.length === 0) {
    return null;
  }

  const etymologyGroups = groupByEtymology(entries);
  const showEtymologyHeaders = etymologyGroups.length > 1 || 
    etymologyGroups.some(group => group.etymologyNumber !== null);

  return (
    <div className="word-list">
      {searchQuery && (
        <div className="word-list__header">
          <h1 className="word-list__title">
            Results for "{searchQuery}"
          </h1>
          <p className="word-list__count">
            {entries.length} {entries.length === 1 ? 'definition' : 'definitions'} found
          </p>
        </div>
      )}
      
      <div className="word-list__content">
        {etymologyGroups.map((group, index) => (
          <EtymologyGroup
            key={`${group.etymologyNumber}-${index}`}
            group={group}
            showEtymologyHeader={showEtymologyHeaders}
            deckName={deckName}
          />
        ))}
      </div>
    </div>
  );
}