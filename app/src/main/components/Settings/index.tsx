import { FormComponents } from '@rokii/ui'
import { THEMES } from '@/common/themes'

import Hotkey from './Hotkey'
import styles from './styles.module.css'
import { useRokiiSettingsStore } from '@/stores/rokii-settings'
import { SettingItem } from './SettingItem'

const { Select, Checkbox } = FormComponents

function Settings() {
  const state = useRokiiSettingsStore((s) => s.settings)
  const set = useRokiiSettingsStore((s) => s.set)

  return (
    <div className={styles.settings}>
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
      <Checkbox
        label='Open at login'
        value={state.openAtLogin}
        onChange={(value: boolean) => set('openAtLogin', value)}
      />
      <Checkbox
        label='Developer Mode'
        value={state.developerMode}
        onChange={(value: boolean) => set('developerMode', value)}
      />
      <Checkbox
        label='Hide window on blur'
        value={state.hideOnBlur}
        onChange={(value: boolean) => set('hideOnBlur', value)}
      />
      <Checkbox
        label='Clean results on hide'
        value={state.cleanOnHide}
        onChange={(value: boolean) => set('cleanOnHide', value)}
      />
      <Checkbox
        label='Select input on show'
        value={state.selectOnShow}
        onChange={(value: boolean) => set('selectOnShow', value)}
      />
    </div>
  )
}

export default Settings
