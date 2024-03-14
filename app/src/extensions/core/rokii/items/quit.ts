import { ScriptItem } from "@rokii/api";
import { AppManager } from "@/services/AppManager";

export const quit = new ScriptItem({
    title: 'Quit',
    subtitle: 'Quit from RoKii',
    run: () => AppManager.exit(),
    keyword: ['quit', 'exit']
})
