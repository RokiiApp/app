import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart'

const AutoStart = {
  async isEnabled () {
    return await isEnabled()
  },

  async set (to: boolean) {
    to
      ? await AutoStart.enable()
      : await AutoStart.disable()
  },

  async enable () {
    if (await isEnabled()) {
      return
    }
    await enable()
  },

  async disable () {
    const enabled = await isEnabled()
    if (!enabled) {
      return
    }
    await disable()
  }
}

Object.freeze(AutoStart)

export { AutoStart }
