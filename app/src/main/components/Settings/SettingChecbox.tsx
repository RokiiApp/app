import { Checkbox } from "@/main/components/ui/checkbox"

type SettingCheckboxProps = {
    label: string,
    value: boolean,
    description?: string,
    onChange: (value: boolean) => void
}

export const SettingCheckbox = ({ description, label, value, onChange }: SettingCheckboxProps) => {
    return <div className="items-top flex space-x-2">
        <Checkbox id={label} onCheckedChange={onChange} checked={value} />
        <div className="grid gap-1.5 leading-none">
            <label
                htmlFor={label}
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
}
