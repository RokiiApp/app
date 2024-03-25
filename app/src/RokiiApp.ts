import { extensionsRepository } from "@/extensions/repo/ExtensionsRespository";
import { AutoUpdater } from "@/services/AutoUpdater";

/**
 * The main class of the application
 * This is a Singleton that must be retrieved using the {@link getInstance} method
 * 
 * The app is started by calling the {@link run} method
 * It can only be started once
 */
class RokiiApp {
    private static appInstance: RokiiApp;
    private isRunning: boolean = false;
    
    private constructor() {
        console.log("[RokiiApp] - App started");
        this.initializeServices()
        this.renderApp()
    }

    public static getInstance(): RokiiApp {
        if (!RokiiApp.appInstance) {
            RokiiApp.appInstance = new RokiiApp();
        }
        return RokiiApp.appInstance;
    }

    run() {
        if (this.isRunning) return;

        console.log("[RokiiApp] - App started");
        this.initializeServices()
        this.renderApp()

        this.isRunning = true;
    }

    private async initializeServices() {
        console.log("[RokiiApp] - Initializing services");

        // Initialize the extensions repository
        await extensionsRepository.init();

        // Initialize the autoupdater
        AutoUpdater.tryUpdate();
    }

    private async renderApp() {
        import("@/main");
    }
}

export { RokiiApp }
