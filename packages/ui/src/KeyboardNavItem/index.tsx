import type { FC } from 'react'
import styles from './styles.module.css'

interface KeyboardNavItemProps {
  children?: React.ReactElement | null
  className?: string
  /**
   * HTML Tag name to use for the item. Defaults to 'div'.
   */
  tagName?: string
  onSelect?: (event: React.SyntheticEvent) => unknown
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export const KeyboardNavItem: FC<KeyboardNavItemProps> = ({ tagName, ...props }) => {
  const className = props.className ? `${styles.item} ${props.className}` : styles.item

  const onSelect = props.onSelect ?? (() => undefined)
  const onClick = onSelect

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (props.onKeyDown != null) {
      props.onKeyDown(event)
    }

    const vimO = event.code === 'KeyO' && (event.metaKey || event.ctrlKey)

    if (!event.defaultPrevented && (event.key === 'Enter' || vimO)) {
      onSelect(event)
    }
  }

  const itemProps = {
    className,
    onClick,
    onKeyDown,
    tabIndex: 0
  }
  const TagName = (tagName ?? 'div') as keyof JSX.IntrinsicElements

  return <TagName onSelect={e => e} {...props} {...itemProps} />
}
