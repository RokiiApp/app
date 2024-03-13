import { TypedEventTarget } from 'typescript-event-target'

import { ensureRokiNeededFiles } from '@/services/plugins'
import { ExtensionsFolderWatcherSubscritor, extensionsFolderWatcher } from '@/services/ExtensionsFolderWatcher'

import { ExtensionsRepoEventTypes, ExtensionLoadedEvent, ExtensionRemovedEvent } from './Events'
import { Extension } from '../Extension'
import { getCoreExtensions, getExternalExtensions } from '@/services/plugins/getters'
import { ExtensionModuleImporter } from '@/services/ExtensionModuleImporter'

export interface RepositoryEvents {
  [ExtensionsRepoEventTypes.LOADED]: ExtensionLoadedEvent
  [ExtensionsRepoEventTypes.REMOVED]: ExtensionRemovedEvent
}
/**
 * This class is a repository of all the extensions that are loaded in the application
 * It is responsible for loading the core and external extensions and keeping track of them
 * It also provides methods to add, remove and get extensions
 * Consumers can subscribe to the events that are dispatched by this class to be notified when an extension is added or removed
 */
class ExtensionsRepository extends TypedEventTarget<RepositoryEvents> implements ExtensionsFolderWatcherSubscritor {
  private initializedWatcher = false
  private extensions: Record<string, Extension> = {}

  // PUBLIC METHODS

  async init() {
    await ensureRokiNeededFiles()
    await this.initializePlugins()
    this.initializeExtensionsWatcher()
  }

  destroy() {
    for (let extensionName in this.extensions) {
      this.delete(extensionName)
    }
    this.stopExtensionsWatcher()
  }

  get(name: string) {
    return this.extensions[name]
  }

  getAll() {
    return this.extensions
  }

  // PRIVATE METHODS

  private initializeExtensionsWatcher() {
    if (this.initializedWatcher) return
    extensionsFolderWatcher.subscribe(this)
    this.initializedWatcher = true
  }

  private stopExtensionsWatcher() {
    extensionsFolderWatcher.unsubscribe(this)
    this.initializedWatcher = false
  }

  async onExtensionAdded(extensionName: string) {
    // Wait 500ms to ensure the file is fully written
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log('[ExtensionsRepository] - New extension detected. Extension name: ', extensionName)

    const extension = await ExtensionModuleImporter.get(extensionName)
    if (extension === null) {
      console.log('[ExtensionsRepository] - Extension was invalid. Wont be added: ', extensionName)
      return
    }

    console.log('[ExtensionsRepository] - Extension imported sucesfully: ', extensionName)

    this.add(extension)
  }

  onExtensionRemoved(extensionName: string) {
    console.log('[ExtensionsRepository] - Extension removed: ', extensionName)

    this.delete(extensionName)
  }

  private async initializePlugins() {
    // Load the core plugins (the ones that come with rokii)
    getCoreExtensions().then((coreExtensions) => {
      for (const extension of coreExtensions) {
        this.add(extension)
      }
    })

    // Load the external plugins (the ones that are installed by the user)
    getExternalExtensions().then((externalExtensions) => {
      for (const extension of externalExtensions) {
        this.add(extension)
      }
    })
  }

  /**
   * Method used to add a new extension to the repository
   */
  private async add(ext: Extension) {
    await this.loadExtension(ext)
  }

  private delete(name: string) {
    delete this.extensions[name]

    this.dispatchTypedEvent(ExtensionsRepoEventTypes.REMOVED, new ExtensionRemovedEvent(name))
  }

  private async loadExtension(extension: Extension) {
    this.extensions[extension.name] = extension

    this.dispatchTypedEvent(ExtensionsRepoEventTypes.LOADED, new ExtensionLoadedEvent(extension))
  }
}

const extensionsRepository = new ExtensionsRepository()

export { extensionsRepository }
