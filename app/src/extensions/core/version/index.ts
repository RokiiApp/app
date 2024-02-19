import { InfoItem, type ExtensionModule } from "@rokii/api"
import { getVersion } from '@tauri-apps/api/app'
import icon from '../icon.png'

const version = await getVersion()

const versionAction = new InfoItem({ title: 'Rokii Version', subtitle: version })

const VersionExtension: ExtensionModule = {
  name: 'Version',
  icon,
  run: async ({ display }) => display([versionAction])
}

export default VersionExtension
