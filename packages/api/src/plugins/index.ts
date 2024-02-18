import type { SelectEvent } from '../events/index'
import type { SettingsHandler } from '../settings/index'

export interface PluginResult {
  /**
     * Title of your result
     */
  title?: string

  /**
     * Subtitle of your result
     */
  subtitle?: string

  /**
     * Icon, that is shown near your result.
     *
     * It can be absolute URL to external image,
     * absolute path to local image or base64-encoded data-uri.
     *
     * For local icons you can use path to some .app file,
     * i.e. `/Applications/Calculator.app` will render default icon for Calculator application.
     */
  icon?: string

  /**
     * Use this field when you need to update your result dynamically
     */
  id?: string

  /**
     * Autocomplete for your result. So, user can update search term using tab button;
    */
  term?: string

  /**
     * Text, that will be copied to clipboard using cmd+c, when your result is focused;
     */
  clipboard?: string

  /**
     * Function that returns preview for your result.
     * Preview can be an html string or React component
     */
  getPreview?: () => React.ReactElement | null

  /**
     * Action, that should be executed when user selects your result.
     *
     * If you don't want to close main window after your action,
     * you should call `event.preventDefault()` in your action.
     */
  onSelect?: (event: SelectEvent) => void

  /**
     * Handle keyboard events when your result is focused, so you can do custom actions.
     *
     * To prevent default behavior, you should call `event.preventDefault()` in your action.
     */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void

  /**
     * The order in which the results will be displayed. The lower the number,
     * the higher up the result will be displayed.
     */
  order?: number

}

export interface PluginContext {
  /**
     * A function that can be called to display the results of the plugin.
     */
  display: (result: PluginResult | PluginResult[]) => void
  /**
     * The input term that the user has entered.
     */
  term: string

  /**
     * Two methods to retrieve and update the settings of the plugin.
     */
  config: SettingsHandler

  /**
     * Hide result from results list by id.
     * You can use it to remove temporar results, like "loading..." placeholder
     */
  hide: (id: string) => void

  update: (id: string, result: PluginResult) => void

  actions: {
    open: (url: string) => void
    reveal: (path: string) => void
    copyToClipboard: (text: string) => void
    hideWindow: () => void
    replaceTerm: (term: string) => void
  }

  /**
     * An object containing the settings for the plugin.
     */
  settings: Record<string, any>
}

/**
 * The structure of a plugin module. This is the module that is loaded by the
 * plugin loader.
 */
export interface PluginModule {
  /**
     * The function that is called every time the user enters a new term.
     */
  fn: (context: PluginContext) => void | Promise<void>

  /**
     * This field is used for autocomplete. The plugin will only be called if the keyword matches.
     */
  keywords?: string[]

  /**
     * Used for autocomplete and shown as title in results list if no result title is provided.
     */
  name?: string

  /**
     * Use this function, when you need to prepare some data for your plugin on start.
     * If you need to do some long-running processes, check `initializeAsync`
     */
  initialize?: ((settings: Record<string, any>) => void)

  /**
     * Use this function when you need to execute some long-running initializer process.
     *
     * This function will be executed in another process and you can receive
     * results using `onMessage` function.
     */
  initializeAsync?: (callback: (data: any) => void, settings: Record<string, any>) => void | Promise<void>

  /**
     * Use this function to receive data back from your initializeAsync function.
     */
  onMessage?: ((message: unknown) => void)

  settings?: Record<string, any>

  /**
     * A default icon that will be used when you plugin appears in the autocomplete list.
     */
  icon?: string

}
