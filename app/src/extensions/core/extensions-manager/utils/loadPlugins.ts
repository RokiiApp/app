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

  const objInfo: Record<string, ExtensionInfo> = {}

  // To ensure offline support, we first add the installed info
  for (let { name, installedVersion } of installed) {
    objInfo[name] = {
      name,
      description: "",
      lastVersion: installedVersion,
      isDebugging: false,
      isInstalled: true,
      installedVersion,
      updateAvailable: false
    }
  }


  for (let { name, description, lastVersion } of available) {
    // If there is an installed version, we overwritte the current info
    const extensionInstalledInfo = objInfo[name]
    if (extensionInstalledInfo) {
      objInfo[name] = {
        ...extensionInstalledInfo,
        description,
        lastVersion,
        updateAvailable: compareVersions(lastVersion, extensionInstalledInfo.installedVersion!)
      }

    }
    // If there is not installed version, we just use the remote info
    else {
      objInfo[name] = {
        name,
        description,
        isInstalled: false,
        installedVersion: null,
        lastVersion,
        isDebugging: false,
        updateAvailable: false
      }
    }
  }

  const pluginsList = Object.values(objInfo)

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
