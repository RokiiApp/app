import type { Result } from '@/entities/result/Result'
import { memo, useEffect } from 'react'
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso'

import { send } from '@/common/ipc'
import { CHANNELS } from '@/common/constants/events'
import { useAutocomplete } from '@/main/hooks/useAutocomplete'
import { useSelectedResult } from '@/main/hooks/useSelectedResult'
import { useResultsAutoscroll } from '@/main/hooks/useResultsAutoscroll'
import { useTermFilter } from '@/main/hooks/useTermFilter'
import ResultItem from '../ResultItem'
import { GroupByFunction } from '@/main/utils/groupBy'

const ResultsList = ({ items, groupBy }: { items: Result[], groupBy: GroupByFunction }) => {
  // Filter items that don't match the term
  const results = useTermFilter(items)

  const {
    selectedResult,
    selectedIndex,
    MovementHandlers
  } = useSelectedResult(results)

  const { groupCounts, groups } = groupBy(results)

  const { listRef } = useResultsAutoscroll(selectedIndex, results.length)

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

  if (selectedResult) {
    requestAutocomplete(selectedResult.autocomplete)
  }

  if (groupCounts.length === 0) {
    return <Virtuoso
      ref={listRef}
      fixedItemHeight={48} // We specify h-12 in ResultItem
      className='h-full'
      overscan={5}
      tabIndex={-1}

      totalCount={results.length}
      itemContent={(index) => {
        const result = results[index]
        if (!result) return null

        return <ResultItem result={result} isSelected={selectedIndex === index} />
      }}
    />

  }

  return (
    <GroupedVirtuoso
      className='h-full'
      groupCounts={groupCounts}
      // We cant use h-full here because it will break the group headers
      // fixedItemHeight={48}
      tabIndex={-1}
      ref={listRef}
      overscan={5}

      groupContent={(index) => {
        if (groups[index] === '') return null
        return <div className='bg-transparent px-1 backdrop-blur-xl border-none mb-0 font-bold pb-2 rounded-t'>{groups[index]}</div>
      }}

      itemContent={(index) => {
        const result = results[index]
        if (!result) return null

        return <ResultItem result={result} isSelected={selectedIndex === index} />
      }}
    />
  )
}

const memoizedResultsList = memo(ResultsList)

export { memoizedResultsList as ResultsList }
