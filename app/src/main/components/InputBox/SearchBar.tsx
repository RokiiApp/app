import { memo, useEffect, useRef } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'

import { useSearchBarEventsSubscription } from '@/main/hooks/useSearchBarEventsSubscription'
import { useInputStore } from '@/stores/InputStore'
import { CHANNELS } from '@/common/constants/events'
import { useFocusSuscription } from '@/main/hooks/useFocusSuscription'
import { getParam } from '@/main/utils/getParam'

const SearchBar = () => {
  const [location] = useHashLocation()
  const [term, updateTerm] = useInputStore(s => [s.term, s.updateTerm])
  const mainInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    mainInput.current?.focus()
    const keepTerm = getParam("keepterm")
    if (keepTerm !== "true") {
      updateTerm('')
    }
  }, [location])

  useSearchBarEventsSubscription(mainInput)
  useFocusSuscription(mainInput, CHANNELS.FocusInput)

  return (
    <input
      spellCheck={false}
      autoFocus
      placeholder='Search in Rokii...'
      ref={mainInput}
      value={term}
      className="absolute z-50 w-full h-full bg-transparent border-none outline-none text-input placeholder:text-input-autocomplete"
      onChange={(e) => updateTerm(e.target.value)}
    />
  )
}

const memoizedSearchBar = memo(SearchBar)

export { memoizedSearchBar as SearchBar }
