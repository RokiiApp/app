import { AppItem, ExtensionModule } from '@rokii/api'
import icon from '../icon.png'
import { initializeAsync } from './initializeAsync'
import { ExtensionManagerApp } from './ExtensionsManagerApp';

const managerLauncherAction = new AppItem({ title: 'Manage extensions', appName: ExtensionManagerApp.id, icon })

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions',
  icon,
  initializeAsync,
  run: ({ display }) => display([managerLauncherAction]),
  apps: [ ExtensionManagerApp ]
}

export default ExtensionsManagerExtension
