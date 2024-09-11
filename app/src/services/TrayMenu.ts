import { RokiiMenu } from "./RokiiMenu"
import { RokiiTray } from "./RokiiTray"

export class TrayMenu {
    private constructor(
        public menu: RokiiMenu,
        public tray: RokiiTray
    ) { }

    static async create(type: "standard" | "development") {
        const rokiiMenu = await RokiiMenu.createMenu(type)
        const rokiiTray = await RokiiTray.create(rokiiMenu.menu)

        return new TrayMenu(rokiiMenu, rokiiTray)
    }

    async setMenuType(type: "standard" | "development") {
        // Create a new menu based on the type

        const newMenu = await RokiiMenu.createMenu(type)

        // Set the menu to the tray
        await this.tray.setMenu(newMenu)
    }

    async delete() {
        await this.tray.tray.close()
    }
}
