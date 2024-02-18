import type { PluginInfo } from '../types'
import memoize from 'memoizee'
import validVersion from 'semver/functions/valid'
import compareVersions from 'semver/functions/gt'
import { getNPMPlugins } from './dataFetching'
import { getInstalledPlugins } from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'
import { CACHE_PLUGINS_MAX_AGE, PLUGINS_BLACKLIST } from '../constants'

const getAvailableNPMPlugins = memoize(getNPMPlugins, { maxAge: CACHE_PLUGINS_MAX_AGE })

const parseVersion = (version: string) =>
  validVersion((version || '').replace(/^\^/, '')) || '0.0.0'

export const getPlugins = async (): Promise<PluginInfo[]> => {
  const [available, installed, debuggingPlugins] = await Promise.all([
    getAvailableNPMPlugins(),
    getInstalledPlugins(),
    getDebuggingPlugins()
  ])

  const normalizedIntalledPlugins = installed.map((plugin) => {
    const { name, version, settings } = plugin
    return {
      name,
      version,
      installedVersion: parseVersion(version),
      settings,
      isInstalled: true,
      isUpdateAvailable: false
    }
  })

  const pluginsList: PluginInfo[] = available.map((plugin) => {
    const installedPlugin = normalizedIntalledPlugins.find(p => p.name === plugin.name)

    if (installedPlugin == null) {
      return {
        ...plugin,
        isInstalled: false,
        isUpdateAvailable: false,
        isDebugging: false
      }
    }

    const { installedVersion } = installedPlugin
    const isUpdateAvailable = compareVersions(plugin.version, parseVersion(installedVersion))

    return {
      ...plugin,
      ...installedPlugin,
      isInstalled: true,
      isUpdateAvailable
    }
  })

  console.log('Debugging Plugins: ', debuggingPlugins)

  const listOfDebuggingPlugins = debuggingPlugins.map((name) => ({
    name,
    description: '',
    version: 'dev',
    isDebugging: true,
    isInstalled: true,
    isUpdateAvailable: false
  }))

  const pluginsListWithoutDebugging = pluginsList.filter(p =>
    listOfDebuggingPlugins.find(d => d.name === p.name) === undefined
  )

  const plugins = [
    ...pluginsListWithoutDebugging,
    ...listOfDebuggingPlugins
  ].filter((plugin) => !PLUGINS_BLACKLIST.includes(plugin.name))

  return plugins
}
