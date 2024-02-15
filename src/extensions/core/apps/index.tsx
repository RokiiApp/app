import { Action, Extension } from "@/extensions/types"
import type { AppEntry } from "./types"
import icon from "../icon.png"
import { search } from "@rokii/utils"
import { invoke } from "@tauri-apps/api/tauri"

const apps: Record<string, AppEntry> = {}

const getInstalledApps = async () => {
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

const run: Extension["run"] = async (ctx) => {
    // This is a hidden command that will refresh the apps list
    if (ctx.term === "apps refresh") {
        const refreshAction: Action = {
            title: "Refresh apps list",
            id: "refresh",
            type: "script",
            run: async (e) => {
                e.preventDefault()
                ctx.update("refresh", {
                    title: "Refreshing apps list...",
                    subtitle: "This might take a while",
                })
                await initializeAsync()
                ctx.actions.replaceTerm("")
            },
        }

        ctx.display([refreshAction])
        return
    }

    if (Object.entries(apps).length === 0) {
        await initializeAsync()
    }

    const foundApps = search(Object.entries(apps), ctx.term, ([name]) => name);

    const results: Action[] = foundApps.map(([name, app]) => ({
        title: name,
        subtitle: "Launch 🚀",
        type: "script",
        run: () => { invoke("open_app_by_id", { appId: app.id }) }
    }));

    ctx.display(results)
}

// TODO: search the icons, and display them
// Think about how this should be updated. Maybe an interval?

const initializeAsync = async () => {
    const installedApps = await getInstalledApps()
    Object.assign(apps, Object.fromEntries(installedApps))
}

const AppsExplorerExtension: Extension = {
    name: "Apps",
    run,
    icon,
    initializeAsync
}

export default AppsExplorerExtension

