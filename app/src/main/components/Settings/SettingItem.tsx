import { Setting, SettingType } from "@rokii/api"

type SettingItemProps = {
    setting: Setting
    CustomComponent?: (...args: any) => JSX.Element
}

const InputComponent = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
}

const Components: Record<SettingType, (...args: any) => JSX.Element> = {
    string: InputComponent,
    number: InputComponent,
    boolean: InputComponent
}

export const SettingItem = ({ setting, CustomComponent }: SettingItemProps) => {
    const { type } = setting
    const Component = CustomComponent || Components[type]
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{setting.label}</h2>
            <Component />
            <span className="font-light text-sm">{setting.description}</span>
        </div>
    )

}


