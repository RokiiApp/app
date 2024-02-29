import { useEffect } from 'react'
import { useActionsStore } from '@/stores/actions'
import { ExtensionLoadedEvent, ExtensionsRepoEventTypes, ExtensionRemovedEvent } from '@/extensions/repo/Events'
import { extensionsRepository } from '@/extensions/repo/ExtensionsRespository'
import { ExtensionContextProvider } from '@/services/plugins/ContextProvider'
import { useExtensionSettings } from '@/stores/extension-settings'

// TODO: Suscribe to unload plugin event to remove plugin from state
export const useRunExtensions = (term: string) => {
  const removeAllActions = useActionsStore(s => s.removeAllActions)
  const removeActionsFromExtension = useActionsStore(s => s.removeActionsFromExtension)
  const updateExtensionSettings = useExtensionSettings(s => s.addSettings)
  const getExtensionSettings = useExtensionSettings(s => s.getAllFromExtension)
  const removeSettings = useExtensionSettings(s => s.deleteAllFromExtension)

  const onExtensionAdded = ({ detail }: ExtensionLoadedEvent) => {
    const { name } = detail

    const extension = extensionsRepository.get(name)

    const extensionContextProvider = new ExtensionContextProvider(extension.name)
    const extensionContext = extensionContextProvider.get(term)

    const savedSettings = getExtensionSettings(extension.name)

    try {
      const extensionSettings = extension.init(savedSettings)
      updateExtensionSettings(extension.name, extensionSettings)
    } catch (error) {
      // Do not fail on plugin errors, just log them to console
      console.log('Error initializing plugin', name, error)
    }

    try {
      // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
      extension.run(extensionContext)
    } catch (error) {
      // Do not fail on plugin errors, just log them to console
      console.log('Error running plugin', name, error)
    }
  }

  const onExtensionRemoved = ({ detail }: ExtensionRemovedEvent) => {
    const { name } = detail

    removeSettings(name)
    removeActionsFromExtension(name)
  }

  useEffect(() => {
    // Reset results state to initial state
    removeAllActions()

    const allPlugins = extensionsRepository.getAll()

    for (const [name, extension] of Object.entries(allPlugins)) {
      const { name: extensionName } = extension

      const extensionContextProvider = new ExtensionContextProvider(extensionName)
      const extensionContext = extensionContextProvider.get(term)

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run(extensionContext)
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error)
      }
    }

    // Reset results state on unmount so we don't have stale results and autocomplete values
    return () => removeAllActions()
  }, [term])

  useEffect(() => {
    extensionsRepository.addEventListener(ExtensionsRepoEventTypes.LOADED, onExtensionAdded)
    extensionsRepository.addEventListener(ExtensionsRepoEventTypes.REMOVED, onExtensionRemoved)

    return () => {
      extensionsRepository.removeEventListener(ExtensionsRepoEventTypes.LOADED, onExtensionAdded)
      extensionsRepository.removeEventListener(ExtensionsRepoEventTypes.REMOVED, onExtensionRemoved)
    }
  }, [extensionsRepository, term])
}
