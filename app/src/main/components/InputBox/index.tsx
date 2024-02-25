import styles from './styles.module.css'

import { memo } from 'react'
import { Autocomplete } from './Autocomplete'
import { SearchBar } from './SearchBar'
import { useHashLocation } from 'wouter/use-hash-location'
import { BackButton } from '../BackButton'

const InputBox = () => {
  const [location] = useHashLocation()

  const isRoot = location === '/'

  return (
    <div data-tauri-drag-region className={styles.inputWrapper}>
      {!isRoot && <BackButton backLocation='/' />}

      <div className={styles.inputArea}>
        <Autocomplete />
        <SearchBar />
      </div>

    </div>
  )
}

const memoizedInputBox = memo(InputBox)

export { memoizedInputBox as InputBox }
