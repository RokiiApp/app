import { StoredSetting } from "@/stores/settings"
import StringInput from "./input-components/StringInput"
import NumberInput from "./input-components/NumberInput"
import BooleanInput from "./input-components/BooleanInput"

type SettingItemProps<T = any> = {
    setting: StoredSetting<T>
    onChange: (value: T) => void
}

type InputComponentProps<T = any> = {
    id: string
    value: T
    onChange: (value: T) => void
}

function InputComponent({ id, value, onChange }: InputComponentProps) {
    if (typeof value === "string") {
        return <StringInput id={id} value={value} onChange={onChange} />
    }

    if (typeof value === "number") {
        return <NumberInput id={id} value={value} onChange={onChange} />
    }

    if (typeof value === "boolean") {
        return <BooleanInput id={id} value={value} onChange={onChange} />
    }

    return null
}

export const SettingItem = ({ setting, onChange }: SettingItemProps) => {
    const { label, id, description, value } = setting

    return (
        <div className="items-top flex space-x-2">
            <InputComponent id={id} onChange={onChange} value={value} />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {
                    description &&
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                }
            </div>
        </div>
    )

}


