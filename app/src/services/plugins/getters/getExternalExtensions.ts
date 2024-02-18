import { getInstalledPluginNames } from '@/services/plugins/getExternalPlugins'
import { ExtensionGetter } from '.'
import { requireExtension } from '@/services/plugins/requireExtension'

export const getExternalExtensions: ExtensionGetter = async () => {
  const extensionNames = await getInstalledPluginNames()

  const extensions = await Promise.allSettled(extensionNames.map(async (name) => {
    const extension = await requireExtension(name)
    if (extension === null) {
      return Promise.reject(new Error(`Failed to load extension: ${name}`))
    }
    return extension
  }))

  return extensions.filter(isFulfilled).map((extension) => extension.value)
}

function isFulfilled<T> (input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> {
  return input.status === 'fulfilled'
}
