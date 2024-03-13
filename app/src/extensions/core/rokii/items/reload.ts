import { ScriptItem } from '@rokii/api'
import { relaunch } from '@tauri-apps/plugin-process'

export const reload = new ScriptItem({
    title: 'Reload',
    subtitle: 'Reload RoKii',
    run: async () => await relaunch(),
    keyword: ['reload', 'restart', 'relaunch']
})
