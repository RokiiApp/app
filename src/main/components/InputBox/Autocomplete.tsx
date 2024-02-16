import { useAutocomplete } from '@/main/hooks/useAutocomplete';
import styles from './styles.module.css';

export const Autocomplete = () => {
  const { value } = useAutocomplete()

  if (!value) return null;

  return <input tabIndex={-1} disabled className={styles.autocomplete} value={value} />
};
