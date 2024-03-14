import { Update, check } from '@tauri-apps/plugin-updater';
import { ask } from '@tauri-apps/plugin-dialog';
import { AppManager } from './AppManager';

const AutoUpdater = {
    async tryUpdate() {
        const update = await check();

        if (!update?.available) return;

        if (!await this.userWantsUpdate(update)) return;

        await update.downloadAndInstall();

        await AppManager.restart();
    },

    /**
     * @internal
     */
    async userWantsUpdate(update: Update) {
        return await ask('Would you like to install it now?', {
            title: `Rokii Updater - Version ${update.version} available!`
        });
    }

}

Object.freeze(AutoUpdater);

export { AutoUpdater }
