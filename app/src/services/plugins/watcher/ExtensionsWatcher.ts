import { RawEvent, watchImmediate } from 'tauri-plugin-fs-watch-api'
import debounce from 'just-debounce-it'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { PLUGINS_PATH } from '@/common/constants/paths'
import { TypedEventTarget } from 'typescript-event-target'
import { ExtensionsWatcherEventTypes, ExtensionAddedEvent, ExtensionRemovedEvent } from './WatcherEvents'
import { getExtensionNameFromPath } from './fs-utils'

export interface WatcherEvents {
    [ExtensionsWatcherEventTypes.ADDED]: ExtensionAddedEvent
    [ExtensionsWatcherEventTypes.REMOVED]: ExtensionRemovedEvent
}

/**
 * A class that watches for changes in the extensions directory
 * and emits events when an extension is added or removed
 */
class ExtensionsWatcher extends TypedEventTarget<WatcherEvents> {
    private unlistenFunction: UnlistenFn | null = null
    async watch() {
        if (this.unlistenFunction) return
        console.log('[ExtensionsWatcher] - Started')

        this.unlistenFunction = await watchImmediate(PLUGINS_PATH, (event) => {
            this.onRemoveEvent(event)
            this.onModifyEvent(event)
        }, { recursive: true })

    }

    stop() {
        console.log('[ExtensionsWatcher] - Stopped')
        if (this.unlistenFunction) {
            this.unlistenFunction()
        }
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

        this.dispatchTypedEvent(ExtensionsWatcherEventTypes.REMOVED, new ExtensionRemovedEvent(extensionName))
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
        this.dispatchTypedEvent(ExtensionsWatcherEventTypes.ADDED, new ExtensionAddedEvent(name))
    }, 300)

}

const extensionsWatcher = new ExtensionsWatcher()

export { extensionsWatcher }
