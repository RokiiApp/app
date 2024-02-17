import type { AppEntry } from "./types"
import { invoke } from "@tauri-apps/api/tauri"

export const getInstalledApps = async () => {
    const rawInstalledApps = await invoke<string[]>("get_installed_apps")

    const installedApps = rawInstalledApps.map((appEntry) => {
        const [match, rawName, rawId] = appEntry.match(/(.+?)\s\s+(.+)/)

        const name = rawName.trim()
        const id = rawId.trim()

        // We create an array of entries so we can create the apps object
        return [name, { name, id }] as [string, AppEntry]
    })

    return installedApps
}
