import { ScriptItem, ExtensionModule } from '@rokii/api'
import { exit } from '@tauri-apps/api/process'
import icon from '../icon.png'

export const name = 'Quit'
export const keywords = ['quit', 'exit']

export const run: ExtensionModule['run'] = async ({ display }) => {
  const action = new ScriptItem({
    icon,
    title: 'Quit',
    subtitle: 'Quit from RoKii',
    run: async () => await exit()
  })

  display([action])
}

const QuitExtension: ExtensionModule = {
  name,
  run,
  icon
}

export default QuitExtension
