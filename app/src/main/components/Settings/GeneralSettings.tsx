import { StoredSetting } from '@/stores/extension-settings'
import Hotkey from './input-components/Hotkey'
import { InputComponentFabric } from './input-components/InputComponentFabric'
import { useRokiiSettings } from '@/stores/rokii-settings'

function isRokiiSetting<T extends string>(settingName: string, settings: Record<T, any>): settingName is keyof Record<T, any> {
    return settingName in settings
}

function GeneralSettings() {
    const [setSetting, generalSettings] = useRokiiSettings(s => [s.setSetting, s.getAllSettings()])

    return (
        <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">
            {
                Object.entries(generalSettings).map(([id, setting]) => {
                    if (!isRokiiSetting(id, generalSettings)) return null

                    if (setting.id === 'rokii.hotkey') {
                        return <Hotkey
                            key={id}
                            setting={setting as StoredSetting<string>}
                            onChange={(value) => setSetting(id, { ...setting, value })}
                        />
                    }

                    return <InputComponentFabric
                        key={id} setting={setting}
                        onChange={(value) => setSetting(id, { ...setting, value })}
                    />

                })
            }

        </div>
    )
}

export default GeneralSettings
