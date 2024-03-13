import type { AppEntry } from './types'
import { invoke } from '@tauri-apps/api/core'

export const getInstalledApps = async () => {
  const rawInstalledApps = await invoke<string>('get_installed_apps')

  const lines = rawInstalledApps.split('\n').map(line => line.trim()).filter(line => line.length > 0)

  // lines 0, 2, 4... contains app name
  // lines 1, 3, 5... contains app id

  const apps: Record<string, AppEntry> = {}

  for (let i = 0; i < lines.length; i += 2) {
    const name = lines[i] as string
    const id = lines[i + 1] as string

    apps[name] = { name, id }
  }

  return apps;
}
