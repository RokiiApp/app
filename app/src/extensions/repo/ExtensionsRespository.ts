import { TypedEventTarget } from 'typescript-event-target'

import { initExtension } from '@/services/plugins/initializeExtensions'
import { ensureRokiNeededFiles } from '@/services/plugins'
import { extensionsWatcher } from '@/services/plugins/watcher/ExtensionsWatcher'

import { ExtensionsRepoEventTypes, ExtensionLoadedEvent, ExtensionRemovedEvent } from './Events'
import { Extension } from '../Extension'
import { getCoreExtensions, getExternalExtensions } from '@/services/plugins/getters'
import {
  ExtensionAddedEvent,
  ExtensionRemovedEvent as FsExtensionRemovedEvent,
  ExtensionsWatcherEventTypes
} from '@/services/plugins/watcher/WatcherEvents'
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
    extensionsWatcher.addEventListener(ExtensionsWatcherEventTypes.ADDED, this.onAddedExtensionDetected.bind(this))
    extensionsWatcher.addEventListener(ExtensionsWatcherEventTypes.REMOVED, this.onRemovedExtensionDetected.bind(this))
    extensionsWatcher.watch()
    this.initializedWatcher = true
  }

  private stopExtensionsWatcher() {
    extensionsWatcher.removeEventListener(ExtensionsWatcherEventTypes.ADDED, this.onAddedExtensionDetected.bind(this))
    extensionsWatcher.removeEventListener(ExtensionsWatcherEventTypes.REMOVED, this.onRemovedExtensionDetected.bind(this))
    extensionsWatcher.stop()
    this.initializedWatcher = false
  }

  private async onAddedExtensionDetected(event: ExtensionAddedEvent) {
    console.log('[ExtensionsRepository] - New extension detected. Extension name: ', event.detail)
    const { name } = event.detail

    const extension = await requireExtension(name)
    if (extension === null) {
      console.log('[ExtensionsRepository] - Extension was invalid. Wont be added: ', event.detail)
      return
    }

    console.log('[ExtensionsRepository] - Extension imported sucesfully: ', event.detail)

    this.add(extension)
  }

  private onRemovedExtensionDetected(event: FsExtensionRemovedEvent) {
    console.log('[ExtensionsRepository] - Extension removed: ', event.detail)
    const { name } = event.detail

    this.delete(name)
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
    await initExtension(extension, extension.name)

    this.extensions[extension.name] = extension

    this.dispatchTypedEvent(ExtensionsRepoEventTypes.LOADED, new ExtensionLoadedEvent(extension.name))
  }
}

const extensionsRepository = new ExtensionsRepository()

export { extensionsRepository }
