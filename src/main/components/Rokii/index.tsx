import { Router, Route } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { StatusBar } from '@/main/components/StatusBar';
import { InputBox } from '@/main/components/InputBox';
import { Home } from '@/main/routes/home';
import styles from './styles.module.css';
import { useInputStore } from '@/stores/inputStore';

/**
 * Main search container
 */
export const Rokii = () => {
  const term = useInputStore((state) => state.term);
  return (
    <div className={styles.rokiContainer}>
      <InputBox />

      <div data-tauri-drag-region className={styles.resultsContainer}>
        <Router hook={useHashLocation}>
          <Route path='/'>
            <Home input={term} />
          </Route>
        </Router>
      </div>

      <StatusBar />
    </div>
  );
};
