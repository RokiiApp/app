import styles from './styles.module.css'

import { memo } from 'react'
import { Autocomplete } from './Autocomplete'
import { SearchBar } from './SearchBar'
import { useHashLocation } from 'wouter/use-hash-location'

const InputBox = () => {
  const [location, setLocation] = useHashLocation()

  const isRoot = location === '/'

  return (
    <div data-tauri-drag-region className={styles.inputWrapper}>
      {!isRoot && <input type='image' src='./back-icon.svg' className={styles.backButton} onClick={() => setLocation('/')} />}

      <div className={styles.inputArea}>
        <Autocomplete />
        <SearchBar />
      </div>

    </div>
  )
}

const memoizedInputBox = memo(InputBox)

export { memoizedInputBox as InputBox }
