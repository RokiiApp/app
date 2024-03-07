import { client } from "@/services/plugins";
import { Item, ScriptItem } from "@rokii/api";
import * as format from '../utils/format';
import { PluginInfo } from "../types";

export const pluginToResult = (plugin: PluginInfo, category: string): Item => {
    const title = `${format.name(plugin.name)}`;
    const subtitle = format.version(plugin);

    return new ScriptItem({
        title,
        subtitle,
        group: category,
        id: plugin.name,
        run: () => {
            client.installPackage(plugin.name)
        }
    })
};
