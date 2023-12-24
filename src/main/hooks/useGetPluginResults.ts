import { useEffect } from 'react';
import { PluginEvents, pluginsManager } from '@/extensions/PluginsManager';
import { DEFAULT_SCOPE } from '../utils/pluginDefaultScope';
import { useRokiStore } from '@/state/rokiStore';
import { pluginSettings } from '@/services/plugins';
import { useInputStore } from '@/state/inputStore';
import { search } from '@rokii/utils';

// TODO: Suscribe to unload plugin event to remove plugin from state
export const useGetPluginResults = (term: string) => {
  const updateTerm = useInputStore(s => s.updateTerm);

  const addResult = useRokiStore(s => s.addResult);
  const updateResult = useRokiStore(s => s.updateResult);
  const resetResultsState = useRokiStore(s => s.reset);
  const hide = useRokiStore(s => s.hide);

  useEffect(() => {
    // Reset results state to initial state (select 0, empty results array)
    resetResultsState();

    const allPlugins = pluginsManager.getAllPlugins();

    for (let [name, plugin] of Object.entries(allPlugins)) {

      const { name: devName, keywords } = plugin

      // filter using the plugin keyword and name
      if (devName && keywords && keywords.length > 0 && search([...keywords, devName], term).length === 0) continue;

      // TODO: order results by frequency?
      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        plugin?.fn?.({
          ...DEFAULT_SCOPE,
          actions: {
            ...DEFAULT_SCOPE.actions,
            replaceTerm: (newTerm: string) => updateTerm(newTerm)
          },
          term,
          hide: (id) => hide(`${name}-${id}`),
          update: (id, result) => updateResult(`${name}-${id}`, result),
          display: (payload) => addResult(name, payload, keywords),
          settings: pluginSettings.getUserSettings(plugin, name)
        });
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }
    }

    // Reset results state on unmount so we don't have stale results and autocomplete values
    return () => resetResultsState();
  }, [term]);

  useEffect(() => {
    pluginsManager.addEventListener(PluginEvents.LOADED, ({ detail }) => {
      const { name } = detail;

      const plugin = pluginsManager.getPlugin(name);

      const { keywords } = plugin;

      // filter using the plugin keyword and name
      if (keywords && keywords.length > 0 && search([...keywords, name], term).length === 0) return;

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        plugin?.fn?.({
          ...DEFAULT_SCOPE,
          actions: {
            ...DEFAULT_SCOPE.actions,
            replaceTerm: (newTerm: string) => updateTerm(newTerm)
          },
          term,
          hide: (id) => hide(`${name}-${id}`),
          update: (id, result) => updateResult(`${name}-${id}`, result),
          display: (payload) => addResult(name, payload, keywords),
          settings: pluginSettings.getUserSettings(plugin, name)
        });
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }

    });

    return () => pluginsManager.removeEventListener(PluginEvents.LOADED, () => { });

  }, [])
};
