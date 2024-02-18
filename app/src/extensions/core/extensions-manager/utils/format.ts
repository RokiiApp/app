import type { PluginInfo } from '../types'

function words (string: string) {
  const pattern = /[^\s]+/g

  const match = string.match(pattern)

  return match ?? []
}
function capitalize (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const name = (text = '') => {
  const pluginWords = words(text)
  return pluginWords.map(capitalize).join(' ')
}

export const version = (plugin: PluginInfo) =>
  plugin.isUpdateAvailable
    ? `${plugin.installedVersion ?? ''} → ${plugin.version}`
    : plugin.version
