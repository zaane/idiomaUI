import type { EtymologyGroup as EtymologyGroupType } from '../../types/WiktionaryEntry';
import { WordEntry } from '../WordEntry';
import './EtymologyGroup.css';

interface EtymologyGroupProps {
  group: EtymologyGroupType;
  showEtymologyHeader?: boolean;
}

export function EtymologyGroup({ 
  group, 
  showEtymologyHeader = true 
}: EtymologyGroupProps) {
  const hasMultipleGroups = showEtymologyHeader && group.etymologyNumber !== null;

  return (
    <div className="etymology-group">
      {hasMultipleGroups && (
        <div className="etymology-group__header">
          <h2 className="etymology-group__title">
            Etymology {group.etymologyNumber}
          </h2>
        </div>
      )}
      
      <div className="etymology-group__entries">
        {group.entries.map((entry) => (
          <WordEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}