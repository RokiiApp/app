import { Extension } from "../Extension"

export const enum ExtensionsRepoEventTypes {
  LOADED = 'extension-loaded',
  REMOVED = 'extension-removed'
}

export class ExtensionLoadedEvent extends CustomEvent<{ extension: Extension }> {
  constructor (extension: Extension) {
    super(ExtensionsRepoEventTypes.LOADED, { detail: { extension } })
  }
}

export class ExtensionRemovedEvent extends CustomEvent<{ name: string }> {
  constructor (name: string) {
    super(ExtensionsRepoEventTypes.REMOVED, { detail: { name } })
  }
}
