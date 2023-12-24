import type { PluginModule } from '@rokii/types';
import icon from '../icon.png';
import { exit } from '@tauri-apps/api/process';

export const name = 'Quit';
export const keywords = ['quit', 'exit'];

export const fn: PluginModule['fn'] = ({ display }) => {
  display({
    icon,
    title: name,
    subtitle: 'Quit from RoKii',
    onSelect: () => exit()
  });
};
