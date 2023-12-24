import { PluginModule } from "@rokii/types"
import { search } from "@rokii/utils"
import { invoke } from "@tauri-apps/api/tauri"

type AppEntry = {
    name: string
    id: string
}

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

export const fn: PluginModule["fn"] = async (ctx) => {
    // This is a hidden command that will refresh the apps list
    if (ctx.term === "apps refresh") {
        return ctx.display({
            title: "Refresh apps list",
            id: "refresh",
            onSelect: async (e) => {
                e.preventDefault()
                ctx.update("refresh", {
                    title: "Refreshing apps list...",
                    subtitle: "This might take a while",
                })
                await initializeAsync()
                ctx.actions.replaceTerm("")
            },
        })
    }

    if (Object.entries(apps).length === 0) {
        await initializeAsync()
    }

    const foundApps = search(Object.entries(apps), ctx.term, ([name]) => name);

    foundApps.forEach(([name, app]) => {
        ctx.display({
            title: name,
            subtitle: "Launch 🚀",
            onSelect: () => { invoke("open_app_by_id", { appId: app.id }) }
        })
    })

}

// TODO: search the icons, and display them
// Think about how this should be updated. Maybe an interval?

export const initializeAsync = async () => {
    const installedApps = await getInstalledApps()
    Object.assign(apps, Object.fromEntries(installedApps))
}

export { default as icon } from "../icon.png"
