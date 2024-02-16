import type { Action, ExtensionModule } from "@/extensions/types";
import { getVersion } from "@tauri-apps/api/app";
import icon from '../icon.png';

const VersionExtension: ExtensionModule = {
    icon,
    name: 'Rokii Version',
    run: async ({ display }) => {
        const version = await getVersion();

        const action: Action = {
            title: "Rokii Version",
            subtitle: version,
            type: "script",
            run: (e: Event) => {
                e.preventDefault();
                console.log("Rokii Version: ", version);
            }
        };

        display([action]);
    }
}

export default VersionExtension;
