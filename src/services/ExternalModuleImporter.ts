import { convertFileSrc } from "@tauri-apps/api/tauri";

/**
 * This class is used to import external modules dynamically.
 */
export class ExternalModuleImporter {
  static async importModule(modulePath: string) {
    const normalizedPath = this.normalizePath(modulePath);
    try {
      const module = await import(/* @vite-ignore */ normalizedPath);
      return { module, error: null };
    } catch (error) {
      console.error(error);
      return { module: null, error };
    }
  }

  private static normalizePath(path: string) {
    return convertFileSrc(path);
  }
}
