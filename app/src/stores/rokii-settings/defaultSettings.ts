import { THEMES } from '@/common/themes'
import { RokiiSettingsSchema } from './RokiiSettingsSchema'

const defaultSettings: RokiiSettingsSchema = {
    theme: THEMES[0].value,
    hotkey: 'Control+Space',
    developerMode: false,
    cleanOnHide: true,
    selectOnShow: false,
    hideOnBlur: true,
    openAtLogin: true,
    winPosition: [0, 0]
}

Object.freeze(defaultSettings)

export { defaultSettings }
