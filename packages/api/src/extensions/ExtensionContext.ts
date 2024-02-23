import type { Item } from "./items"

export interface ExtensionContext {
    display: (items: Item[]) => Promise<void>
    hide: (id: string) => void
    term: string
    update: (id: string, item: Item) => void
    actions: {
        copyToClipboard: (text: string) => Promise<void>,
        hideWindow: () => Promise<void>,
        open: (url: string) => Promise<void>,
        reveal: (path: string) => Promise<void>,
        replaceTerm: (term: string) => void
    }
}
