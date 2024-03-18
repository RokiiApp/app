import { useEffect, useRef } from 'react'
import type { VirtuosoHandle } from 'react-virtuoso'

/**
 * This hook is used to scroll the list to the selected item
 * @param index The index to scroll to
 * @param total The total number of items in the list
 * @returns A ref that should be attached to the scrollable list
 */
export const useResultsAutoscroll = (index: number, total: number) => {
  const listRef = useRef<VirtuosoHandle>(null)

  useEffect(() => {
    if (listRef.current === null) return
    
    const isNavigationToTop = index === 0
    const isNavigationToBottom = index === total - 1

    /**
     * To avoid performance issues we avoid the smoot behavior when scrolling to top
     * or bottom (to avoid loading all the images of the list at once)
     */
    if (isNavigationToTop || isNavigationToBottom) {
      listRef.current.scrollToIndex({ index })
    }

    listRef.current.scrollToIndex({ index, align: 'center', behavior: 'smooth' })
    
  }, [index, total])

  return { listRef }
}
