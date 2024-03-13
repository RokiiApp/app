import { RawEvent, watchImmediate } from 'tauri-plugin-fs-watch-api'
import debounce from 'just-debounce-it'
import { PLUGINS_PATH } from '@/common/constants/paths'
import { getExtensionNameFromPath } from './utils/getExtensionNameFromPath'

export interface ExtensionsFolderWatcherSubscritor {
    /**
     * The method that is called when an extension is added
     * @param extensionName The name of the extension that was added
     */
    onExtensionAdded: (extensionName: string) => void,
    /**
     * The method that is called when an extension is removed
     * @param extensionName 
     */
    onExtensionRemoved: (extensionName: string) => void
}

/**
 * A class that watches for changes in the extensions directory
 * and emits events when an extension is added or removed
 * It implements the **observer pattern**, so it allows other classes to subscribe to its events
 */
class ExtensionsFolderWatcher {
    private suscriptors: Set<ExtensionsFolderWatcherSubscritor> = new Set()

    constructor() {
        // We start watching the extensions folder
        this.watch()
    }

    /**
     * This method subscribes a listener to the events that are emitted by this class
     * @param subscriptor 
     */
    subscribe(subscriptor: ExtensionsFolderWatcherSubscritor) {
        this.suscriptors.add(subscriptor)
    }

    /**
     * This method unsubscribes a listener from the events that are emitted by this class
     * @param subscriptor 
     */
    unsubscribe(subscriptor: ExtensionsFolderWatcherSubscritor) {
        this.suscriptors.delete(subscriptor)
    }

    private notifyExtensionAdded(extensionName: string) {
        this.suscriptors.forEach(s => s.onExtensionAdded(extensionName))
    }

    private notifyExtensionRemoved(extensionName: string) {
        this.suscriptors.forEach(s => s.onExtensionRemoved(extensionName))
    }

    private async watch() {
        console.log('[ExtensionsWatcher] - Started')

        await watchImmediate(PLUGINS_PATH, (event) => {
            this.onRemoveEvent(event)
            this.onModifyEvent(event)
        }, { recursive: true })
    }

    private onRemoveEvent(event: RawEvent) {
        const { type, paths } = event

        const isUnknownEvent = type === 'any ' || type === 'other'
        if (isUnknownEvent) return

        const isRemoveEvent = 'remove' in type
        if (!isRemoveEvent) return

        const extensionPath = paths[0] as string

        const extensionName = getExtensionNameFromPath(extensionPath)

        /**
         * We ignore the package.json file, as it is not a plugin
         */
        if (extensionName === "package.json") return

        this.notifyExtensionRemoved(extensionName)
    }

    private onModifyEvent(event: RawEvent) {
        const { type, paths } = event

        const isUnknownEvent = type === 'any ' || type === 'other'
        if (isUnknownEvent) return

        const isModifyEvent = 'modify' in type
        if (!isModifyEvent) return

        const extensionPath = paths[0] as string

        const extensionName = getExtensionNameFromPath(extensionPath)

        /**
         * We ignore the package.json file, as it is not a plugin
         */
        if (extensionName === "package.json") return

        /**
         * We use a debounce function to avoid emitting multiple events for the same plugin
         */
        this.notifyAddedExtension(extensionName)
    }

    private notifyAddedExtension = debounce((name: string) => {
        this.notifyExtensionAdded(name)
    }, 300)

}

const extensionsFolderWatcher = new ExtensionsFolderWatcher()

// This is a singleton, so we export the instance
export { extensionsFolderWatcher }
