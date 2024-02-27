export const CHANNELS = {
  ClearInput: 'clear-input',
  ShowTerm: 'show-term',
  FocusInput: 'focus-input',
  FocusPreview: 'focus-preview'
} as const

export type FocusableChannel = typeof CHANNELS.FocusInput | typeof CHANNELS.FocusPreview

export interface ChannelInterfaces {
  [CHANNELS.ClearInput]: undefined
  [CHANNELS.ShowTerm]: string
  [CHANNELS.FocusInput]: undefined
  [CHANNELS.FocusPreview]: undefined
}

export type ChannelInterfacesWithoutNeccesaryArgs = {
  [K in keyof ChannelInterfaces]: ChannelInterfaces[K] extends undefined ? K : never;
}[keyof ChannelInterfaces]

export type ChannelInterfacesWithNeccesaryArgs = {
  [K in keyof ChannelInterfaces]: ChannelInterfaces[K] extends undefined ? never : K;
}[keyof ChannelInterfaces]

