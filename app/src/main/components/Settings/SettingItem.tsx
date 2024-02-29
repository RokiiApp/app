import { Checkbox } from "@/main/components/ui/checkbox"
import { StoredSetting } from "@/stores/settings"

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
        return <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    }

    if (typeof value === "number") {
        return <input id={id} type="number" value={value} onChange={(e) => onChange(+e.target.value)} />
    }

    if (typeof value === "boolean") {
        return <Checkbox id={id} onCheckedChange={onChange} checked={value} />
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


