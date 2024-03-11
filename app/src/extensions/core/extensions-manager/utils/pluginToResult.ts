import { client } from "@/services/plugins";
import { Item, ScriptItem } from "@rokii/api";
import * as format from '../utils/format';
import { ExtensionInfo } from "../types";

export const pluginToResult = (extension: ExtensionInfo, category: string): Item => {
    const title = format.name(extension.name);
    const subtitle = format.version(extension);

    return new ScriptItem({
        title,
        subtitle,
        group: category,
        id: extension.name,
        run: () => {
            client.installPackage(extension.name)
        }
    })
};
