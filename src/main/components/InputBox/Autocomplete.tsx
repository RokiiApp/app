import styles from './styles.module.css';
import { useAutocomplete } from '@/main/hooks/useAutocomplete';

export const Autocomplete = () => {
  const { value } = useAutocomplete();

  if (!value) return null;

  return <input tabIndex={-1} disabled className={styles.autocomplete} value={value} />
};
