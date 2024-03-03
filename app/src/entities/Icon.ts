
import defaultIcon from '@/extensions/core/icon.png'
/**
 * A base64 encoded image that represents an icon.
 * 
 * If the icon is not provided, the default icon will be used.
 */
export type Icon = string

export const ensureIcon = (icon: any): Icon => {
    if (typeof icon === 'string' && icon.length > 0) {
        return icon
    }
    return defaultIcon
}
