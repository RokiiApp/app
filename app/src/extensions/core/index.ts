import type { ExtensionModule } from '@rokii/api'
import AppsExplorerExtension from './apps-explorer'
import ExtensionsManagerExtension from './extensions-manager'
import RokiiExtension from './rokii'

const coreExtensions: Record<string, ExtensionModule> = {
  RokiiExtension,
  AppsExplorerExtension,
  ExtensionsManagerExtension
}

Object.freeze(coreExtensions)

export { coreExtensions }
