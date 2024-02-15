import { enable, isEnabled, disable } from 'tauri-plugin-autostart-api';

export class AutoStartManager {
  static async isEnabled() {
    return await isEnabled();
  }

  static async setAutoStart(to: boolean) {
    to
      ? await AutoStartManager.enable()
      : await AutoStartManager.disable();
  }

  private static async enable() {
    if (await isEnabled()) {
      return
    }
    await enable();
  }

  private static async disable() {
    const enabled = await isEnabled();
    if (!enabled) {
      return;
    }
    await disable();
  }
}
