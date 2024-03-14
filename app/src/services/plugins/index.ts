import { NpmClient } from '@/services/NpmClient'
import { FileSystem } from '@/services/FileSystem'
import { PLUGINS_PACKAGE_JSON_PATH, PLUGINS_PATH, ROKII_PATH } from '@/common/constants/paths'
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
  await FileSystem.exists(ROKII_PATH)
  await ensureDir(PLUGINS_PATH)
  ensureFile(PLUGINS_PACKAGE_JSON_PATH, EMPTY_PACKAGE_JSON)
}

export const client = new NpmClient(PLUGINS_PATH)
