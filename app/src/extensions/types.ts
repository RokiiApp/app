export type ActionType = 'script' | 'app' | 'info'

export interface ExtensionContext {
  display: (actions: Action[]) => Promise<void>
  hide: (id: string) => void
  term: string
  update: (id: string, action: Action) => void
  actions: {
    replaceTerm: (term: string) => void
  }
}

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

export interface ScriptAction {
  type: 'script'
  run: (e: Event | React.SyntheticEvent) => void | Promise<void>
}

interface AppAction {
  type: 'app'
  appName: string
}

interface InfoAction {
  type: 'info'
}

export type Action = {
  /**
     * An unique identifier for the action, if not provided, it will be generated
     * Used to update or remove the action from the store
     */
  id?: string
  title: string
  subtitle?: string
  type: ActionType
  keyword?: string[]
  /**
     * The text that will replace the current input when the user uses the tab key
     * If not provided, the title will be used
     */
  autocomplete?: string
  /**
     * The icon to be displayed in the action
     * If not provided, the extension icon will be used
     * If the extension icon is not provided, the default icon will be used
     */
  icon?: string
} & (ScriptAction | AppAction | InfoAction)
