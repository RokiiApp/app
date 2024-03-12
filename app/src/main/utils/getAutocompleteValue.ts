import escapeStringRegexp from 'escape-string-regexp'

/**
 * Calculates if the autocomplete suggestion matches the term and returns the value to be displayed
 * 
 * - If the term is "re" and the suggestion is "react", the value to be displayed is "react"
 * - If the term is "re" and the suggestion is "React", the value to be displayed is "react"
 * (we respect the case of the term to avoid overlapping the suggestion UI with the input component)
 * - If the term is "act" and the suggestion is "react", the value should not be displayed
 * as it does not match the term
 * 
 */
export const getAutocompleteValue = (
  autocompleteSuggestion: string,
  term: string
): string => {
  if (term === '') return ''

  const regexp = new RegExp(`^${escapeStringRegexp(term)}`, 'i')
  if (autocompleteSuggestion.match(regexp) != null) {
    return autocompleteSuggestion.replace(regexp, term)
  }

  return ''
}
