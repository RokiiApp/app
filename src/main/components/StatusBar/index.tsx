import { CHANNELS, StatusBarState } from '@/common/constants/events';
import { memo, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { on } from '@/common/ipc';

function StatusBar() {
  const [statusBarText, setStatusBarText] = useState('');
  const [icon, setIcon] = useState<StatusBarState['icon']>(null);
  const [timeoutValue, setTimeoutValue] = useState<StatusBarState['timeout']>(null);

  useEffect(() => {
    const unlistenPromise = on(CHANNELS.StatusBarUpdate, (event) => {
      const { payload } = event
      setStatusBarText(payload.statusBarText);
      setIcon(payload.icon);
      setTimeoutValue(payload.timeout);
    });

    return () => {
      unlistenPromise.then(unlisten => unlisten())
    };
  }, []);

  useEffect(() => {
    if (timeoutValue) {
      setTimeout(() => {
        setStatusBarText('');
        setIcon(null);
        setTimeoutValue(null);
      }, timeoutValue);
    }
  }, [timeoutValue]);

  if (!statusBarText) return null;
  return <div className={styles.statusBar}>{icon}{statusBarText}</div>;
}

const memoizedStatusBar = memo(StatusBar);

export { memoizedStatusBar as StatusBar };
