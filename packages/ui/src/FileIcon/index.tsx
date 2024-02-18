import { useEffect, useState, memo } from 'react'
import getFileIcon from './getFileIcon'

/**
 * Render icon for provided path.
 * It will render the same icon, that you see in Finder
 *
 */
const FileIconComponent = ({ className, path }: { className?: string, path: string }) => {
  const [icon, setIcon] = useState<string | null>(null)

  useEffect(() => {
    getFileIcon(path).then(setIcon)
  }, [path])

  if (!icon) {
    return null
  }

  return <img src={icon} alt="" className={className} />
}

export const FileIcon = memo(FileIconComponent)
