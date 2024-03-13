import { PLUGINS_PACKAGE_JSON_PATH } from '@/common/constants/paths'
import { PackageJson } from '@/services/PackageJson'
import { deleteScope } from '@/utils/text'

export const getExternalExtensionNames = async () => {
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
