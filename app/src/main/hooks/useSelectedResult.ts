import { Result } from '@/stores/actions/ActionResult'
import { useEffect, useState } from 'react'

export const useSelectedResult = (items: Result[]) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setSelected(0)
  }, [items])

  const MovementHandlers = {
    ArrowDown: () => {
      const futureSelected = selected + 1
      if (futureSelected < items.length) {
        setSelected(futureSelected)
      } else {
        // If we are at the end of the list, go to the top
        // When items change sometimes the selected index is out of bounds
        setSelected(0)
      }
    },
    ArrowUp: () => {
      const futureSelected = selected - 1
      if (futureSelected >= 0) {
        setSelected(futureSelected)
      } else {
        setSelected(items.length - 1)
      }
    }
  }

  return {
    MovementHandlers,
    selectedIndex: selected,
    setSelected,
    selectedResult: items[selected]
  }
}
