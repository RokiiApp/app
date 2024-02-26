import { ExtensionModule } from '@rokii/api'

/**
 * The native Extension class extends the ExtensionModule interface and provides a class-based implementation of the interface.
 * This is used as a bridge between the extension module and the Rokii application.
 * 
 * We use this class to ensure that the extension module is valid and to provide a
 * consistent interface for the Rokii application to interact with the extension.
 * 
 * The class also provides a method to initialize the extension with the user settings.
 * 
 */
export class Extension implements ExtensionModule {
  icon;
  name;
  run;
  settings;
  initialize;
  initializeAsync;
  onMessage;
  apps;

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

  getApp(name: string) {
    return this.apps?.[name]
  }

  init(savedSettings: Record<string, any> = {}) {
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

  private isValidExtension(module: any): module is ExtensionModule {
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
