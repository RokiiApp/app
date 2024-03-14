// Here we manage the App Lifecycle

import { getReadme } from "./utils/requests";

getReadme("tauri-apps/tauri").then(console.log);

const runRokii = async () => {
    // Inititalize the frontend
    import("@/main")

    // Initialize autoupdater
    import("@/services/AutoUpdater").then(m => m.AutoUpdater.tryUpdate())
}

runRokii();

