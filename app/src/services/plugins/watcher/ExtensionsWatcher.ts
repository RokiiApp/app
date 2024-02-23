import { RawEvent, watchImmediate } from 'tauri-plugin-fs-watch-api'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { PLUGINS_PATH } from '@/common/constants/paths'
import { TypedEventTarget } from 'typescript-event-target'
import { ExtensionsWatcherEventTypes, ExtensionAddedEvent, ExtensionRemovedEvent } from './WatcherEvents'
import { getPluginName, parse } from './fs-utils'

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
        console.log('ExtensionsWatcher started')

        this.unlistenFunction = await watchImmediate(PLUGINS_PATH, (event) => {
            this.onRemoveEvent(event)
            this.onModifyEvent(event)
        }, { recursive: true })

    }

    stop() {
        console.log('ExtensionsWatcher stopped')
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

        const pluginPath = paths[0]

        const { dir } = parse(pluginPath)

        if (dir.match(/plugins$/) == null) return

        const extensionName = getPluginName(pluginPath)

        this.dispatchTypedEvent(ExtensionsWatcherEventTypes.REMOVED, new ExtensionRemovedEvent(extensionName))

        console.log(`[ExtensionsWatcher]: Extension "${extensionName}" was removed.`)

    }

    private onModifyEvent(event: RawEvent) {
        const { type, paths } = event

        const isUnknownEvent = type === 'any ' || type === 'other'
        if (isUnknownEvent) return

        const isModifyEvent = 'modify' in type
        if (!isModifyEvent) return

        const pluginPath = paths[0]
        const { dir, base } = parse(pluginPath)

        if ((dir.match(/plugins$/) == null) || (base.match(/package.json$/) != null)) return

        const pluginName = getPluginName(pluginPath)

        this.dispatchTypedEvent(ExtensionsWatcherEventTypes.ADDED, new ExtensionAddedEvent(pluginName))

        console.log(`[ExtensionsWatcher]: Extension "${pluginName}" changed.`)

        // TODO - Move this to external class
        // debouncedLoadPlugin(pluginName)

        console.log(event)
    }
}

const extensionsWatcher = new ExtensionsWatcher()

export { extensionsWatcher }
