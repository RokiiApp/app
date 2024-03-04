import { InfoItem, ScriptItem, ExtensionModule } from '@rokii/api'
import type { AppEntry } from './types'
import icon from '../icon.png'
import { invoke } from '@tauri-apps/api/tauri'
import { getInstalledApps } from './getInstalledApps'

const apps: Record<string, AppEntry> = {}

const refreshingItem = new InfoItem({ title: 'Refreshing apps list...', subtitle: 'This might take a while' })

const run: ExtensionModule['run'] = async ({ term, update, display, actions }) => {
  // This is a hidden command that will refresh the apps list
  if (term === 'apps refresh') {
    const ACTION_ID = 'refresh'
    const refreshItem = new ScriptItem({
      title: 'Refresh apps list',
      id: ACTION_ID,
      run: async () => {
        update(ACTION_ID, refreshingItem)
        await initializeAsync()
        actions.replaceTerm('')
      }
    })

    display([refreshItem])
    return
  }

  if (Object.entries(apps).length === 0) {
    await initializeAsync()
  }

  const results = Object.entries(apps).map(([name, app]) => {
    const title = name
    const run = () => { invoke('open_app_by_id', { appId: app.id }) }

    return new ScriptItem({ title, run })
  })

  display(results)
}

// TODO: search the icons, and display them
// Think about how this should be updated. Maybe an interval?

const initializeAsync = async () => {
  const installedApps = await getInstalledApps()
  Object.assign(apps, installedApps)
}

const AppsExplorerExtension: ExtensionModule = {
  name: 'Apps',
  run,
  icon,
  initializeAsync
}

export default AppsExplorerExtension
