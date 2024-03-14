// Here we manage the App Lifecycle

const runRokii = async () => {
    // Inititalize the frontend
    import("@/main")

    // Initialize autoupdater
    import("@/services/AutoUpdater").then(m => m.AutoUpdater.tryUpdate())
}

runRokii();

