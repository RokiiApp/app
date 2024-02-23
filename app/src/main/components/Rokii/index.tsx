import { Router, Route } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import { StatusBar } from '@/main/components/StatusBar'
import { InputBox } from '@/main/components/InputBox'
import { Home } from '@/main/routes/home'
import { App } from '@/main/routes/app'
import styles from './styles.module.css'
import { useInputStore } from '@/stores/input'
import { memo } from 'react'
import { useExtensionsRepository } from '@/main/hooks/useExtensionsRepository'

/**
 * Main search container
 */
const Rokii = () => {
  useExtensionsRepository()

  const term = useInputStore((state) => state.term)
  return (
    <div className={styles.rokiContainer}>
      <InputBox />

      <div data-tauri-drag-region className={styles.resultsContainer}>
        <Router hook={useHashLocation}>
          <Route path='/'>
            <Home input={term} />
          </Route>
          <Route path='/app/:extension/:app'>
            <App input={term} />
          </Route>
        </Router>
      </div>

      <StatusBar />
    </div>
  )
}

const memoizedRokii = memo(Rokii)

export { memoizedRokii as Rokii }
