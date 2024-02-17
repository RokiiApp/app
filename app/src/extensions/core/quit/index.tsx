import icon from '../icon.png'
import { exit } from '@tauri-apps/api/process'
import { Action, ExtensionModule } from '@/extensions/types'

export const name = 'Quit'
export const keywords = ['quit', 'exit']

export const run: ExtensionModule['run'] = async ({ display }) => {
  const action: Action = {
    type: 'script',
    icon,
    title: 'Quit',
    subtitle: 'Quit from RoKii',
    run: async () => await exit()
  }

  display([action])
}

const QuitExtension: ExtensionModule = {
  name,
  run,
  icon
}

export default QuitExtension
