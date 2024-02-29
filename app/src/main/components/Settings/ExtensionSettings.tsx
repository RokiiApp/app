import { useMemo } from 'react'
import { SettingItem } from './SettingItem'
import { useSettingsStore } from '@/stores/settings'

function ExtensionSettings({ extensionName }: { extensionName: string }) {
  const getSettings = useSettingsStore((s) => s.getAllFromExtension)
  const extensionSetting = useMemo(() => getSettings(extensionName), [extensionName])
  const add = useSettingsStore((s) => s.addSetting)

  return (
    <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">
      {
        Object.entries(extensionSetting).map(([id, setting]) => {
          return (
            <SettingItem
              key={id}
              setting={setting}
              onChange={(value) => add(extensionName, { ...setting, value })}
            />
          )
        })
      }
    </div>
  )
}

export default ExtensionSettings
