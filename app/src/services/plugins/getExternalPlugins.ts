import { PLUGINS_PACKAGE_JSON_PATH } from '@/common/constants/paths'
import { PackageJson } from '@/services/PackageJson'
import { deleteScope } from '../utils/deleteScope'

/**
 * @returns The names and versions of the plugins present in the package.json file in the plugins folder.
 *
 * ⚠️ This plugin returns scoped names like `@example/plugin`. Just like they are in the package.json
 */
export const getInstalledPluginsAndVersions = async () => {
  try {
    const pkgJson = new PackageJson(PLUGINS_PACKAGE_JSON_PATH)

    const plugins = await pkgJson.getDependencies()

    return plugins
  } catch (err) {
    console.log(err)
    return {}
  }
}

export const getInstalledPluginNames = async () => {
  try {
    const pkgJson = new PackageJson(PLUGINS_PACKAGE_JSON_PATH)

    const plugins = await pkgJson.getDependencies()

    const pluginNames = Object.keys(plugins).map(deleteScope)

    return pluginNames
  } catch (err) {
    console.log(err)
    return []
  }
}
