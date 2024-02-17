import { EventCallback, TauriEvent, UnlistenFn, emit, listen } from '@tauri-apps/api/event';
import {
  ChannelInterfacesWithoutNeccesaryArgs,
  ChannelInterfacesWithNeccesaryArgs,
  ChannelInterfaces,
  CHANNELS
} from './constants/events';

/**
 * A helper function to send messages between the main and renderer processes
 */
export function send<T extends ChannelInterfacesWithNeccesaryArgs>(channel: T, info: ChannelInterfaces[T]): void
export function send<T extends ChannelInterfacesWithoutNeccesaryArgs>(channel: T): void
export function send(channel: keyof typeof CHANNELS, info?: any) {
  emit(channel, info);
}

/**
 * A helper function to listen to messages between the main and renderer processes
 */
export async function on<T extends ChannelInterfacesWithNeccesaryArgs>(channel: T, listener: EventCallback<ChannelInterfaces[T]>): Promise<UnlistenFn>
export async function on<T extends ChannelInterfacesWithoutNeccesaryArgs>(channel: T, listener: EventCallback<ChannelInterfaces[T]>): Promise<UnlistenFn>
export async function on<T extends TauriEvent>(channel: T, listener: EventCallback<T>): Promise<UnlistenFn>

export async function on<T extends keyof ChannelInterfaces>(channel: T, listener: EventCallback<ChannelInterfaces[]>) {
  return listen(channel, listener);
}
