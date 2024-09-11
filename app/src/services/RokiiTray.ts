import { TrayIcon } from "@tauri-apps/api/tray";
import { RokiiMenu } from "./RokiiMenu";
import { Menu } from "@tauri-apps/api/menu";

export class RokiiTray {
    private constructor(
        readonly tray: TrayIcon
    ) { }

    static async create(menu?: Menu) {
        const tray = await TrayIcon.new({ menu, icon: "./icons/icon.png", id: "rokii" })

        return new RokiiTray(tray)
    }

    async setMenu(rokiiMenu: RokiiMenu) {
        await this.tray.setMenu(rokiiMenu.menu)
    }

}
