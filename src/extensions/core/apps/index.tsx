import { Action, ExtensionModule } from "@/extensions/types"
import type { AppEntry } from "./types"
import icon from "../icon.png"
import { search } from "@rokii/utils"
import { invoke } from "@tauri-apps/api/tauri"
import { getInstalledApps } from "./getInstalledApps"

const apps: Record<string, AppEntry> = {}

const run: ExtensionModule["run"] = async ({ term, update, display, actions }) => {
    // This is a hidden command that will refresh the apps list
    if (term === "apps refresh") {
        const ACTION_ID = "refresh"
        const refreshAction: Action = {
            title: "Refresh apps list",
            id: ACTION_ID,
            type: "script",
            run: async () => {
                update(ACTION_ID, {
                    title: "Refreshing apps list...",
                    type: "app",
                    subtitle: "This might take a while",
                })
                await initializeAsync()
                actions.replaceTerm("")
            },
        }

        display([refreshAction])
        return
    }

    if (Object.entries(apps).length === 0) {
        await initializeAsync()
    }

    const foundApps = search(Object.entries(apps), term, ([name]) => name);

    const results: Action[] = foundApps.map(([name, app]) => ({
        title: name,
        subtitle: "Launch 🚀",
        type: "script",
        run: () => { invoke("open_app_by_id", { appId: app.id }) }
    }));

    display(results)
}

// TODO: search the icons, and display them
// Think about how this should be updated. Maybe an interval?

const initializeAsync = async () => {
    const installedApps = await getInstalledApps()
    Object.assign(apps, Object.fromEntries(installedApps))
}

const AppsExplorerExtension: ExtensionModule = {
    name: "Apps",
    run,
    icon,
    initializeAsync
}

export default AppsExplorerExtension

