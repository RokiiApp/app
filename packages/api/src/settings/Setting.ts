export type SettingType = "string" | "number" | "boolean" | "select"

export type Setting<T = any> = {
    id: string
    label: string
    description?: string
    defaultValue: T
    options?: { value: string, label: string }[]
}

// StringSettings
type StringSetting = Setting<string>
type StringSettingArgs = Omit<StringSetting, "type" | "options">
export const StringSetting = (setting: StringSettingArgs): StringSetting => setting


// NumberSettings
type NumberSetting = Setting<number>
type NumberSettingArgs = Omit<NumberSetting, "type" | "options">
export const NumberSetting = (setting: NumberSettingArgs): NumberSetting => setting

// BooleanSettings
type BooleanSetting = Setting<boolean>
type BooleanSettingArgs = Omit<BooleanSetting, "type" | "options">
export const BooleanSetting = (setting: BooleanSettingArgs): BooleanSetting => setting

// BooleanSettings
type SelectSetting = Setting<string> & {
    options: { value: string, label: string }[]
}
type SelectSettingArgs = Omit<SelectSetting, "type">
export const SelectSetting = (setting: SelectSettingArgs): SelectSetting => setting
