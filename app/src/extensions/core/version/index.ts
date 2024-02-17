import type { Action, ExtensionModule } from "@/extensions/types";
import { getVersion } from "@tauri-apps/api/app";
import icon from '../icon.png';

const version = await getVersion();

const versionAction: Action = {
    title: "Rokii Version",
    subtitle: version,
    type: "info"
};

const VersionExtension: ExtensionModule = {
    name: "Version",
    icon,
    run: async ({ display }) => display([versionAction])
};

export default VersionExtension;
