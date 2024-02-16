import { useAutocompleteStore } from "@/stores/autocomplete"
import { getAutocompleteValue } from "../utils/getAutocompleteValue"
import { useInputStore } from "@/stores/input"

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