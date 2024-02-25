import type { ExtensionModule } from '@rokii/api'
import AppsExplorerExtension from './apps-explorer'
import QuitExtension from './quit'
import ReloadExtension from './reload'
import SettingsExtension from './settings'
import VersionExtension from './version'
import ExtensionsManagerExtension from './extensions-manager'

const coreExtensions: Record<string, ExtensionModule> = {
  AppsExplorerExtension,
  ExtensionsManagerExtension,
  QuitExtension,
  ReloadExtension,
  SettingsExtension,
  VersionExtension
}

Object.freeze(coreExtensions)

export { coreExtensions }
