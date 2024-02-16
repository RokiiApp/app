import { convertFileSrc } from "@tauri-apps/api/tauri";

/**
 * This class is used to import external modules dynamically.
 */
export class ExternalModuleImporter {
  static async importModule(modulePath: string) {
    const normalizedPath = this.normalizePath(modulePath);

    const module = await import(/* @vite-ignore */ normalizedPath);
    return module;
  }

  private static normalizePath(path: string) {
    return convertFileSrc(path);
  }
}
