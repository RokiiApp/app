import { AppManager } from '@/services/AppManager'
import { ScriptItem } from '@rokii/api'

export const reload = new ScriptItem({
    title: 'Reload',
    subtitle: 'Reload RoKii',
    run: () => AppManager.restart(),
    keyword: ['reload', 'restart', 'relaunch']
})
