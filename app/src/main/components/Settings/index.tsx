import { FormComponents } from '@rokii/ui'
import { THEMES } from '@/common/themes'

import Hotkey from './Hotkey'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'
import { SettingItem } from './SettingItem'
import { SettingCheckbox } from './SettingChecbox'

const { Select } = FormComponents

function Settings() {
  const state = useRokiiSettingsStore((s) => s.settings)
  const set = useRokiiSettingsStore((s) => s.set)

  return (
    <div className="overflow-y-auto h-full px-2 flex flex-col gap-3">
      <SettingItem
        setting={{
          label: 'Hotkey',
          description: 'Type your global shortcut for Rokii in this input',
          id: 'hotkey',
          type: 'string',
          defaultValue: 'Ctrl+Space'
        }}

        CustomComponent={() =>
          <Hotkey hotkey={state.hotkey}
            onChange={(key) => set('hotkey', key)}
          />}
      />

      <Select
        label='Theme'
        value={THEMES.find((t) => t.value === state.theme)}
        options={THEMES}
        onChange={(newValue) => (newValue != null) && set('theme', newValue.value)}
      />

      <SettingCheckbox
        label='Open at login'
        value={state.openAtLogin}
        onChange={(value: boolean) => set('openAtLogin', value)}
      />
      <SettingCheckbox
        label='Developer mode'
        value={state.developerMode}
        onChange={(value) => set('developerMode', value)}
      />
      <SettingCheckbox
        label='Hide window on blur'
        value={state.hideOnBlur}
        onChange={(value) => set('hideOnBlur', value)}
      />
      <SettingCheckbox
        label='Clean results on hide'
        value={state.cleanOnHide}
        onChange={(value: boolean) => set('cleanOnHide', value)}
      />

    </div>
  )
}

export default Settings
