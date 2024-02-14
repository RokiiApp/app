import { Router, Route } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import ResultsList from '@/main/components/ResultsList';
import { StatusBar } from '@/main/components/StatusBar';
import { InputBox } from '@/main/components/InputBox';
import styles from './styles.module.css';

/**
 * Main search container
 */
export const Rokii = () => {
  return (
    <div className={styles.rokiContainer}>
      <InputBox />

      <div data-tauri-drag-region className={styles.resultsContainer}>
        <Router hook={useHashLocation}>
          <Route path='/'>
            <ResultsList />
          </Route>
        </Router>
      </div>

      <StatusBar />
    </div>
  );
};
