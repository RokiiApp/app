import { StoredSetting } from "@/stores/ExtensionSettingsStore"

export type InputComponentProps<T = any> = {
    setting: StoredSetting<T>
    onChange: (value: T) => void
}

export type InputComponent<T = any> = React.FC<InputComponentProps<T>>
