import { memoize } from '../memoize'

const notSearchableCharsRegexp = /[^а-яa-z0-9\s]/i
const camelCaseRegexp = /([а-яa-z])([A-ZА-Я])/g
const wordsWithNumbersRegexp = /([^0-9])([0-9])/g
const escapeRegexp = /[|\\{}()[\]^$+*?.]/g

const lowerCase = (str: string) => (
  str
    .replace(notSearchableCharsRegexp, '')
    .replace(camelCaseRegexp, (_, y, z) => [y, z].join(' ').toLowerCase())
    .replace(wordsWithNumbersRegexp, (_, y, z) => [y, z].join(' ').toLowerCase())
    .toLowerCase()
)

const escapeStringRegexp = (str: string) => str.replace(escapeRegexp, '\\$&')

/**
 * Convert string to searchable lower-case string prepared for regexp search of search term
 *
 * @param  {String} string
 * @return {String}
 */
const toSearchString = memoize((string: string) => [
  string.toLowerCase(),
  lowerCase(string)
].join(' '))

/**
 * Get regexp for search term
 *
 * @param  {String} term
 * @return {Regexp}
 */
const toSearchRegexp = memoize((term: string) => new RegExp(`(^|[^a-zA-Zа-яА-Я0-9])${escapeStringRegexp(term.toLowerCase())}`))

/**
 * Search term in array
 * @param items Array of items
 * @param term Search term
 * @param toString Function that converts item from array to string
 */
export const search = <T>(items: T[], term: string | null, toString: (item: T) => string = (item: T) => `${item}`) => {
  const searchTerm = term ? term.trim() : ''

  const searchRegexp = toSearchRegexp(searchTerm)
  return items.filter(item =>
    toSearchString(toString(item)).match(searchRegexp)
  )
}
