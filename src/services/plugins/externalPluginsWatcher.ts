import { watchImmediate } from "tauri-plugin-fs-watch-api";
import debounce from "just-debounce"
import { pluginSettings } from '@/services/plugins';
import { PLUGINS_PATH } from "@/common/constants/paths";
import { isPluginValid, requirePlugin } from "./requirePlugin";
import { pluginsManager } from "@/extensions/PluginsManager";

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

      pluginsManager.deletePlugin(pluginName);

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

const loadPlugin = async (pluginName: string): Promise<boolean> => {
  console.group(`[PluginLoader] Load plugin: ${pluginName}`);
  const plugin = await requirePlugin(pluginName);

  if (!plugin || !isPluginValid(plugin)) {
    console.error('[PluginLoader] Plugin is not valid, skipped');
    console.groupEnd();
    return;
  }

  if (!pluginSettings.validate(plugin)) {
    console.error('[PluginLoader] Invalid plugins settings');
    console.groupEnd();
    return;
  }

  console.log('[PluginLoader] Plugin loaded.');

  await pluginsManager.requestPluginLoad(pluginName);

  console.log(`[PluginLoader]: Added "${pluginName}" plugin`)
  console.groupEnd();
}

const debouncedLoadPlugin = debounce(loadPlugin, 100)
