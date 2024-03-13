import { ScriptItem } from "@rokii/api";
import { exit } from '@tauri-apps/plugin-process'

export const quit = new ScriptItem({
    title: 'Quit',
    subtitle: 'Quit from RoKii',
    run: async () => await exit(),
    keyword: ['quit', 'exit']
})
