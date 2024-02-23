
export const enum ExtensionsWatcherEventTypes {
    ADDED = 'extension-added',
    REMOVED = 'extension-removed'
}

export class ExtensionAddedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionsWatcherEventTypes.ADDED, { detail: { name } })
    }
}

export class ExtensionRemovedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionsWatcherEventTypes.REMOVED, { detail: { name } })
    }
}
