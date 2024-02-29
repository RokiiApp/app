import { ScriptItem } from '@rokii/api'
import { navigate } from 'wouter/use-hash-location'

export const openSettings = new ScriptItem({
    title: 'Open Settings',
    run: (e) => {
        // Avoid hiding the rokii window
        e.preventDefault()
        navigate('/settings')
    },
    keyword: ['RoKii Preferences', 'cfg', 'config', 'params']
})
