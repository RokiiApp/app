import { ScriptItem, type ExtensionModule } from '@rokii/api'
import { relaunch } from '@tauri-apps/api/process'
import icon from '../icon.png'

const reloadAction = new ScriptItem({
  title: 'Reload',
  subtitle: 'Reload RoKii',
  icon,
  run: async () => await relaunch(),
  keyword: ['reload', 'restart', 'relaunch']
})

const ReloadExtension: ExtensionModule = {
  icon,
  name: 'Reload',
  run: ({ display }) => display([reloadAction])
}

export default ReloadExtension
