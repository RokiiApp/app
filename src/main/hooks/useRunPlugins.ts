import { useEffect } from 'react';
import { useActionsStore } from '@/stores/actions';
import { ExtensionEvents } from '@/extensions/manager/types';
import { extensionsManager } from '@/extensions/manager/ExtensionsManager';
import { ExtensionContextProvider } from '@/services/plugins/ContextProvider';

// TODO: Suscribe to unload plugin event to remove plugin from state
export const useRunExtensions = (term: string) => {
  const removeAllActions = useActionsStore(s => s.removeAllActions);

  useEffect(() => {
    // Reset results state to initial state
    removeAllActions();

    const allPlugins = extensionsManager.getAllPlugins();

    for (let [name, extension] of Object.entries(allPlugins)) {

      const { name: extensionName } = extension

      const extensionContextProvider = new ExtensionContextProvider(extensionName);
      const extensionContext = extensionContextProvider.get(term);

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run(extensionContext);
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

      const extensionContextProvider = new ExtensionContextProvider(extension.name);
      const extensionContext = extensionContextProvider.get(term);

      try {
        // HERE IS WHERE WE PROVIDE THE API TO THE PLUGIN
        extension.run(extensionContext);
      } catch (error) {
        // Do not fail on plugin errors, just log them to console
        console.log('Error running plugin', name, error);
      }

    });

    return () => extensionsManager.removeEventListener(ExtensionEvents.LOADED, () => { });

  }, [extensionsManager, term])
};
