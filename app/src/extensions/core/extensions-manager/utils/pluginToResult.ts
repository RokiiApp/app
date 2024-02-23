import { client } from "@/services/plugins";
import { ScriptItem } from "@rokii/api";
import * as format from '../utils/format';
import { PluginInfo } from "../types";

export const pluginToResult = (plugin: PluginInfo | string): ScriptItem => {
    if (typeof plugin === 'string') {
        return new ScriptItem({
            title: plugin,
            id: plugin,
            run: () => {
                client.installPackage(plugin)
            }
        })
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
