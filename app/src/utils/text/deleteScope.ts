/**
 * Delete the scope from a package name
 *
 * Example:
 * 
 * ```typescript
 * deleteScope('@example/plugin') // 'plugin'
 * ```
 */
export const deleteScope = (text: string) => {
  return text.replace(/^@.+?\//, '')
}
