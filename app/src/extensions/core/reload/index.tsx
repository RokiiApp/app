import { ScriptItem, type ExtensionModule } from '@rokii/api'
import { relaunch } from '@tauri-apps/api/process'
import icon from '../icon.png'

const keywords = ['reload', 'restart', 'relaunch']
const name = 'Reload'

const reloadAction = new ScriptItem({
  title: 'Reload',
  subtitle: 'Reload RoKii',
  icon,
  run: async () => await relaunch(),
  keyword: keywords
})

const ReloadExtension: ExtensionModule = {
  icon,
  name,
  run: async ({ display }) => display([reloadAction])
}

export default ReloadExtension
