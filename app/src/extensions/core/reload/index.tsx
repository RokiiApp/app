import type { Action, ExtensionModule } from '@/extensions/types'
import { relaunch } from '@tauri-apps/api/process'
import icon from '../icon.png'

const keywords = ['reload', 'restart', 'relaunch']
const name = 'Reload'

const reloadAction: Action = {
  type: 'script',
  title: 'Reload',
  subtitle: 'Reload RoKii',
  icon,
  run: async () => await relaunch()
}

const ReloadExtension: ExtensionModule = {
  icon,
  name,
  run: async ({ display }) => display([reloadAction])
}

export default ReloadExtension
