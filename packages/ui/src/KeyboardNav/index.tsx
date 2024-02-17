import React, { useRef } from 'react'
import { focusableSelector } from '../focusableSelector'

/**
 * Focus element with index from elements array.
 *   If `index` >= `elements.length` then first element is selected;
 *   If `index` <= 0 then last element is selected.
 */
const moveSelectionTo = (elements: NodeListOf<any>, index: number) => {
  let nextIndex = index
  if (index < 0) {
    nextIndex = elements.length - 1
  } else if (index >= elements.length) {
    nextIndex = 0
  }
  elements[nextIndex]?.focus()
}

const vimKeyCodes: Record<string, string> = {
  h: 'KeyH',
  j: 'KeyJ',
  k: 'KeyK',
  l: 'KeyL'
}

const isVimMode = (event: React.KeyboardEvent<HTMLDivElement>) => (key: string) => (
  vimKeyCodes[key] === event.code && (event.metaKey || event.ctrlKey)
)

/**
 * Handler keydown in keyboard navigation component
 *
 * @param  {DOMElement} wrapper
 * @param  {KeyboardEvent} event
 */
const onKeyDown = (wrapper: React.RefObject<HTMLDivElement>, event: React.KeyboardEvent<HTMLDivElement>) => {
  const { target, code } = event

  const isVimKey = isVimMode(event)

  if (code === 'ArrowLeft' || isVimKey('h')) {
    // Move control back to main list when ← is clicked or cmd/ctrl+h
    const mainInput = document.querySelector<HTMLInputElement>('#main-input')!
    const position = mainInput.value.length
    mainInput.focus()
    mainInput.setSelectionRange(position, position)
    event.preventDefault()
    event.stopPropagation()
    return false
  }

  if (code !== 'ArrowDown' && code !== 'ArrowUp' && !isVimKey('j') && !isVimKey('k')) {
    return false
  }

  // Get all focusable element in element
  const focusable = wrapper.current?.querySelectorAll(focusableSelector)

  if ((focusable == null) || focusable.length === 0) return

  // Get index of currently focused element
  const index = Array.prototype.findIndex.call(focusable, (el) => el === target)

  if (code === 'ArrowDown' || isVimKey('j')) {
    // Select next focusable element when arrow down clicked
    moveSelectionTo(focusable, index + 1)
    event.stopPropagation()
  } else if (code === 'ArrowUp' || isVimKey('k')) {
    // Select previous focusable element when arrow down clicked
    moveSelectionTo(focusable, index - 1)
    event.stopPropagation()
  }
}

export const KeyboardNav = ({ children }: { children: React.ReactElement | null }) => {
  const wrapper = useRef<HTMLDivElement>(null)

  const onKeyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    onKeyDown(wrapper, event)
  }

  return (
    <div onKeyDown={onKeyDownHandler} ref={wrapper}>
      {children}
    </div>
  )
}
