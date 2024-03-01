import { getHotkey } from "@/main/utils/getHotkey"
import { InputComponent } from "./InputComponent"
import { TitleLayout } from "./TitleLayout"

const Hotkey: InputComponent<string> = ({ setting, onChange }) => {
  const { id, value, description, label } = setting

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newHotkey = getHotkey(event)
    if (!newHotkey) return
    onChange(newHotkey)
  }

  return (
    <TitleLayout id={id} title={label} description={description}>
      <input
        type="text"
        readOnly id={id} value={value} onKeyDown={onKeyDown}
        className={`
          w-full text-base leading-8 px-2
          rounded border border-[var(--border-color)]
        `}
      />
    </TitleLayout>
  )
}

export default Hotkey
