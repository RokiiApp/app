import type { StoredSetting } from "@/stores/extension-settings"
import type { InputComponent } from "./input-components/InputComponent"
import { InputComponentFabric } from "./input-components/InputComponentFabric"

type SettingItemProps<T = any> = {
    setting: StoredSetting<T>
    onChange: (value: T) => void
    CustomComponent?: InputComponent<T>
}

export const SettingItem = ({ setting, onChange, CustomComponent }: SettingItemProps) => {
    const { label, id, description, value, options } = setting

    return (
        <div className="items-top flex space-x-2">
            {
                CustomComponent
                    ? <CustomComponent id={id} value={value} onChange={onChange} />
                    : <InputComponentFabric id={id} value={value} onChange={onChange} options={options} />
            }
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


