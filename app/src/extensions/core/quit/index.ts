import { ScriptItem, ExtensionModule } from '@rokii/api'
import { exit } from '@tauri-apps/api/process'
import icon from '../icon.png'

const item = new ScriptItem({
  icon,
  title: 'Quit',
  subtitle: 'Quit from RoKii',
  run: async () => await exit(),
  keyword: ['quit', 'exit']
})

const QuitExtension: ExtensionModule = {
  name: 'Quit',
  run: ({ display }) => display([item]),
  icon
}

export default QuitExtension
