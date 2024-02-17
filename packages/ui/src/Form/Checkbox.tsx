import { useState } from 'react'
import styles from './styles.module.css'

interface CheckboxProps {
  label?: string
  value?: boolean
  onChange: (value: boolean) => void
  description?: string
}

export const Checkbox = ({ label, value = false, onChange, description }: CheckboxProps) => {
  const [activated, setActivated] = useState(value)

  const changeValue = (value: boolean) => {
    setActivated(value)
    onChange(value)
  }

  return <div className={styles.item}>
      <label>
        <input
          type="checkbox"
          checked={activated}
          onChange={({ target }) => changeValue(target.checked)}
          onKeyDown={e => e.key === 'Enter' && changeValue(!activated)}
          className={styles.checkbox}
        />
        {label}
      </label>
      <div className={styles.itemNotice}>{description}</div>
    </div>
}
