import type { Result } from '@/entities/result/Result'
import { memo, useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { RESULT_HEIGHT, VISIBLE_RESULTS } from '@/common/constants/ui'
import Row from './Row'
import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useAutocomplete } from '@/main/hooks/useAutocomplete'
import { useSelectedResult } from '@/main/hooks/useSelectedResult'
import { useResultsAutoscroll } from '@/main/hooks/useResultsAutoscroll'
import { useTermFilter } from '@/main/hooks/useTermFilter'

const ResultsList = ({ items }: { items: Result[] }) => {
  // Filter items that don't match the term
  const results = useTermFilter(items)

  const {
    selectedResult,
    selectedIndex,
    MovementHandlers
  } = useSelectedResult(results)

  const { listRef } = useResultsAutoscroll(selectedIndex)

  const { requestAutocomplete } = useAutocomplete()

  const onKeyDown = (e: KeyboardEvent) => {
    // Autocomplete
    if (e.key === 'Tab') {
      if (selectedResult) {
        send(CHANNELS.ShowTerm, selectedResult.autocomplete)
      }
    }

    // Execute action
    if (e.key === 'Enter') {
      if (selectedResult) {
        selectedResult.onSelect(e)
      }
    }

    function isMovementKey(key: string): key is keyof typeof MovementHandlers {
      return key in MovementHandlers
    }

    // Movement
    if (isMovementKey(e.key)) {
      MovementHandlers[e.key]()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  if (results.length === 0) return null

  requestAutocomplete(selectedResult.autocomplete)

  return (
    <Virtuoso
      tabIndex={-1}
      ref={listRef}
      overscan={5}
      height={VISIBLE_RESULTS * RESULT_HEIGHT}
      fixedItemHeight={RESULT_HEIGHT}
      totalCount={results.length}
      itemContent={(index) => {
        const result = results[index]
        return <Row result={result} isSelected={selectedIndex === index} />
      }}
    />
  )
}

const memoizedResultsList = memo(ResultsList)

export { memoizedResultsList as ResultsList }
