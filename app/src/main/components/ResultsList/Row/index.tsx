import { SmartIcon } from '@rokii/ui'
import type { Result } from '@/entities/result/Result'
import styles from './styles.module.css'

interface Props {
  isSelected: boolean
  result: Result
}

function Row({ isSelected, result }: Props) {
  const { icon, title, subtitle, extension } = result

  const className = isSelected ? `${styles.row} ${styles.selected}` : styles.row

  return (
    <div
      className={className}
      onClick={(e) => result.onSelect(e)}
    >

      <div className={styles.actionInfo}>
        {icon && <SmartIcon path={icon} className={styles.icon} />}
        {title && <div className={styles.title}>{title}</div>}

        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      <div aria-label='extension-name' className={styles.extensionName}>
        {extension}
      </div>
    </div>
  )
}

export default Row
