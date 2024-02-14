import { Router, Route } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import ResultsList from '@/main/components/ResultsList';
import { StatusBar } from '@/main/components/StatusBar';
import { InputBox } from '@/main/components/InputBox';
import styles from './styles.module.css';
import { useInputStore } from '@/state/inputStore';

/**
 * Main search container
 */
export const Rokii = () => {
  const [term, updateTerm] = useInputStore((state) => [state.term, state.updateTerm]);
  return (
    <div className={styles.rokiContainer}>
      <InputBox />

      <div data-tauri-drag-region className={styles.resultsContainer}>
        <Router hook={useHashLocation}>
          <Route path='/'>
            <ResultsList input={term} setInput={updateTerm} />
          </Route>
        </Router>
      </div>

      <StatusBar />
    </div>
  );
};
