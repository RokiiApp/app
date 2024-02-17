import escapeStringRegexp from 'escape-string-regexp'

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
