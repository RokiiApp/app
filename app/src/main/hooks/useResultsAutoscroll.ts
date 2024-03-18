import { useEffect, useRef } from 'react'
import type { VirtuosoHandle } from 'react-virtuoso'

export const useResultsAutoscroll = (index: number, total: number) => {
  const listRef = useRef<VirtuosoHandle>(null)

  useEffect(() => {
    if (listRef.current != null) {
      if (index === total - 1 || index === 0) {
        listRef.current.scrollToIndex({ index })
      }

      listRef.current.scrollToIndex({ index, align: 'center', behavior: 'smooth' })
    }
  }, [index, total])

  return { listRef }
}
