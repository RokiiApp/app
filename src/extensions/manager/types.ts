export interface PluginsManagerEvents {
    [PluginEvents.LOADED]: PluginLoadedEvent;
    [PluginEvents.REMOVED]: PluginRemovedEvent;
}

export const enum PluginEvents {
    LOADED = 'plugin-loaded',
    REMOVED = 'plugin-removed'
}

export class PluginLoadedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(PluginEvents.LOADED, { detail: { name } });
    }
}

export class PluginRemovedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(PluginEvents.REMOVED, { detail: { name } });
    }
}
