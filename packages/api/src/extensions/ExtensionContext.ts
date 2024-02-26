import type { Item } from "./items"

/**
 * The context that is provided to the extension when it is executed.
 * This context provides the extension with the input term, and a function that can be called to display the results of the extension.
 * 
 */
export interface ExtensionContext {
    /**
     * A function that can be called to display the results of the extension.
     */
    display: (items: Item[]) => Promise<void>
    /**
     * Hide result from results list by id.
     * You can use it to remove temporar results, like "loading..." placeholder
     */
    hide: (id: string) => void
    /**
     * The input term that the user has entered.
     */
    term: string
    update: (id: string, item: Item) => void
    /**
     * Common actions that the extension can perform.
     */
    actions: {
        /**
         * Copy the given text to the clipboard.
         */
        copyToClipboard: (text: string) => Promise<void>,
        /**
         * Hide the Rokii window.
         */
        hideWindow: () => Promise<void>,
        /**
         * Open the given URL in the default browser.
         */
        open: (url: string) => Promise<void>,
        /**
         * Open the given path in the file explorer.
         */
        reveal: (path: string) => Promise<void>,
        /**
         * Replace the current term with the given term.
         */
        replaceTerm: (term: string) => void
    },
    /**
     * An object containing the settings for the extension.
     */
    settings: Record<string, any>
}
