import { ExtensionContext } from '@rokii/api'

type RunFn = (context: ExtensionContext) => Promise<void>

export class Extension {
  icon: string
  name: string
  run: RunFn
  settings?: any
  initialize?: (...args: any[]) => void
  initializeAsync?: (...args: any[]) => Promise<void>
  onMessage?: (data: unknown) => void
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

  private isValidExtension(module: any): module is Extension {
    if (!module) return false
    const hasIcon = typeof module.icon === 'string'
    const hasName = typeof module.name === 'string'
    const hasRunFunction = typeof module.run === 'function'
    return hasIcon && hasName && hasRunFunction
  }
}
