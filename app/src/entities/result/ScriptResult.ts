import type { ScriptItem } from '@rokii/api'
import { Result } from './Result'

/**
 * A Result that runs a script when selected
 * 
 */
export class ScriptResult extends Result {
    script: ScriptItem['run']
  
    constructor(action: ScriptItem, extensionName: string) {
      super(action, extensionName)
  
      this.script = action.run
    }
  
    async onSelect(e: Event | React.SyntheticEvent) {
      this.script(e)
  
      await super.onSelect(e)
    }
}
