import { ScriptItem, type ExtensionModule } from '@rokii/api'
import { navigate } from 'wouter/use-hash-location'
import icon from '../icon.png'

const navigationItem = new ScriptItem({
  title: 'Open Settings',
  icon,
  run: (e) => {
    // Avoid hiding the rokii window
    e.preventDefault()
    navigate('/settings')
  },
  keyword: ['RoKii Preferences', 'cfg', 'config', 'params']
})

/**
 * Extension to show settings option in results list
 */
const SettingsExtension: ExtensionModule = {
  icon,
  name: 'Rokii Settings',
  run: ({ display }) => display([navigationItem])
}

export default SettingsExtension
