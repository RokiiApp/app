import { Wrapper } from './Wrapper'
import styles from './styles.module.css'

interface InputProps {
  label?: string
  value?: string | number
  onChange: (value: string) => void
  description?: string
  type: string
}

export const Text = ({ label, value, onChange, description, type }: InputProps) => (
  <Wrapper label={label} description={description}>
    <input
      type={type}
      value={value ?? ''}
      className={styles.input}
      onChange={({ target }) => onChange(target.value)}
    />
  </Wrapper>
)
