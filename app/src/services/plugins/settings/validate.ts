import type { Extension } from '@/extensions/Extension'

const VALID_TYPES = ['string', 'number', 'bool', 'option'] as const

const validSetting = ({ type, options }: any) => {
  // General validation of settings
  if (!type || !VALID_TYPES.includes(type)) return false

  // Type-specific validations
  if (type === 'option') return Array.isArray(options) && options.length

  return true
}

export const validate = ({ settings }: Extension) => {
  if (!settings) return true
  return Object.values(settings).every(validSetting)
}
