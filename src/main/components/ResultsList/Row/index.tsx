import { SmartIcon } from '@rokii/ui';
import styles from './styles.module.css';

type Props = {
  isSelected: boolean;
  icon?: string;
  title?: string;
  onSelect: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  subtitle?: string;
  index: number;
};

function Row({
  isSelected,
  icon,
  title,
  onSelect,
  subtitle,
}: Props) {
  const className = isSelected ? `${styles.row} ${styles.selected}` : styles.row;

  return (
    <div
      className={className}
      onClick={onSelect}
      onKeyDown={() => undefined}
    >
      {icon && <SmartIcon path={icon} className={styles.icon} />}

      <div className={styles.details}>
        {title && <div className={styles.title}>{title}</div>}

        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
}

export default Row;
