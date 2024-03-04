import { RokiiSettingsSchema } from './RokiiSettingsSchema'

const defaultSettings: RokiiSettingsSchema = {
    hotkey: {
        id: "rokii.hotkey",
        label: "Hotkey",
        value: "Control+Space"
    },
    theme: {
        id: "rokii.theme",
        label: "Theme",
        value: 'light',
        options: [
            {
                label: "Light",
                value: "light"
            },
            {
                label: "Dark",
                value: "dark"
            }
        ]
    },
    developerMode: {
        id: "rokii.developerMode",
        label: "Developer mode",
        description: "Enable developer mode",
        value: false
    },
    cleanOnHide: {
        id: "rokii.cleanOnHide",
        label: "Clear input on hide",
        value: false
    },
    selectOnShow: {
        id: "rokii.selectOnShow",
        label: "Select input on show",
        value: false
    },
    hideOnBlur: {
        id: "rokii.hideOnBlur",
        label: "Hide window on blur",
        value: true
    },
    openAtLogin: {
        id: "rokii.openAtLogin",
        label: "Open at login",
        value: false
    }
}

Object.freeze(defaultSettings)

export { defaultSettings }
