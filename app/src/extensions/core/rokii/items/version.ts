import { InfoItem } from "@rokii/api"
import { getVersion } from '@tauri-apps/api/app'

const appVersion = await getVersion()

export const version = new InfoItem({ title: 'Rokii Version', subtitle: appVersion })
