import { invoke } from '@tauri-apps/api/core'
import memoize from 'just-memoize'

/**
 * Get system icon for file
 * @param filePath File path
 */

const getFileIcon = async (filePath: string) => {
  const nativeIconBytes = await invoke<ArrayBuffer>('get_file_icon', { filePath })

  const arrayBufferView = new Uint8Array(nativeIconBytes)

  const imageBlob = new Blob([arrayBufferView], { type: 'image/png' })

  return URL.createObjectURL(imageBlob)
}

export default memoize(getFileIcon)
