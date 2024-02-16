import { watchImmediate } from "tauri-plugin-fs-watch-api";
import debounce from "just-debounce"
import { extensionSettings } from '@/services/plugins';
import { PLUGINS_PATH } from "@/common/constants/paths";
import { requireExtension } from "./requireExtension";
import { extensionsManager } from "@/extensions/manager/ExtensionsManager";

const parse = (path: string) => {
  const pathAsUrl = new URL(path);

  const dir = pathAsUrl.pathname.split("/")
  const base = dir.pop() || ""

  return { dir: dir.join("/"), base }
}


/* As we support scoped plugins, using 'base' as plugin name is no longer valid
  because it is not unique. '@example/plugin' and '@test/plugin' would both be treated as 'plugin'
  So now we must introduce the scope to the plugin name
  This function returns the name with the scope if it is present in the path
*/
const getPluginName = (pluginPath: string) => {
  const { base, dir } = parse(pluginPath);
  const scope = dir.match(/@.+$/);
  if (!scope) return base;
  return `${scope[0]}/${base}`;
};

export const setupPluginsWatcher = async () => {
  watchImmediate(PLUGINS_PATH, (event) => {
    const { type, paths } = event;

    if (type === "any " || type === "other") return

    if ("remove" in type) {
      const pluginPath = paths[0]
      const { dir } = parse(pluginPath);

      if (!dir.match(/plugins$/)) return;

      const pluginName = getPluginName(pluginPath);

      extensionsManager.deletePlugin(pluginName);

      console.log(`[PluginsWatcher]: Removed "${pluginName}" plugin`);
    }

    if ("modify" in type) {
      const pluginPath = paths[0]
      const { dir, base } = parse(pluginPath);

      if (!dir.match(/plugins$/) || base.match(/package.json$/)) return;


      const pluginName = getPluginName(pluginPath);

      console.log(`[PluginsWatcher]: Plugin "${pluginName}" changed. Reloading...`);

      debouncedLoadPlugin(pluginName);

      console.log(event)
    }
  }, { recursive: true });
};

const loadExtension = async (pluginName: string): Promise<boolean> => {
  console.group(`[ExtensionLoader] Load extension: ${pluginName}`);
  const extension = await requireExtension(pluginName);

  if (!extension) {
    console.error('[ExtensionLoader] Extension is not valid, skipped');
    console.groupEnd();
    return;
  }

  if (!extensionSettings.validate(extension)) {
    console.error('[ExtensionLoader] Invalid extension settings');
    console.groupEnd();
    return;
  }

  console.log('[ExtensionLoader] Extension loaded.');

  await extensionsManager.requestPluginLoad(pluginName);

  console.log("[ExtensionLoader]: Added extension: ", pluginName)
  console.groupEnd();
}

const debouncedLoadPlugin = debounce(loadExtension, 100)
