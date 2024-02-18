import { memo } from 'react'
import { FileIcon } from '../FileIcon'
import FontAwesome from 'react-fontawesome'

/**
 * Check if provided string is an image src
 * It can be a path to png/jpg/svg image or data-uri
 */
const isImage = (path: string) => !(path.match(/(^data:)|(\.(png|jpe?g|svg|ico)$)/) == null)

/**
 * Check if provided string matches a FontAwesome icon
 */
const isFontAwesome = (path: string) => path.match(/^fa-(.+)$/)

/**
 * This component renders:
 *   – if `options.path` is an image this image will be rendered. Supported formats are:
 *     png, jpg, svg and icns
 *   - otherwise it will render icon for provided path, that you can see in Finder
 */
const SmartIconComponent = ({ className, path }: { className?: string, path: string }) => {
  const fontAwesomeMatches = isFontAwesome(path)

  if (fontAwesomeMatches != null) {
    const name = fontAwesomeMatches[1]
    return <FontAwesome name={name} size="2x" className={className} />
  }

  return (
    isImage(path)
      ? <img src={path} alt={path} className={className} />
      : <FileIcon path={path} className={className} />
  )
}
export const SmartIcon = memo(SmartIconComponent)
