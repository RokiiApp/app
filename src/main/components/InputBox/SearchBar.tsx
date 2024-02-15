import styles from './styles.module.css';
import { useRef } from 'react';

import { useSearchBarEventsSubscription } from '@/main/hooks/useSearchBarEventsSubscription';
import { useInputStore } from '@/stores/inputStore';
import { CHANNELS } from '@/common/constants/events';
import { useFocusSuscription } from '@/main/hooks/useFocusSuscription';

export const SearchBar = () => {
  const [term, updateTerm] = useInputStore(s => [s.term, s.updateTerm]);

  const mainInput = useRef<HTMLInputElement>(null);
  useSearchBarEventsSubscription(mainInput);
  useFocusSuscription(mainInput, CHANNELS.FocusInput);


  return (
    <input
      spellCheck={false}
      autoFocus
      placeholder='Search in Rokii...'
      ref={mainInput}
      value={term}
      className={styles.input}
      onChange={(e) => updateTerm(e.target.value)}
    />
  );
};
