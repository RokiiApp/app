import { client } from "@/services/plugins";
import { InfoItem, Item, ScriptItem } from "@rokii/api";
import * as format from '../utils/format';
import { PluginInfo } from "../types";

export const pluginToResult = (plugin: PluginInfo | string): Item => {
    if (typeof plugin === 'string') {
        return new InfoItem({ title: plugin, id: plugin })
    };

    const title = `${format.name(plugin.name)}`;
    const subtitle = format.version(plugin);

    return new ScriptItem({
        title,
        subtitle,
        id: plugin.name,
        run: () => {
            client.installPackage(plugin.name)
        }
    })
};
