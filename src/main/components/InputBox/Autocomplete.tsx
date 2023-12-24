import { getAutocompleteValue } from '@/main/utils/getAutocompleteValue';
import { useInputStore } from '@/state/inputStore';
import { useRokiStore } from '@/state/rokiStore';

import styles from './styles.module.css';

export const Autocomplete = () => {
  const term = useInputStore(s => s.term);
  const [results, selected] = useRokiStore((s) => [s.results, s.selected]);

  const autocompleteTerm = getAutocompleteValue(results[selected], term);

  return autocompleteTerm
    ? <input tabIndex={-1} disabled className={styles.autocomplete} value={autocompleteTerm} />
    : null;
};
