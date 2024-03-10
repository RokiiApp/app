export type SettingType = "string" | "number" | "boolean" | "select"

export type Setting<T = any> = {
    id: string
    label: string
    description?: string
    defaultValue: T
    options?: { value: string, label: string }[]
}

// StringSettings
export type StringSetting = Setting<string>
export type StringSettingArgs = Omit<StringSetting, "type" | "options">
export const StringSetting = (setting: StringSettingArgs): StringSetting => setting


// NumberSettings
export type NumberSetting = Setting<number>
export type NumberSettingArgs = Omit<NumberSetting, "type" | "options">
export const NumberSetting = (setting: NumberSettingArgs): NumberSetting => setting

// BooleanSettings
export type BooleanSetting = Setting<boolean>
export type BooleanSettingArgs = Omit<BooleanSetting, "type" | "options">
export const BooleanSetting = (setting: BooleanSettingArgs): BooleanSetting => setting

// BooleanSettings
export type SelectSetting = Setting<string> & {
    options: { value: string, label: string }[]
}
export type SelectSettingArgs = Omit<SelectSetting, "type">
export const SelectSetting = (setting: SelectSettingArgs): SelectSetting => setting
