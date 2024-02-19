import { CHANNELS } from '@/common/constants/events'
import { send } from '@/common/ipc'
import { AppItem, Item, ItemTypes, ScriptItem } from '@rokii/api'
import { appWindow } from '@tauri-apps/api/window'
import { navigate } from 'wouter/use-hash-location'

export class ResultCreator {
  static create(action: Item, extensionName: string): Result {
    if (action instanceof ScriptItem) {
      return new ScriptActionResult(action, extensionName)
    }

    if (action instanceof AppItem) {
      return new AppActionResult(action, extensionName)
    }

    return new InfoResult(action, extensionName)
  }
}

export class Result {
  extension: string
  title: string
  subtitle: string
  icon: string
  autocomplete: string
  readonly id: string

  constructor(action: Item, extensionName: string) {
    this.title = action.title
    this.subtitle = action.subtitle || ''
    this.icon = action.icon || ''
    this.extension = extensionName
    this.autocomplete = action.autocomplete || action.title
    this.id = action.id || crypto.randomUUID()
  }

  // TODO: Check this because the script method might not be available when updated
  update(newAction: Item) {
    this.title = newAction.title
    this.subtitle = newAction.subtitle || ''
    this.icon = newAction.icon || ''

    return this
  }

  async onSelect(e: Event | React.SyntheticEvent) {
    if (e.defaultPrevented) return
    send(CHANNELS.ClearInput)
    await appWindow.hide()
  };
}

/**
 * A factory of results
 */
class InfoResult extends Result {
  async onSelect() { };
}

class ScriptActionResult extends Result {
  script: ScriptItem['run']

  constructor(action: ScriptItem, extensionName: string) {
    super(action, extensionName)

    if (action.type !== ItemTypes.SCRIPT) {
      throw new Error('Invalid action type')
    }

    this.script = action.run
  }

  async onSelect(e: Event | React.SyntheticEvent) {
    this.script(e)

    await super.onSelect(e)
  }
}

class AppActionResult extends Result {
  appName: string

  constructor(action: AppItem, extensionName: string) {
    super(action, extensionName)

    if (action.type !== ItemTypes.APP) {
      throw new Error('Invalid action type')
    }

    this.appName = action.appName
  }

  async onSelect() {
    navigate(`/app/${this.extension}/${this.appName}`)
  }
}
