import type { PluginResult } from '@rokii/types';
import escapeStringRegexp from 'escape-string-regexp';

export const getAutocompleteValue = (
  selectedResult: PluginResult,
  term: string
): string => {
  if (term === '') return '';
  if (selectedResult && selectedResult.term) {
    const regexp = new RegExp(`^${escapeStringRegexp(term)}`, 'i');
    if (selectedResult.term.match(regexp)) {
      return selectedResult.term.replace(regexp, term);
    }
  }
  return '';
};
