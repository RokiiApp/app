/**
 * Check if cursor in the end of input.
 * This is needed to prevent autocomplete when user is typing in the middle of input
 */
export const isCursorInEndOfInput = (input: HTMLInputElement) => {
  const { selectionStart, selectionEnd, value } = input
  return selectionStart === selectionEnd && selectionStart === value.length
}
