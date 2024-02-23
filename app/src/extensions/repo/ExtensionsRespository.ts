import { TypedEventTarget } from 'typescript-event-target'

import { initExtension } from '@/services/plugins/initializeExtensions'
import { ensureRokiNeededFiles } from '@/services/plugins'
import { extensionsWatcher } from '@/services/plugins/watcher/ExtensionsWatcher'

import { ExtensionsRepoEventTypes, ExtensionLoadedEvent, ExtensionRemovedEvent } from './Events'
import { Extension } from '../Extension'
import { getCoreExtensions, getExternalExtensions } from '@/services/plugins/getters'
import { ExtensionsWatcherEventTypes } from '@/services/plugins/watcher/WatcherEvents'
import { requireExtension } from '@/services/plugins/requireExtension'

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
class ExtensionsRepository extends TypedEventTarget<RepositoryEvents> {
  private extensions: Record<string, Extension> = {}

  async init() {
    await ensureRokiNeededFiles()
    await this.initializePlugins()
    await this.initializeExtensionsWatcher()
  }

  async initializeExtensionsWatcher() {
    extensionsWatcher.addEventListener(ExtensionsWatcherEventTypes.ADDED, async (event) => {
      const { name } = event.detail

      const extension = await requireExtension(name)
      if (extension === null) return

      this.add(extension)
    })

    extensionsWatcher.addEventListener(ExtensionsWatcherEventTypes.REMOVED, (event) => {
      const { name } = event.detail

      this.delete(name)
    })

    await extensionsWatcher.watch()
  }

  async initializePlugins() {
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
  async add(ext: Extension) {
    await this.loadExtension(ext)
  }

  get(name: string) {
    return this.extensions[name]
  }

  delete(name: string) {
    delete this.extensions[name]

    this.dispatchTypedEvent(ExtensionsRepoEventTypes.REMOVED, new ExtensionRemovedEvent(name))
  }

  getAll() {
    return this.extensions
  }

  private async loadExtension(extension: Extension) {
    await initExtension(extension, extension.name)

    this.extensions[extension.name] = extension

    this.dispatchTypedEvent(ExtensionsRepoEventTypes.LOADED, new ExtensionLoadedEvent(extension.name))
  }
}

const extensionsRepository = new ExtensionsRepository()
await extensionsRepository.init()

export { extensionsRepository }
