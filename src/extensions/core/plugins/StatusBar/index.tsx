import styles from './styles.module.css';

function StatusBar ({ value }: { value: string }) {
  return <div className={styles.statusBar}>{value}</div>;
}

export default StatusBar;
