export interface PluginsManagerEvents {
    [ExtensionEvents.LOADED]: ExtensionLoadedEvent;
    [ExtensionEvents.REMOVED]: ExtensionRemovedEvent;
}

export const enum ExtensionEvents {
    LOADED = 'extension-loaded',
    REMOVED = 'extension-removed'
}

export class ExtensionLoadedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionEvents.LOADED, { detail: { name } });
    }
}

export class ExtensionRemovedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionEvents.REMOVED, { detail: { name } });
    }
}
