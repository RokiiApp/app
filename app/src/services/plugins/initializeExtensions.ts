import { extensionSettings } from '@/services/plugins'
import type { Extension } from '@/extensions/Extension'

export const initExtension = async (extension: Extension, name: string) => {
  const { initialize, initializeAsync, onMessage } = extension

  // Foreground plugin initialization
  if (initialize) {
    console.log('Initialize sync plugin', name)

    try {
      initialize(extensionSettings.getUserSettings(extension, name))
    } catch (e) {
      console.error(`Failed to initialize plugin: ${name}`, e)
    }
  }

  // Background plugin initialization
  if (initializeAsync) {
    console.log(`[initializeAsync:${name}] - Calling initializeAsync function`)

    initializeAsync((data: unknown) => {
      console.log(`[initializeAsync:${name}] - Calling onMessage function`)

      if (onMessage) onMessage(data)
    }, extensionSettings.getUserSettings(extension, name))
  }
}
