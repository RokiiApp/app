import type { Item } from "./items"

/**
 * Rokii provides the extensions with a context that contains relevant
 * information about the current state of the application.
 * 
 * The context is provided every time the extension is executed.
 * 
 * Some of the information provided in the context includes:
 * - The input term that the user has entered.
 * - A function that can be called to display the results of the extension.
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
    /**
     * A function that can be called to update the results of the extension.
     * @param id A unique identifier for the item.
     * @param item The item that will replace the current item.
     */
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
     * An object containing the user settings for the extension.
     */
    settings: Record<string, any>
}
