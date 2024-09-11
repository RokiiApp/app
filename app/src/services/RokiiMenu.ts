import { getVersion } from "@tauri-apps/api/app"
import { invoke } from "@tauri-apps/api/core"
import { Menu, MenuItem } from "@tauri-apps/api/menu"
import { AppManager } from "./AppManager"
import { open } from "@tauri-apps/plugin-shell"

export class RokiiMenu {
    private constructor(
        readonly menu: Menu
    ) { }

    static async createMenu(type: "standard" | "development" = "standard") {
        switch (type) {
            case "standard":
                return new RokiiMenu(await this.createStandardMenu())
            case "development":
                return new RokiiMenu(await this.createDevelopmentMenu())
        }
    }

    private static async createStandardMenu() {
        // Standar menu has: toggle, settings, about, version, quit

        const toggleItem = await MenuItem.new({
            text: "Toggle",
            action: () => invoke("toggle_window_visibility")
        })

        const aboutItem = await MenuItem.new({
            text: "About",
            action: () => open("https://github.com/RokiiApp")
        })

        const versionItem = await MenuItem.new({
            text: `Version: ${await getVersion()}`
        })

        const quitItem = await MenuItem.new({
            text: "Quit",
            action: () => AppManager.exit()
        })

        const menu = await Menu.new({
            items: [toggleItem, aboutItem, versionItem, quitItem]
        })

        return menu
    }

    private static async createDevelopmentMenu() {
        // Development menu has: toggle, settings, about, devtools, version, quit

        const toggleItem = await MenuItem.new({
            text: "Toggle",
            action: () => invoke("toggle_window_visibility")
        })

        const aboutItem = await MenuItem.new({
            text: "About",
            action: () => open("https://github.com/RokiiApp")
        })

        const devtoolsItem = await MenuItem.new({
            text: "Open DevTools",
            action: () => invoke("open_devtools")
        })

        const versionItem = await MenuItem.new({
            text: `Version: ${await getVersion()}`
        })

        const quitItem = await MenuItem.new({
            text: "Quit",
            action: () => AppManager.exit()
        })

        const menu = await Menu.new({
            items: [toggleItem, aboutItem, devtoolsItem, versionItem, quitItem]
        })

        return menu
    }
}
