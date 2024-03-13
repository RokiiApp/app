import { NpmClient } from '@/services/NpmClient'
import { PLUGINS_PACKAGE_JSON_PATH, PLUGINS_PATH, ROKII_PATH } from '@/common/constants/paths'
import { exists } from '@tauri-apps/api/fs'
import { ensureFile, ensureDir } from '@/utils/file-system'

const EMPTY_PACKAGE_JSON = JSON.stringify(
  {
    name: 'rokii-plugins',
    dependencies: {}
  },
  null,
  2
)

export const ensureRokiNeededFiles = async () => {
  await exists(ROKII_PATH)
  await ensureDir(PLUGINS_PATH)
  ensureFile(PLUGINS_PACKAGE_JSON_PATH, EMPTY_PACKAGE_JSON)
}

export const client = new NpmClient(PLUGINS_PATH)
