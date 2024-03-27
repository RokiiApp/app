import { App, Item } from '@rokii/api'

import { categorizeExtensions } from './utils/categorizePlugins';
import { pluginToResult } from './utils/pluginToResult';
import { ExtensionInfo } from './types';
import { getPlugins } from './utils/loadPlugins';

export const AppRun: App<ExtensionInfo[]>["run"] = async ({ display }, extensions) => {
    const categorizeResult = categorizeExtensions(extensions);
  
    const results: Item[] = []
  
    for (let [category, plugins] of Object.entries(categorizeResult) ){
      const resultsForCategory = plugins.map(plugin => pluginToResult(plugin, category))
      results.push(...resultsForCategory)
    }
  
    display(results)
}

export const ExtensionManagerApp: App<ExtensionInfo[]> = {
    id: "ExtensionsManager",
    run: AppRun,
    onAppStart: getPlugins
}
