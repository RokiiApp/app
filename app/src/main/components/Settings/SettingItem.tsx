import { Setting } from "@rokii/api"
import { Checkbox } from "@/main/components/ui/checkbox"

type SettingItemProps = {
    setting: Omit<Setting, "defaultValue">
    value: any
    onChange: (value: any) => void
}

type InputComponentProps<T> = {
    id: string
    value: T
    onChange: (value: T) => void
}

function InputComponent<T>({ id, value, onChange }: InputComponentProps<T>) {
    if (typeof value === "string") {
        return <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value as T)} />
    }

    if (typeof value === "number") {
        return <input id={id} type="number" value={value} onChange={(e) => onChange(+e.target.value as T)} />
    }

    if (typeof value === "boolean") {
        return <Checkbox id={id} onCheckedChange={(checked) => onChange(checked as T)} checked={value as boolean} />
    }

    return null
}

export const SettingItem = ({ value, setting, onChange }: SettingItemProps) => {
    const { label, id, description } = setting

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


