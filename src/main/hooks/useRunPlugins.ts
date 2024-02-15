import { useEffect } from 'react';
import { useRokiStore } from '@/state/rokiStore';
import VersionExtension from '@/extensions/core/version';
import { PluginEvents } from '@/extensions/manager/types';
import { pluginsManager } from '@/extensions/manager/PluginsManager';

// TODO: Suscribe to unload plugin event to remove plugin from state
export const useRunPlugins = (term: string) => {
  const addResult = useRokiStore(s => s.addResult);
  const resetResultsState = useRokiStore(s => s.reset);

  useEffect(() => {
    // Reset results state to initial state (select 0, empty results array)
    resetResultsState();

    const allPlugins = { VersionExtension }

    for (let [name, extension] of Object.entries(allPlugins)) {

      const { name: extensionName } = extension

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run({
          term,
          display: async (payload) => { addResult(name, { ...payload, extensionName }) }
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

      const extension = pluginsManager.getPlugin(name);

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run({
          term,
          display: async (payload) => { addResult(name, { ...payload, extensionName }) }
        });
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }

    });

    return () => pluginsManager.removeEventListener(PluginEvents.LOADED, () => { });

  }, [])
};
