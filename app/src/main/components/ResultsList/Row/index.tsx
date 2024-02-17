import defaultIcon from '@/extensions/core/icon.png';
import { SmartIcon } from '@rokii/ui';
import styles from './styles.module.css';
import type { Result } from '@/stores/actions/ActionResult';

type Props = {
  isSelected: boolean;
  result: Result;
};

function Row({
  isSelected,
  result
}: Props) {
  const { icon = defaultIcon, title, subtitle, extension } = result;

  const className = isSelected ? `${styles.row} ${styles.selected}` : styles.row;

  return (
    <div
      className={className}
      onClick={result.onSelect}
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
  );
}

export default Row;
