import { AppItem, ExtensionModule } from '@rokii/api'
import icon from '../icon.png'
import { initializeAsync } from './initializeAsync'
import { ExtensionsManagerApp, onMessage } from './ExtensionsManagerApp';

const extensionAppName = "Manager"
const managerLauncherAction = new AppItem({ title: 'Manage extensions', appName: extensionAppName, icon })

const ExtensionsManagerExtension: ExtensionModule = {
  name: 'Extensions',
  icon,
  initializeAsync,
  run: ({ display }) => display([managerLauncherAction]),
  onMessage,
  apps: {
    [extensionAppName]: ExtensionsManagerApp
  }
}

export default ExtensionsManagerExtension
