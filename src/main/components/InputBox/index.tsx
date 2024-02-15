import styles from './styles.module.css';

import { memo, useEffect } from 'react';
import { Autocomplete } from './Autocomplete';
import { SearchBar } from './SearchBar';
import { useHashLocation } from 'wouter/use-hash-location';
import { CHANNELS } from '@/common/constants/events';
import { useInputStore } from '@/stores/inputStore';
import { send } from '@/common/ipc';

const InputBox = () => {
  const [location, setLocation] = useHashLocation();
  const updateTerm = useInputStore(s => s.updateTerm);

  useEffect(() => {
    send(CHANNELS.FocusInput)
    updateTerm('');
  }, [location]);

  const isRoot = location === '/';

  return (
    <div data-tauri-drag-region className={styles.inputWrapper}>
      {!isRoot && <input type='image' src='./back-icon.svg' className={styles.backButton} onClick={() => setLocation('/')} />}

      <div className={styles.inputArea}>
        <Autocomplete />
        <SearchBar />
      </div>

    </div>
  );
}

const memoizedInputBox = memo(InputBox);

export { memoizedInputBox as InputBox };
