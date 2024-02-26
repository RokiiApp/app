import { ExtensionContext } from '@rokii/api'

type RunFn = (context: ExtensionContext) => Promise<void>
type ExtensionSettings = Record<string, Setting>

export class Extension {
  icon: string
  name: string
  run: RunFn
  settings?: ExtensionSettings
  private initialize?: (settings: ExtensionSettings) => void
  private initializeAsync?: (callback: any, settings: ExtensionSettings) => Promise<void>
  private onMessage?: (data: unknown) => void
  apps?: Record<string, RunFn>

  constructor(module: any) {
    // TODO - check if the module is a valid extension (use ZOD?)

    if (!this.isValidExtension(module)) {
      throw new Error('Invalid extension module')
    }

    this.icon = module.icon
    this.name = module.name
    this.run = module.run
    this.settings = module.settings
    this.initialize = module.initialize
    this.initializeAsync = module.initializeAsync
    this.onMessage = module.onMessage
    this.apps = module.apps
  }

  getApp(name: string): RunFn | undefined {
    return this.apps?.[name]
  }

  init(savedSettings: Record<string, any>) {
    const userSettings = this.consolidateSettings(savedSettings)
    // Foreground plugin initialization
    if (this.initialize) {
      console.log('Initialize sync extension', this.name)

      try {
        this.initialize(userSettings)
      } catch (e) {
        console.error(`Failed to initialize extension: ${this.name}`, e)
      }
    }

    // Background plugin initialization
    if (this.initializeAsync) {
      console.log(`[initializeAsync:${this.name}] - Calling initializeAsync function`)

      const asyncCallback = (data: unknown) => {
        if (this.onMessage) {
          console.log(`[initializeAsync:${this.name}] - Calling onMessage function`)
          this.onMessage(data)
        }
      }

      this.initializeAsync(asyncCallback, userSettings)
    }

    return userSettings
  }

  private isValidExtension(module: any): module is Extension {
    if (!module) return false
    const hasIcon = typeof module.icon === 'string'
    const hasName = typeof module.name === 'string'
    const hasRunFunction = typeof module.run === 'function'
    return hasIcon && hasName && hasRunFunction
  }

  /**
   * This function merges the saved settings with the default settings.
   */
  private consolidateSettings(savedSettings: Record<string, any>) {
    if (!this.settings) return {}

    const userSettings: Record<string, any> = {}

    // TODO - Use zod to validate the settings
    for (const settingInfo of Object.values(this.settings)) {
      const { id, defaultValue } = settingInfo
      userSettings[id] = savedSettings[id] || defaultValue
    }

    return userSettings
  }
}

type BaseSetting = {
  id: string
  label: string
  description?: string
}

type BooleanSetting = {
  type: 'boolean'
  defaultValue: boolean
} & BaseSetting

type StringSetting = {
  type: 'string'
  defaultValue: string
} & BaseSetting

type NumberSetting = {
  type: 'number'
  defaultValue: number
} & BaseSetting

export type Setting = BooleanSetting | StringSetting | NumberSetting
