import { relaunch, exit } from "@tauri-apps/plugin-process";

const AppManager = {
    async restart() {
        await relaunch();
    },

    async exit() {
        await exit();
    }
}

Object.freeze(AppManager);

export { AppManager }
