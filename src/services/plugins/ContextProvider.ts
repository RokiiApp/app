import { CHANNELS } from "@/common/constants/events";
import { send } from "@/common/ipc";
import { ExtensionContext } from "@/extensions/types";
import { useActionsStore } from "@/stores/actions";

export class ExtensionContextProvider {
    extensionName: string;

    constructor(extensionName: string) {
        this.extensionName = extensionName;
    }

    public get(term: string): ExtensionContext {
        const extensionContext = this.createExtensionContext(term);

        return extensionContext;
    }

    private createExtensionContext(term: string): ExtensionContext {
        const context: ExtensionContext = {
            term,
            display: async (actions) => {
                const actionsStore = useActionsStore.getState();
                actionsStore.addActions(actions, this.extensionName);
            },
            update: (id, action) => {
                const actionsStore = useActionsStore.getState();
                actionsStore.updateAction(id, action);
            },
            actions: {
                replaceTerm: async (term) => {
                    send(CHANNELS.ShowTerm, term);
                }
            }
        };

        return context;
    }


}
