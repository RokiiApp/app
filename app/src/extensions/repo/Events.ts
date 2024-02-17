export const enum ExtensionsRepoEventTypes {
    LOADED = 'extension-loaded',
    REMOVED = 'extension-removed'
}

export class ExtensionLoadedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionsRepoEventTypes.LOADED, { detail: { name } });
    }
}

export class ExtensionRemovedEvent extends CustomEvent<{ name: string }> {
    constructor(name: string) {
        super(ExtensionsRepoEventTypes.REMOVED, { detail: { name } });
    }
}
