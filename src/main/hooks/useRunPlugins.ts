import { useEffect } from 'react';
import { useActionsStore } from '@/stores/actions';
import { ExtensionEvents } from '@/extensions/manager/types';
import { extensionsManager } from '@/extensions/manager/ExtensionsManager';

// TODO: Suscribe to unload plugin event to remove plugin from state
export const useRunPlugins = (term: string) => {
  const addActions = useActionsStore(s => s.addActions);
  const removeAllActions = useActionsStore(s => s.removeAllActions);

  useEffect(() => {
    // Reset results state to initial state
    removeAllActions();

    const allPlugins = extensionsManager.getAllPlugins();

    for (let [name, extension] of Object.entries(allPlugins)) {

      const { name: extensionName } = extension

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run({
          term,
          display: async (actions) => { addActions(actions, extensionName) }
        });
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }
    }

    // Reset results state on unmount so we don't have stale results and autocomplete values
    return () => removeAllActions();
  }, [term]);

  useEffect(() => {
    extensionsManager.addEventListener(ExtensionEvents.LOADED, ({ detail }) => {
      const { name } = detail;

      const extension = extensionsManager.getPlugin(name);

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run({
          term,
          display: async (actions) => { addActions(actions, name) }
        });
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }

    });

    return () => extensionsManager.removeEventListener(ExtensionEvents.LOADED, () => { });

  }, [extensionsManager, term])
};
