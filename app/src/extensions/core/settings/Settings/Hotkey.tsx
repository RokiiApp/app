import styles from './styles.module.css';

const isASCII = (str: string) => /^[\p{ASCII}]+$/u.test(str);

const getHotkey = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!event.ctrlKey && !event.altKey && !event.metaKey) {
    // Do not allow to set global shorcut without modifier keys
    // At least one of alt, cmd or ctrl is required
    return;
  }

  const key = event.key;

  // Ignore modifier keys
  const INVALID_KEYS = ['Control', 'Alt', 'Shift', '+'];
  if (INVALID_KEYS.includes(key)) return;
  if (!key || !isASCII(key)) return;

  event.preventDefault();
  event.stopPropagation();

  const keys = [];

  if (event.ctrlKey) keys.push('Control');
  if (event.altKey) keys.push('Alt');
  if (event.shiftKey) keys.push('Shift');
  if (event.metaKey) keys.push('Command');

  keys.push(key === ' ' ? 'Space' : key);

  return [...new Set(keys)].join('+');
};

type HotkeyProps = {
  hotkey: string;
  onChange: (newHotkey: string) => void;
};

function Hotkey ({ hotkey, onChange }: HotkeyProps) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newHotkey = getHotkey(event);
    if (!newHotkey) return;
    onChange(newHotkey);
  };

  return <input readOnly className={styles.input} value={hotkey} onKeyDown={onKeyDown} />;
}

export default Hotkey;
