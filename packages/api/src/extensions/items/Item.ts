import { ItemTypes } from "."

/**
 * An item is a piece of information that can have an action associated with it.
 * 
 * Each time a user types something in the search bar, Rokii will search for items
 * and display them in the search results.
 * 
 * Some items are interactive and can be clicked or selected by the user.
 * When an item is selected they can
 * - Run a script in the background. See {@link ScriptItem}
 * - Run an App. See {@link AppItem}
 */
export class Item {
  /**
   * An unique identifier for the result in your extension scope (other extensions can have the same id)
   * Used to update or remove the action from the store
   * If not provided, the title will be used.
   */
  readonly id: string
  /**
   * The title of the result
   * Must be unique if you don't provide an id
   */
  title: string
  subtitle: string
  readonly type: ItemTypes = ItemTypes.INFO
  keyword: string[] = []
  autocomplete: string
  icon?: string

  constructor(action: ItemParams) {
    this.id = action.id || action.title
    this.title = action.title
    this.subtitle = action.subtitle || ''
    this.keyword = action.keyword || []
    this.autocomplete = action.autocomplete || action.title
    this.icon = action.icon
  }
}

export type ItemParams = {
  /**
    * An unique identifier for the result, if not provided, it will be generated
    * Used to update or remove the action from the store
    */
  id?: string
  title: string
  subtitle?: string
  keyword?: string[]
  /**
    * The text that will replace the current input when the user uses the tab key
    * If not provided, the title will be used
    */
  autocomplete?: string
  /**
    * The icon to be displayed in the result
    * If not provided, the extension icon will be used
    * If the extension icon is not provided, the default icon will be used
    */
  icon?: string
}
