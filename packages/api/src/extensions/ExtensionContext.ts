import type { Item } from "./items"

export interface ExtensionContext {
    display: (items: Item[]) => Promise<void>
    hide: (id: string) => void
    term: string
    update: (id: string, item: Item) => void
    actions: {
        replaceTerm: (term: string) => void
    }
}
