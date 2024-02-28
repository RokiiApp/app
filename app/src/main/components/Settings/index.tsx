import { FormComponents } from '@rokii/ui'
import { THEMES } from '@/common/themes'

import Hotkey from './Hotkey'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'
import { SettingItem } from './SettingItem'

const { Select } = FormComponents

function Settings() {
  const state = useRokiiSettingsStore((s) => s.settings)
  const set = useRokiiSettingsStore((s) => s.set)

  return (
    <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">

      <Hotkey hotkey={state.hotkey}
        onChange={(key) => set('hotkey', key)}
      />

      <Select
        label='Theme'
        value={THEMES.find((t) => t.value === state.theme)}
        options={THEMES}
        onChange={(newValue) => (newValue != null) && set('theme', newValue.value)}
      />

      <SettingItem
        setting={{
          type: "boolean",
          id: "openAtLogin",
          label: "Open at login",
          description: "Start Rokii when you log in to your computer.",
        }}
        value={state.openAtLogin}
        onChange={(value: boolean) => set('openAtLogin', value)}
      />

      <SettingItem
        setting={{
          type: "boolean",
          id: "developerMode",
          label: "Developer mode",
        }}
        value={state.developerMode}
        onChange={(value: boolean) => set('developerMode', value)}
      />

      <SettingItem
        setting={{
          type: "boolean",
          id: "hideOnBlur",
          label: "Hide window on blur",
        }}
        value={state.hideOnBlur}
        onChange={(value: boolean) => set('hideOnBlur', value)}
      />

      <SettingItem
        setting={{
          type: "boolean",
          id: "cleanOnHide",
          label: "Clean results on hide",
        }}
        value={state.cleanOnHide}
        onChange={(value: boolean) => set('cleanOnHide', value)}
      />

    </div>
  )
}

export default Settings
