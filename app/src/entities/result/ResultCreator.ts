import { Result } from './Result'
import { ScriptResult } from './ScriptResult'
import { AppResult } from './AppResult'
import { InfoResult } from './InfoResult'
import { AppItem, Item, ItemTypes, ScriptItem } from '@rokii/api'

function isScriptItem(action: Item): action is ScriptItem {
    return action.type === ItemTypes.SCRIPT
  }
  
  function isAppItem(action: Item): action is AppItem {
    return action.type === ItemTypes.APP
  }

/**
 * This class is responsible for creating the correct result based on the item
 * provided by the extension.
 */
export class ResultCreator {
    static create(action: Item, extensionName: string): Result {
      if (isScriptItem(action)) {
        return new ScriptResult(action, extensionName)
      }
  
      if (isAppItem(action)) {
        return new AppResult(action, extensionName)
      }
  
      return new InfoResult(action, extensionName)
    }
  }
