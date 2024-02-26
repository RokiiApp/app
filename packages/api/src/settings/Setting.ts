export type SettingType = "string" | "number" | "boolean"

export type Setting = {
    id: string
    label: string
    description?: string
    type: SettingType
    defaultValue: any
}

// StringSettings
type StringSetting = Setting & { type: "string", defaultValue: string }
type StringSettingArgs = Omit<StringSetting, "type">
export const StringSetting = (setting: StringSettingArgs): StringSetting => ({ ...setting, type: "string" })

// NumberSettings
type NumberSetting = Setting & { type: "number", defaultValue: number }
type NumberSettingArgs = Omit<NumberSetting, "type">
export const NumberSetting = (setting: NumberSettingArgs): NumberSetting => ({ ...setting, type: "number" })

// BooleanSettings
type BooleanSetting = Setting & { type: "boolean", defaultValue: boolean }
type BooleanSettingArgs = Omit<BooleanSetting, "type">
export const BooleanSetting = (setting: BooleanSettingArgs): BooleanSetting => ({ ...setting, type: "boolean" })
