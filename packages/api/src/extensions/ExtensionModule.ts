import type { ExtensionContext } from "./ExtensionContext"

export interface ExtensionModule {
    icon: string
    name: string
    run: (context: ExtensionContext) => Promise<void>
    settings?: any
    initialize?: (...args: any[]) => void
    initializeAsync?: (...args: any[]) => Promise<void>
    onMessage?: (data: unknown) => void
    apps?: Record<string, (context: ExtensionContext) => Promise<void>>
}
