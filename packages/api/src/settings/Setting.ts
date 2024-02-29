export type SettingType = "string" | "number" | "boolean"

export type Setting<T = any> = {
    id: string
    label: string
    description?: string
    type: SettingType
    defaultValue: T
}

// StringSettings
type StringSetting = Setting<string> & { type: "string" }
type StringSettingArgs = Omit<StringSetting, "type">
export const StringSetting = (setting: StringSettingArgs): StringSetting => ({ ...setting, type: "string" })

// NumberSettings
type NumberSetting = Setting<number> & { type: "number" }
type NumberSettingArgs = Omit<NumberSetting, "type">
export const NumberSetting = (setting: NumberSettingArgs): NumberSetting => ({ ...setting, type: "number" })

// BooleanSettings
type BooleanSetting = Setting<boolean> & { type: "boolean" }
type BooleanSettingArgs = Omit<BooleanSetting, "type">
export const BooleanSetting = (setting: BooleanSettingArgs): BooleanSetting => ({ ...setting, type: "boolean" })
