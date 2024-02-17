import { KeyboardNavItem } from '@rokii/ui'

interface ActionButtonProps {
  onSelect?: (event: React.SyntheticEvent<Element, Event>) => void
  text: string
}

export const ActionButton = ({ onSelect, text }: ActionButtonProps) => {
  // @ts-expect-error
  return <KeyboardNavItem onSelect={onSelect}>{text}</KeyboardNavItem>
}
