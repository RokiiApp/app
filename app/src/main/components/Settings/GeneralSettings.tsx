import { FormComponents } from '@rokii/ui'
import { THEMES } from '@/common/themes'
import Hotkey from './Hotkey'
import { SettingItem } from './SettingItem'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'

const { Select } = FormComponents

function isRokiiSetting<T extends string>(settingName: string, settings: Record<T, any>): settingName is keyof Record<T, any> {
    return settingName in settings
}

function GeneralSettings() {
    const [setSetting, generalSettings] = useRokiiSettingsStore(s => [s.setSetting, s.getAllSettings()])

    return (
        <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {generalSettings.hotkey.label}
            </label>
            <Hotkey
                hotkey={generalSettings.hotkey.value}
                onChange={(value) => setSetting('hotkey', { ...generalSettings.hotkey, value })}
            />

            <Select
                label='Theme'
                value={THEMES.find((t) => t.value === generalSettings.theme.value)}
                options={THEMES}
                onChange={(newValue) => (newValue != null) && setSetting('theme', { ...generalSettings.theme, value: newValue.value })}
            />

            {
                Object.entries(generalSettings).map(([id, setting]) => {
                    if (!isRokiiSetting(id, generalSettings)) return null
                    if (setting.id === 'rokii.hotkey') return null
                    if (setting.id === 'rokii.theme') return null
                    return (
                        <SettingItem
                            key={id}
                            setting={setting}
                            onChange={(value) => setSetting(id, { ...setting, value })}
                        />
                    )
                })
            }

        </div>
    )
}

export default GeneralSettings
