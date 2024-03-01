import { useMemo } from 'react'
import { useExtensionSettings } from '@/stores/extension-settings'
import { InputComponentFabric } from './input-components/InputComponentFabric'

function ExtensionSettings({ extensionName }: { extensionName: string }) {
  const getSettings = useExtensionSettings((s) => s.getAllFromExtension)
  const extensionSetting = useMemo(() => getSettings(extensionName), [extensionName])
  const add = useExtensionSettings((s) => s.addSetting)

  return (
    <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">
      {
        Object.entries(extensionSetting).map(([id, setting]) => {
          return (
            <InputComponentFabric
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
