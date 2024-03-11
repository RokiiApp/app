import type { Setting } from ".."
import type { ExtensionContext, App } from ".."
export interface ExtensionModule {
    /**
     * A base64 encoded string of the icon for the extension.
     * 
     */
    icon: string
    /**
     * The name of the extension.
     * 
     * This name will be displayed in the extension list, and will be used to identify the extension in the settings.
     */
    name: string
    /**
     * The entry point for the extension. This function will be called to execute the extension.
     */
    run: (context: ExtensionContext) => Promise<void>
    /**
     * The settings for the extension.
     * 
     * This is a WIP, and will be used to provide the extension with settings from the user.
     */
    settings?: Record<string, Setting>
    /**
     * A function that will be called when the extension is initialized.
     * It will be called synchronously, before the extension is executed.
     * 
     * For long running tasks, use {@link initializeAsync} instead.
     * 
     */
    initialize?: (settings: Record<string, any>) => void
    /**
     * 
     * @param callback The function you can use to send data to the {@link onMessage} method.
     * @param settings The user settings for the extension.
     */
    initializeAsync?: (callback: (data: unknown) => void, settings: Record<string, any>) => Promise<void>

    /**
     * This method will be called when the initializeAsync method calls the callback.
     * This is useful to retrieve data for the extension after performing long running tasks.
     * 
     * @param data The data sent by the {@link initializeAsync} method.
     * 
     */
    onMessage?: (data: unknown) => void

    /**
     * A list of apps that the extension provides.
     * 
     * Apps are a way to group multiple extension results together.
     * They are shown in a separate page with a private results list.
     */
    apps?: App[]
}
