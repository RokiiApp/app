import { ExtensionModule, Item } from '@rokii/api'

import { categorizeExtensions } from './utils/categorizePlugins';
import { pluginToResult } from './utils/pluginToResult';
import { ExtensionInfo } from './types';

let extensions: ExtensionInfo[] = []

export const onMessage: ExtensionModule["onMessage"] = (message) => {
    extensions = message as ExtensionInfo[]
}

export const ExtensionsManagerApp: ExtensionModule["run"] = async ({ display }) => {
    const categorizeResult = categorizeExtensions(extensions);
  
    const results: Item[] = []
  
    for (let [category, plugins] of Object.entries(categorizeResult) ){
      const resultsForCategory = plugins.map(plugin => pluginToResult(plugin, category))
      results.push(...resultsForCategory)
    }
  
    display(results)
  }
