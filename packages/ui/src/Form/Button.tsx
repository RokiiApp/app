import styles from './styles.module.css'

interface ButtonProps {
  label?: string
  onClick: (target: EventTarget) => void
  description?: string
}

export const Button = ({ label, onClick, description }: ButtonProps) => (
  <button
    title={description}
    onClick={({ target }) => onClick(target)}
    className={styles.button}
  >{label}</button>
)
