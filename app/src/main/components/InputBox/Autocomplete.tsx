import { useAutocomplete } from '@/main/hooks/useAutocomplete'

export const Autocomplete = () => {
  const { value } = useAutocomplete()

  if (!value) return null

  return <input
    tabIndex={-1} disabled value={value}
    className="absolute h-full bg-transparent border-none whitespace-pre text-[var(--secondary-font-color)]"
  />
}
