import { getHotkey } from "@/main/utils/getHotkey"
import { InputComponent } from "./InputComponent"

const Hotkey: InputComponent<string> = ({ value, id, onChange }) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newHotkey = getHotkey(event)
    if (!newHotkey) return
    onChange(newHotkey)
  }

  return <input
    className="text-base leading-8 px-2 w-full rounded border border-[var(--border-color)]"
    readOnly id={id} value={value} onKeyDown={onKeyDown} />
}

export default Hotkey
