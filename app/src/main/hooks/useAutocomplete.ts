import { useAutocompleteStore } from '@/stores/AutocompleteStore'
import { getAutocompleteValue } from '../utils/getAutocompleteValue'
import { useInputStore } from '@/stores/InputStore'

/**
 * Hook to control the autocomplete feature.
 * When an autocomplete is requested, calculates the term
 * that matches the suggestion and updates the value.
 */
export const useAutocomplete = () => {
  const term = useInputStore(s => s.term)
  const value = useAutocompleteStore(s => s.value)
  const updateValue = useAutocompleteStore(s => s.updateValue)

  const requestAutocomplete = (autocompleteSuggestion: string) => {
    const result = getAutocompleteValue(autocompleteSuggestion, term)
    updateValue(result)
  }

  return { value, requestAutocomplete }
}
