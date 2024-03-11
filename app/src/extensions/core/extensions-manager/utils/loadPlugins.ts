import type { ExtensionInfo } from '../types'
import compareVersions from 'semver/functions/gt'
import { getNPMPlugins } from './getNpmPlugins'
import { getInstalledPlugins } from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'
import { PLUGINS_BLACKLIST } from '../constants'

export const getPlugins = async (): Promise<ExtensionInfo[]> => {
  const [available, installed, debuggingExtensionNames] = await Promise.all([
    getNPMPlugins(),
    getInstalledPlugins(),
    getDebuggingPlugins()
  ])

  const pluginsList: ExtensionInfo[] = available.map((npmExtensionInfo) => {
    const { name, description, version } = npmExtensionInfo

    const installedPlugin = installed.find(p => p.name === name)

    if (!installedPlugin) {
      return {
        name,
        description,
        lastVersion: version,
        isDebugging: false,
        isInstalled: false,
        installedVersion: null,
        updateAvailable: false,
      }
    }

    const { version: installedVersion } = installedPlugin
  
    const updateAvailable = compareVersions(npmExtensionInfo.version, installedVersion)

    return {
      name,
      description,
      lastVersion: version,
      isDebugging: false,
      isInstalled: true,
      installedVersion,
      updateAvailable
    }
  })

  console.log('Debugging Plugins: ', debuggingExtensionNames)

  const debuggingExtensions: ExtensionInfo[] = debuggingExtensionNames.map((name) => ({
    name,
    description: '',
    lastVersion: 'dev',
    installedVersion: 'dev',
    isDebugging: true,
    isInstalled: false,
    updateAvailable: false
  }))

  const pluginsListWithoutDebugging = pluginsList.filter(p => !debuggingExtensions.some(d => d.name === p.name))

  const allExtensions = [...pluginsListWithoutDebugging, ...debuggingExtensions]

  const extensions = allExtensions.filter((plugin) => !PLUGINS_BLACKLIST.includes(plugin.name))

  return extensions
}
