import { enable, isEnabled, disable } from 'tauri-plugin-autostart-api'

export class AutoStart {
  static async isEnabled () {
    return await isEnabled()
  }

  static async set (to: boolean) {
    to
      ? await AutoStart.enable()
      : await AutoStart.disable()
  }

  private static async enable () {
    if (await isEnabled()) {
      return
    }
    await enable()
  }

  private static async disable () {
    const enabled = await isEnabled()
    if (!enabled) {
      return
    }
    await disable()
  }
}
